import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';
import Plan from '../models/planModel.js';

// Controller to get all the posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .limit(20)
            .populate('author')
            .populate('ingredients.ingredient')
            .lean();

        const transformedPosts = posts.map(post => ({
            ...post,
            ingredients: post.ingredients.map(ing => ({
                name: ing.ingredient.name,
                nutrition: ing.ingredient.nutrition,
                weight: ing.weight
            }))
        }));

        res.status(200).json(transformedPosts);
    } catch (error) {
        console.error('Error getting all posts:', error);
        res.status(500).json({ message: 'Server error. Could not get all posts.' });
    }
};

// Controller to search for posts
const searchPosts = async (req, res) => {
    try {
        const { query, tags } = req.query;
        let searchCriteria = {};

        if (!query && !tags) {
            return res.status(400).json({ message: 'Query or tags parameter is required.' });
        }

        // Add title search criteria if query exists
        if (query) {
            searchCriteria.title = { $regex: query, $options: 'i' };
        }

        // Add tags filter if tags exist
        // Tags should be passed as comma-separated string: tags=healthy,vegetarian,dinner
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim());
            searchCriteria.tags = { $all: tagArray }; // Use $all to match all tags
        }

        const posts = await Post.find(searchCriteria).populate('author').populate('ingredients.ingredient').lean();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Server error. Could not search posts.' });
    }
};

// Controller to view a post
const viewPost = async (req, res) => {
    try {
        console.log('Params:', req.params);
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required.' });
        }

        const post = await Post.findById(postId)
            .populate('author')
            .populate('ingredients.ingredient')
            .lean();

        const transformedPost = {
            ...post,
            ingredients: post.ingredients.map(ing => ({
                name: ing.ingredient.name,
                nutrition: ing.ingredient.nutrition,
                weight: ing.weight
            }))
        };

        res.status(200).json(transformedPost);
    } catch (error) {
        console.error('Error viewing post:', error);
        res.status(500).json({ message: 'Server error. Could not view post.' });
    }
};

// Controller to add a post
const addPost = async (req, res) => {
    try {
        const { title, content, author, tags, ingredients } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content, and author are required.' });
        }

        // Create post object with optional tags
        const postData = {
            title,
            content,
            author
        };

        // Add tags if they exist
        if (tags && Array.isArray(tags)) {
            postData.tags = tags.map(tag => tag.trim().toLowerCase());
        }

        if (ingredients && Array.isArray(ingredients)) {
            postData.ingredients = ingredients;
        }

        const newPost = new Post(postData);
        await newPost.save();
        res.status(200).json({ message: 'Post added successfully.' });
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ message: 'Server error. Could not add post.' });
    }
};

// Controller to delete a post
export const deletePostAndRelated = async (postId, session) => {
    // Delete all comments associated with the post
    await Comment.deleteMany({ post: postId }, { session });
    
    // Remove post reference from plans
    await Plan.updateMany(
        { posts: postId },
        { $pull: { posts: postId } },
        { session }
    );

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(postId).session(session);
    
    if (!deletedPost) {
        throw new Error('Post not found');
    }

    return deletedPost;
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required.' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await deletePostAndRelated(postId, session);
            await session.commitTransaction();
            res.status(200).json({ message: 'Post and related data deleted successfully.' });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error. Could not delete post.' });
    }
};

const addPostFromFreeMeal = async (req, res) => {
    try {
        const { meals, author } = req.body;

        if (!meals || !Array.isArray(meals)) {
            return res.status(400).json({ message: 'Invalid data format. "meals" should be an array.' });
        }

        if (!author) {
            return res.status(400).json({ message: 'Author ID is required.' });
        }

        // Map through the meals array and create documents
        const postDocuments = meals.map((meal) => ({
            author: author,
            title: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            content: meal.strInstructions,
            photo: meal.strMealThumb,
            duration: Math.floor(Math.random() * (60 - 30 + 1)) + 30, // Random duration between 30 and 60
            tags: meal.strTags ? meal.strTags.split(',') : [],
            video: meal.strYoutube,
            contentIngredients: Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return ingredient && ingredient.trim() ? { ingredient, measure } : null;
            }).filter(Boolean),
            source: meal.strSource,
        }));

        // Insert posts into MongoDB
        await Post.insertMany(postDocuments);

        // Send a success response
        res.status(201).json({ message: 'Meals successfully added to the database as posts.' });
    } catch (error) {
        console.error('Error saving meals as posts:', error);
        res.status(500).json({ message: 'An error occurred while saving meals to the database.' });
    }
};

export { 
    getAllPosts,
    searchPosts, 
    viewPost, 
    addPost, 
    deletePost,
    addPostFromFreeMeal
};
