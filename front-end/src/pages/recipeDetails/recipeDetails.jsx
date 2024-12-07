import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SaveButton from "../../components/recipeCard/saveButton";
import { FaRegThumbsUp, FaStar, FaBookmark } from "react-icons/fa"
import img2 from "../../assets/Strawberry-Shortcake-2.png"
import img3 from "../../assets/Strawberry-Shortcake-3.png"
import img4 from "../../assets/Strawberry-Shortcake-4.png"

const RecipeDetails = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    const [recipeInfo, setRecipeInfo] = useState([]);

    useEffect(() => {
        setRecipeInfo(location.state.item);
        setPrevLocation(location.pathname);
    }, [location, recipeInfo]);
    return (
        <div>
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

            <div className="flex">
                {/* Left side */}
                <div className="w-2/5 bg-white p-8">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">
                            How to make a Strawberry Shortcake
                        </h1>
                        <p className="text-gray-700 mb-4">
                            It seems like there may be a misunderstanding. If you're asking how a user can make a Strawberry Shortcake, the process would be identical to the recipe I shared earlier. It involves preparing the strawberries, making the shortcakes, preparing whipped cream, and finally assembling the shortcake.
                        </p>
                        <div className="flex items-center mb-6">
                            <FaRegThumbsUp className="text-2xl cursor-pointer"/>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                            <img alt="Profile picture of Emma Gonzalez" className="w-12 h-12 rounded-full mr-4" height="50" src={recipeInfo.authorAvatar} width="50"/>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">
                                    Emma Gonzalez
                                </h2>
                            </div>
                            <div>
                                <SaveButton/>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <div className="mr-6 flex flex-col items-center">
                                <p className="text-gray-500 text-sm">
                                    Time:
                                </p>
                                <p className="text-lg font-semibold">
                                    45 minutes
                                </p>
                            </div>
                            <div className="mr-6 flex flex-col items-center">
                                <p className="text-gray-500 text-sm">
                                    Comment
                                </p>
                                <p className="text-lg font-semibold">
                                    12 comments
                                </p>
                            </div>
                            <div className="mr-6 flex flex-col items-center">
                                <p className="text-gray-500 text-sm">
                                    Rating:
                                </p>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-gray-400 cursor-pointer"/>
                                </div>
                            </div>
                        </div>

                        <div class="border-dashed border-2 border-blue-400 p-6 rounded-lg bg-white shadow-md mt-5">
                            <ul class="list-none space-y-2">
                                <li>- Yield: 4 generous servings</li>
                                <li>- 2 pints ripe, well-rinsed strawberries 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">strawberries</span>
                                </li>
                                <li>- 1/2 cup sugar, or more to taste 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">sugar</span>
                                </li>
                                <li>- 4 cups flour 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">flour</span>
                                </li>
                                <li>- 1/4 teaspoon salt 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">salt</span>
                                </li>
                                <li>- 5 teaspoons baking powder 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">baking powder</span>
                                </li>
                                <li>- 1/4 cups butter 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">butter</span>
                                </li>
                                <li>- 3 cups whipping cream 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">whipping cream</span>
                                </li>
                                <li>- ¼ teaspoon vanilla extract 
                                    <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2">vanilla</span>
                                </li>
                            </ul>
                            <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                                <i class="fas fa-plus mr-2"></i> Add to Your Grocery List
                            </button>
                        </div>
                    </div>    
                </div>

                {/* Right side */}
                <div className="w-3/5 bg-white p-8 flex flex-col">
                    <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center mb-8" src={recipeInfo.img}/>
                    <div class="mt-4">
                        <h2 class="text-xl font-semibold">
                            Step 1
                        </h2>
                        <p class="mt-2 text-gray-700 my-4">
                            Pick over and hull strawberries. Cut in half or slice, depending on size. Gently crush about a quarter of the berries with a fork to release their juices. Mix with remaining berries and the ½ cup of sugar, adding more sugar if necessary. Set aside, covered, for about half an hour to develop flavor.
                        </p>
                        <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center" src={img2}/>
                    </div>

                    <div class="mt-4">
                        <h2 class="text-xl font-semibold">
                            Step 2
                        </h2>
                        <p class="mt-2 text-gray-700 my-4">
                            Preheat oven to 450 degrees.
                        </p>
                    </div>

                    <div class="mt-4">
                        <h2 class="text-xl font-semibold">
                            Step 3
                        </h2>
                        <p class="mt-2 text-gray-700 my-4">
                            Into a large mixing bowl, sift together flour, 3 tablespoons sugar, salt and baking powder. Add ¾ cup of softened butter, and rub into dry ingredients as for pastry. Add 1¼ cups cream, and mix to a soft dough. Knead the dough for one minute on a lightly floured pastry board, then roll it out to about ½-inch thickness. Using a 3-inch biscuit cutter, cut an even number of rounds - 2 rounds per serving.
                        </p>
                        <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center" src={img3}/>
                    </div>

                    <div class="mt-4">
                        <h2 class="text-xl font-semibold">
                            Step 4
                        </h2>
                        <p class="mt-2 text-gray-700 my-4">
                            Use a little of the butter to grease a baking sheet. Place half the rounds on it. Melt remaining butter and brush a little on the rounds; place remaining rounds on top. Bake for 10 to 15 minutes, or until golden brown.
                        </p>
                    </div>

                    <div class="mt-4">
                        <h2 class="text-xl font-semibold">
                            Step 5
                        </h2>
                        <p class="mt-2 text-gray-700 my-4">
                            Beat remaining cream until it thickens. Add vanilla. Beat again just until thick.
                        </p>
                        <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center" src={img4}/>
                    </div>

                </div>
            </div>

        </div>
    );
};

 <body class="bg-gray-100 flex items-center justify-center min-h-screen">
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
   <img alt="A delicious dessert with strawberries on top, served in a bowl with crumbles and garnished with edible flowers" class="rounded-lg w-full" height="400" src="https://storage.googleapis.com/a1aa/image/Pldiq1gdF25yAVxvQwLaBYuyZPO4Q5P3nWNE7LR4wwfV2F8JA.jpg" width="600"/>
   <div class="mt-4">
    <h2 class="text-xl font-semibold">
     Step 1
    </h2>
    <p class="mt-2 text-gray-700">
     Pick over and hull
    </p>
   </div>
  </div>
 </body>


export default RecipeDetails;