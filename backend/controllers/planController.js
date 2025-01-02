import Plan from '../models/planModel.js';

// Controller to create a new plan
const createPlan = async (req, res) => {
    try {
        const { startDate, endDate, name, user, posts, ingredients } = req.body;

        if (!startDate || !endDate || !name || !user) {
            return res.status(400).json({ message: 'Start date, End date, name, and user are required.' });
        }

        const planData = {
            startDate,
            endDate,
            name,
            user
        };

        if (posts) planData.posts = posts;
        if (ingredients && Array.isArray(ingredients)) {
            planData.ingredients = ingredients;
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
            .populate('posts')
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
        .populate('posts')
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

// Controller to update a plan
const updatePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const { startDate, endDate, name, posts, ingredients } = req.body;

        if (!planId) {
            return res.status(400).json({ message: 'Plan ID is required.' });
        }

        const updateData = {};
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;
        if (name) updateData.name = name;
        if (posts) updateData.posts = posts;
        if (ingredients) updateData.ingredients = ingredients;

        const updatedPlan = await Plan.findByIdAndUpdate(
            planId, 
            updateData,
            { new: true, runValidators: true }
        )
        .populate('posts')
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

export { createPlan, deletePlan, getAllPlans, getPlanByDate, updatePlan };
