import mongoose from "mongoose";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import Plan from "../models/planModel.js";

// Controller to get all the posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .limit(20)
            .populate("author")
            .populate("ingredients.ingredient")
            .lean();

        const transformedPosts = posts.map((post) => ({
            ...post,
            ingredients: post.ingredients.map((ing) => ({
                name: ing.ingredient.name,
                nutrition: ing.ingredient.nutrition,
                weight: ing.weight,
            })),
        }));

        res.status(200).json(transformedPosts);
    } catch (error) {
        console.error("Error getting all posts:", error);
        res.status(500).json({
            message: "Server error. Could not get all posts.",
        });
    }
};

// Controller to search for posts
const searchPosts = async (req, res) => {
    try {
        const { query, tags } = req.query;
        let searchCriteria = {};

        if (!query && !tags) {
            return res
                .status(400)
                .json({ message: "Query or tags parameter is required." });
        }

        // Add title search criteria if query exists
        if (query) {
            searchCriteria.title = { $regex: query, $options: "i" };
        }

        // Add tags filter if tags exist
        // Tags should be passed as comma-separated string: tags=healthy,vegetarian,dinner
        if (tags) {
            const tagArray = tags.split(",").map((tag) => tag.trim());
            searchCriteria.tags = { $all: tagArray }; // Use $all to match all tags
        }

        const posts = await Post.find(searchCriteria)
            .populate("author")
            .populate("ingredients.ingredient")
            .lean();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error searching posts:", error);
        res.status(500).json({
            message: "Server error. Could not search posts.",
        });
    }
};

// Controller to view a post
const viewPost = async (req, res) => {
    try {
        console.log("Params:", req.params);
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required." });
        }

        const post = await Post.findById(postId)
            .populate("author")
            .populate("ingredients.ingredient")
            .lean();

        const transformedPost = {
            ...post,
            ingredients: post.ingredients.map((ing) => ({
                name: ing.ingredient.name,
                nutrition: ing.ingredient.nutrition,
                weight: ing.weight,
            })),
        };

        res.status(200).json(transformedPost);
    } catch (error) {
        console.error("Error viewing post:", error);
        res.status(500).json({ message: "Server error. Could not view post." });
    }
};

// Add new post
const addPost = async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        area,
        content,
        video,
        duration,
        tags,
        contentIngredients,
        author,
      } = req.body;
  
      // Parse arrays (since they were sent as JSON strings)
      const parsedTags = tags ? JSON.parse(tags) : [];
      const parsedIngredients = contentIngredients ? JSON.parse(contentIngredients) : [];
  
      // Build the full URL if a file was uploaded
      let photoUrl = "";
      if (req.file) {
        photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      }
  
      // Create post data
      const postData = {
        title,
        description,
        category: category || "Miscellaneous",
        area: area || "Unknown",
        content,
        video: video || "",
        duration: duration || 0,
        tags: parsedTags,
        ingredients: parsedIngredients,
        photo: photoUrl, // store the full URL here
        author,
      };
  
      // Save the post to the database
      const newPost = new Post(postData);
      await newPost.save();
  
      res.status(200).json({
        message: "Post added successfully.",
        post: newPost,
      });
    } catch (error) {
      console.error("Error adding post:", error);
      res.status(500).json({ message: "Server error. Could not add post." });
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
        { session },
    );

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(postId).session(session);

    if (!deletedPost) {
        throw new Error("Post not found");
    }

    return deletedPost;
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: "Post ID is required." });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await deletePostAndRelated(postId, session);
            await session.commitTransaction();
            res.status(200).json({
                message: "Post and related data deleted successfully.",
            });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({
            message: "Server error. Could not delete post.",
        });
    }
};

const addPostFromFreeMeal = async (req, res) => {
    try {
        const { meals, author } = req.body;

        if (!meals || !Array.isArray(meals)) {
            return res
                .status(400)
                .json({
                    message: 'Invalid data format. "meals" should be an array.',
                });
        }

        if (!author) {
            return res.status(400).json({ message: "Author ID is required." });
        }

        // Map through the meals array and create documents
        const postDocuments = meals.map((meal) => ({
            author: author,
            title: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            content: meal.strInstructions,
            photo: meal.strMealThumb,
            duration: Math.floor(Math.random() * (60 - 30 + 1)) + 30,
            tags: meal.strTags ? meal.strTags.split(",") : [],
            video: meal.strYoutube,
            contentIngredients: Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return ingredient && ingredient.trim()
                    ? { ingredient, measure }
                    : null;
            }).filter(Boolean),
            source: meal.strSource,
        }));

        // Insert posts into MongoDB
        await Post.insertMany(postDocuments);

        // Send a success response
        res.status(201).json({
            message: "Meals successfully added to the database as posts.",
        });
    } catch (error) {
        console.error("Error saving meals as posts:", error);
        res.status(500).json({
            message: "An error occurred while saving meals to the database.",
        });
    }
};

// Controller to view all posts of a user
const viewUserAllPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const posts = await Post.find({ author: userId })
            .populate("author")
            .populate("ingredients.ingredient")
            .lean();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error viewing user posts:", error);
        res.status(500).json({
            message: "Server error. Could not view user posts.",
        });
    }
};

// Controller to add report to a post
const addReport = async (req, res) => {
    try {
        const { postId, report } = req.body;

        if (!postId || !report) {
            return res
                .status(400)
                .json({ message: "Post ID and report are required." });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const user = await User.findById(post.author);
        if (!user) {
            return res.status(404).json({ message: "Post author not found." });
        }

        user.numberReports += 1;
        await user.save();

        post.reports.push(report);
        await post.save();

        res.status(200).json({
            message: "Report added successfully.",
            updatedNumberReports: user.numberReports,
        });
    } catch (error) {
        console.error("Error adding report:", error);
        res.status(500).json({
            message: "Server error. Could not add report.",
        });
    }
};

const getPostsByCategory = async (req, res) => {
    const { name } = req.params; // Extract category from route parameters

    // Capitalize the first letter of the category
    const category = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    try {
        // Fetch posts with the formatted category from the database
        const posts = await Post.find({ category: category }).populate(
            "author",
        );

        if (!posts.length) {
            return res
                .status(201)
                .json({ message: "No posts found for this category." });
        }

        // Respond with the retrieved posts
        res.status(200).json(posts);
    } catch (error) {
        // Handle errors (e.g., database issues)
        console.error("Error fetching posts by category:", error);
        res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
};

const setAuthorForAllPosts = async (req, res) => {
    const authorId = "676d862128ff79e6061a0cd5"; // The ID to set as the author

    try {
        // Update all posts with the given author ID
        const result = await Post.updateMany({}, { author: authorId });

        // Respond with a success message and the count of updated documents
        res.status(200).json({
            message: "Author updated for all posts successfully.",
            updatedCount: result.nModified,
        });
    } catch (error) {
        console.error("Error updating author for posts:", error);
        res.status(500).json({
            message: "Failed to update author for posts.",
            error: error.message,
        });
    }
};

const resetRatingAllPosts = async (req, res) => {
    try {
        // Update all posts to add the 'rating' field with a default value of 5
        const result = await Post.updateMany(
            { rating: { $exists: false } }, // Only update documents where 'rating' does not exist
            { $set: { rating: 4 } },
        );

        // Respond with a success message and the count of updated documents
        res.status(200).json({
            message: "Rating field added to all posts successfully.",
            updatedCount: result.nModified,
        });
    } catch (error) {
        console.error("Error adding rating to posts:", error);
        res.status(500).json({
            message: "Failed to add rating field to posts.",
            error: error.message,
        });
    }
};

export {
    getAllPosts,
    searchPosts,
    viewPost,
    addPost,
    deletePost,
    addPostFromFreeMeal,
    viewUserAllPosts,
    addReport,
    getPostsByCategory,
    setAuthorForAllPosts,
    resetRatingAllPosts,
};
