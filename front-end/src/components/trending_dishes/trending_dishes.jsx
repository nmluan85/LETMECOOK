import React, { useEffect, useState }  from 'react';
import TrendingCard from "./trending_card";


const TrendingDishes = () => {
    const [listPost, setListPost] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() =>{
        fetch('http://localhost:3000/api/posts/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch all posts');
                }
                return response.json()
            })
            .then(data => {
                // Sort the data by uploadDate in descending order and take the 4 most recent items
                const recentPosts = data
                    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                    .slice(0, 4);
                setListPost(recentPosts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching all posts:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);
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
                        <TrendingCard recipe={item} isSaved={savedPosts.includes(item._id)} />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default TrendingDishes;