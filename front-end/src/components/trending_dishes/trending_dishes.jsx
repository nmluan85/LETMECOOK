import React, { useEffect, useState } from 'react';
import TrendingCard from "./trending_card";
import { useAuth } from '../../contexts/AuthContext';

const TrendingDishes = () => {
    const [listPost, setListPost] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingSavedPosts, setIsLoadingSavedPosts] = useState(false); // Separate loading state for saved posts
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();

    // Fetch all posts
    useEffect(() => {
        fetch('http://localhost:3000/api/posts/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch all posts');
                }
                return response.json();
            })
            .then(data => {
                const recentPosts = data.slice(0, 4); // Take the 4 most recent items
                setListPost(recentPosts);
                setIsLoadingPosts(false);
            })
            .catch(error => {
                console.error('Error fetching all posts:', error);
                setError(error.message);
                setIsLoadingPosts(false);
            });
    }, []);

    // Fetch saved posts only if logged in
    useEffect(() => {
        if (isLoggedIn) {
            setIsLoadingSavedPosts(true);
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
                    return response.json();
                })
                .then(savedData => {
                    setSavedPosts(savedData.savedPosts);
                })
                .catch(error => {
                    console.error('Error fetching saved posts:', error);
                    setError(error.message);
                })
                .finally(() => {
                    setIsLoadingSavedPosts(false);
                });
        }
    }, [isLoggedIn]);

    if (isLoadingPosts || isLoadingSavedPosts) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full mt-4 pb-20">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                Trending dishes
            </h1>
            <p className="text-center text-gray-600 mt-2">
                Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
            </p>

            <div className="ml-40 mr-40 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mx-4">
                {listPost.map((item, index) => (
                    <div key={index}>
                        <TrendingCard
                            recipe={item}
                            isSaved={savedPosts.some(savedPost => savedPost._id === item._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingDishes;