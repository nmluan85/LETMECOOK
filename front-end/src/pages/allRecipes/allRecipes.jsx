import CategoryPreview from "../../components/allRecipes/categoryPreview";
import { useState } from "react";
import { useEffect } from "react";

const AllRecipes = () => {
    const [savedPosts, setSavedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);   
    const [error, setError] = useState(null);
    const categories = [
        "beef", "breakfast", "chicken", "dessert", "goat", "lamb", "miscellaneous",
        "pasta", "pork", "seafood", "side", "starter", "vegan", "vegetarian"
    ];

    useEffect(() => {
        // Fetch saved posts
        fetch('http://localhost:3000/api/users/save-post', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for authentication
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch saved posts');
            }
            return response.json()
        })
        .then(savedData => {
            setSavedPosts(savedData.savedPosts);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching saved posts:', error);
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {categories.map((category, index) => (
                <div key={index}>
                    <CategoryPreview category={category} savedPosts={savedPosts} />
                </div>
            ))}
        </div>
    );
};

export default AllRecipes;