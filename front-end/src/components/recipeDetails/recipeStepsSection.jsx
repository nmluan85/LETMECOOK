

const RecipeStepsSection = ({recipeInfo}) => {
    return (
        <div>
            <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center mb-8" src={recipeInfo.item.photo}/>
            <div>
                {
                    recipeInfo.steps && recipeInfo.steps.map((item, index) => (
                        <div class="mt-4">
                            <h2 class="text-xl font-semibold">
                                Step {index + 1}
                            </h2>
                            <p class="mt-2 text-gray-700 my-4">
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