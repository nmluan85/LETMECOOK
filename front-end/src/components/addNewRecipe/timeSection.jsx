import React, { useState } from "react";

const NewRecipeOtherSection = ({ onChange }) => {
    const [cookTime, setCookTime] = useState(0);
    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [video, setVideo] = useState("");

    const categories = [
        "Beef",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
    ];

    const areas = [
        "American",
        "British",
        "Canadian",
        "Chinese",
        "Croatian",
        "Dutch",
        "Egyptian",
        "Filipino",
        "French",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Jamaican",
        "Japanese",
        "Kenyan",
        "Malaysian",
        "Mexican",
        "Moroccan",
        "Polish",
        "Portuguese",
        "Russian",
        "Spanish",
        "Thai",
        "Tunisian",
        "Turkish",
        "Ukrainian",
        "Unknown",
        "Vietnamese",
    ];

    const handleCookTimeChange = (e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setCookTime(value);
        console.log(value);
        onChange({ duration: value, category, area, video });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        console.log(value);
        onChange({ duration: cookTime, category: value, area, video });
    };

    const handleAreaChange = (e) => {
        const value = e.target.value;
        setArea(value);
        console.log(value);
        onChange({ duration: cookTime, category, area: value, video });
    };

    const handleVideoChange = (e) => {
        const value = e.target.value;
        setVideo(value);
        onChange({ duration: cookTime, category, area, video: value });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Other Information</h2>

            {/* Cook Time */}
            <div className="flex items-center space-x-4">
                <label className="font-bold mr-60">Cook Time*</label>
                <input
                    type="number"
                    value={cookTime}
                    onChange={handleCookTimeChange}
                    className="border border-gray-400 p-1 w-16 text-center"
                />
                <div className="flex items-center space-x-2">
                    <select className="border border-gray-400 p-1">
                        <option value="minutes">minutes</option>
                    </select>
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="mt-5">
                <label className="block font-bold mb-2" htmlFor="category">
                    Category*
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full border border-gray-300 rounded p-2"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Area Dropdown */}
            <div className="mt-5">
                <label className="block font-bold mb-2" htmlFor="area">
                    Area*
                </label>
                <select
                    id="area"
                    value={area}
                    onChange={handleAreaChange}
                    className="w-full border border-gray-300 rounded p-2"
                >
                    <option value="">Select Area</option>
                    {areas.map((ar) => (
                        <option key={ar} value={ar}>
                            {ar}
                        </option>
                    ))}
                </select>
            </div>

            {/* YouTube Video */}
            <div className="mt-5">
                <label className="block font-bold mb-2" htmlFor="youtube-video">
                    YouTube Video
                </label>
                <input
                    type="text"
                    id="youtube-video"
                    value={video}
                    onChange={handleVideoChange}
                    placeholder="Enter YouTube URL of the dish"
                    className="w-full border border-gray-300 rounded p-5"
                />
            </div>
        </div>
    );
};

export default NewRecipeOtherSection;
