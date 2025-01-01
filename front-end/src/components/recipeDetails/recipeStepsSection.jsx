

const RecipeStepsSection = ({recipeInfo}) => {
    return (
        <div>
            <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center mb-8" src={recipeInfo.item.photo}/>
            <div>
                {
                    recipeInfo.steps && recipeInfo.steps.map((item, index) => (
                        <div className="mt-4" key={index}>
                            <h2 className="text-xl font-semibold">
                                Step {index + 1}
                            </h2>
                            <p className="mt-2 text-gray-700 my-4">
                                {item}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RecipeStepsSection;