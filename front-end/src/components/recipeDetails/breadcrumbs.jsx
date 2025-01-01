

const RecipeDetailsBreadcrumbs = () => {
    return (
        <div 
            className="bg-white text-black w-full max-w-4xl p-4 rounded-lg flex items-center justify-between ml-8">
            <div className="flex items-center space-x-2">
                <span className="text-gray-500" href="#">
                    Home
                </span>
                <span className="text-gray-500">
                    &gt;
                </span>
                <span className="text-blue-500" href="#">
                    Cooking guide
                </span>
            </div>
        </div>
    );
};

export default RecipeDetailsBreadcrumbs;