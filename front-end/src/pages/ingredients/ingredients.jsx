import React, { useState, useEffect } from "react";

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3000/api/ingredients/names",
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch ingredients",
                    );
                }

                setIngredients(data); // Assume the API returns an array of names
            } catch (err) {
                setError(
                    err.message ||
                        "An error occurred while fetching ingredients",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    if (loading) {
        return (
            <p className="text-center text-gray-500">Loading ingredients...</p>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="relative w-[900px] h-[900px] mx-auto overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200px] h-[200px] bg-primary-100 rounded-full shadow-inner flex items-center justify-center">
                    <p className="text-center text-gray-700 font-bold">
                        Ingredients
                    </p>
                </div>
            </div>
            <div
                className="relative w-full h-full flex items-center justify-center animate-[spin_30s_linear_infinite]"
                style={{ transformOrigin: "center" }}
            >
                {ingredients.map((ingredient, index) => {
                    const angle = (360 / ingredients.length) * index;
                    const radius = 300; // Larger circle radius
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;

                    return (
                        <div
                            key={ingredient.id}
                            className="absolute"
                            style={{
                                transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                            }}
                        >
                            <span
                                className="bg-primary-200 text-primary-800 text-sm font-medium px-3 py-1 rounded-full shadow"
                                style={{
                                    transform: `rotate(-${angle}deg)`,
                                }}
                            >
                                {ingredient.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Ingredients;
