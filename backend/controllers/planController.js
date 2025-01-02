import Plan from '../models/planModel.js';

// Controller to create a new plan
const createPlan = async (req, res) => {
    try {
        const { startDate, endDate, name, user, posts, type, ingredients } = req.body;

        if (!startDate || !endDate || !name || !user) {
            return res.status(400).json({ message: 'Start date, End date, name, and user are required.' });
        }

        const planData = {
            startDate,
            endDate,
            name,
            user, 
            type,
        };

        if (posts) planData.posts = posts;
        if (ingredients && Array.isArray(ingredients)) {
            planData.ingredients = ingredients.map(item => ({
                ingredient: item.ingredient,
                weight: item.quantity
            }));
        }

        const newPlan = new Plan(planData);
        await newPlan.save();
        res.status(201).json({ message: 'Plan created successfully.', plan: newPlan });
    } catch (error) {
        console.error('Error creating plan:', error);
        res.status(500).json({ message: 'Server error. Could not create plan.' });
    }
};

// Controller to delete a plan
const deletePlan = async (req, res) => {
    try {
        const { planId } = req.params;

        if (!planId) {
            return res.status(400).json({ message: 'Plan ID is required.' });
        }

        const deletedPlan = await Plan.findByIdAndDelete(planId);

        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found.' });
        }

        res.status(200).json({ message: 'Plan deleted successfully.' });
    } catch (error) {
        console.error('Error deleting plan:', error);
        res.status(500).json({ message: 'Server error. Could not delete plan.' });
    }
};

// Controller to get all plans for a user
const getAllPlans = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const plans = await Plan.find({ user: userId })
            .populate('ingredients.ingredient')
            .sort({ startDate: 1 });

        res.status(200).json(plans);
    } catch (error) {
        console.error('Error getting plans:', error);
        res.status(500).json({ message: 'Server error. Could not get plans.' });
    }
};

// Controller to get plans by date for a user
const getPlanByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const { userId } = req.query;

        if (!date || !userId) {
            return res.status(400).json({ message: 'Date and User ID are required.' });
        }

        const plan = await Plan.find({ 
            startDate: { $lte: date },
            endDate: { $gte: date },
            user: userId 
        })
        .populate('ingredients.ingredient');

        if (!plan || plan.length === 0) {
            return res.status(404).json({ message: 'No plans found for this date.' });
        } 

        res.status(200).json(plan);
    } catch (error) {
        console.error('Error getting plan by date:', error);
        res.status(500).json({ message: 'Server error. Could not get plan by date.' });
    }
};

// Controller to calculate the total nutrition for a plan
const calculatePlan = async (req, res) => {
    try {
        const { userId, planIds } = req.body;

        if (!userId || planIds.length === 0 || !Array.isArray(planIds)) {
            return res.status(400).json({ message: 'User ID and Plan ID are required.' });
        }

        const plans = await Promise.all(
            planIds.map(planId => Plan.findById(planId).populate('ingredients.ingredient'))
        );

        if (plans.length === 0) {
            return res.status(404).json({ message: 'Plan not found.' });
        }

        // Initialize total nutrition values
        const totalNutrition = {
            carbs: 0,
            fat: 0,
            protein: 0,
            calories: 0,
            fiber: 0,
            sodium: 0
        };

        // Calculate total nutrition values
        plans.forEach(plan => {
            plan.ingredients.forEach(item => {
                const weight = item.weight || 0;
                const nutrition = item.ingredient.nutrition || {};
                
                totalNutrition.carbs += nutrition.carbs * weight;
                totalNutrition.fat += nutrition.fat * weight;
                totalNutrition.protein += nutrition.protein * weight;
                totalNutrition.calories += nutrition.calories * weight;
                totalNutrition.fiber += nutrition.fiber * weight;
                totalNutrition.sodium += nutrition.sodium * weight;
            })
        });

        // // Calculate percentage for each ingredient
        // const nutritionPercentages = plan.ingredients.map(item => {
        //     const weight = item.weight;
        //     const nutrition = item.ingredient.nutrition;
            
        //     return {
        //         ingredientName: item.ingredient.name,
        //         percentages: {
        //             carbs: ((nutrition.carbs * weight) / totalNutrition.carbs) * 100,
        //             fat: ((nutrition.fat * weight) / totalNutrition.fat) * 100,
        //             protein: ((nutrition.protein * weight) / totalNutrition.protein) * 100,
        //             calories: ((nutrition.calories * weight) / totalNutrition.calories) * 100,
        //             fiber: ((nutrition.fiber * weight) / totalNutrition.fiber) * 100,
        //             sodium: ((nutrition.sodium * weight) / totalNutrition.sodium) * 100
        //         }
        //     };
        // });
        const totalSum = totalNutrition.carbs + totalNutrition.fat + totalNutrition.protein + 
                 totalNutrition.calories + totalNutrition.fiber + totalNutrition.sodium;

        const nutritionPercentages = [
            { label: 'carbs', value: (totalNutrition.carbs / totalSum) * 100 },
            { label: 'fat', value: (totalNutrition.fat / totalSum) * 100 },
            { label: 'protein', value: (totalNutrition.protein / totalSum) * 100 },
            { label: 'calories', value: (totalNutrition.calories / totalSum) * 100 },
            { label: 'fiber', value: (totalNutrition.fiber / totalSum) * 100 },
            { label: 'sodium', value: (totalNutrition.sodium / totalSum) * 100 }
        ];
        res.status(200).json({
            message: 'Plan nutrition calculated successfully.',
            nutritionPercentages,            
        });

    } catch (error) {
        console.error('Error calculating plan nutrition:', error);
        res.status(500).json({ message: 'Server error. Could not calculate plan nutrition.' });
    }
};

// Controller to update a plan
const updatePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const { startDate, endDate, name, posts, type, ingredients} = req.body;
        if (!planId) {
            return res.status(400).json({ message: 'Plan ID is required.' });
        }

        const updateData = {};
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;
        if (name) updateData.name = name;
        if (posts) updateData.posts = posts;
        if (ingredients) updateData.ingredients = ingredients;
        if (type) updateData.type = type;

        const updatedPlan = await Plan.findByIdAndUpdate(
            planId,
            updateData,
            { new: true, runValidators: true }
        )
        .populate('ingredients.ingredient');

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found.' });
        }

        res.status(200).json({
            message: 'Plan updated successfully.',
            plan: updatedPlan
        });
    } catch (error) {
        console.error('Error updating plan:', error);
        res.status(500).json({ message: 'Server error. Could not update plan.' });
    }
};

export { createPlan, deletePlan, getAllPlans, getPlanByDate, updatePlan, calculatePlan };
