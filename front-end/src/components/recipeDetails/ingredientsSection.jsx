

const IngredientsSection = ({recipeInfo}) => {
    return (
        <div className="border-dashed border-2 border-blue-400 p-6 rounded-lg bg-white shadow-md mt-5">
            <ul className="list-none space-y-2">
                {recipeInfo.ingredientsArr && recipeInfo.ingredientsArr.map((ingredient, index) => (
                    <li key={index}>
                        - {ingredient}{" "}
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2 text-center">
                            {ingredient.split(" ").pop()} {/* Display last word as tag */}
                        </span>
                    </li>
                ))}
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                <i className="fas fa-plus mr-2"></i> Add to Your Grocery List
            </button>
        </div>
    );
}

export default IngredientsSection;