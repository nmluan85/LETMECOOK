import React, { useEffect, useState }  from 'react';
import Slider from 'react-slick';
import RecipeCard from '../../recipeCard/recipeCard';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const SeasonRecipe = () => {
    const [listPost, setListPost] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);   
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/api/posts/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch all posts');
                }
                return response.json()
            })
            .then(data => {
                setListPost(data);
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
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="w-full pb-16">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                This Summer Recipes
            </h1>
            <p className="text-center text-gray-600 mt-2">
                We have all your Independence Day sweets covered.
            </p>
            <Slider {...settings} className="ml-10 mr-10 mt-8 px-20">
                {listPost.map((item, index) => (
                    <div className="pt-4 pb-6 pl-2 pr-2" key={index}>
                        <RecipeCard 
                            recipe={item}
                            isSaved={savedPosts.some(savedPost => savedPost._id === item._id)}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SeasonRecipe