import React, { useEffect, useState } from "react";
import foodPic from "../../assets/foodPic.png";

const Upgrade = () => {
    return (
        <div>
            <div className="bg-white text-black w-full max-w-4xl p-4 rounded-lg flex items-center justify-between ml-20">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500" href="#">
                        Recipes
                    </span>
                    <span className="text-gray-500">&gt;</span>
                    <span className="text-blue-500" href="#">
                        Subscribe
                    </span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center px-6 pt-6 pb-16 mx-16">
                {/* Text Section */}
                <div className="lg:w-1/2 w-full lg:pr-8">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4">
                        These features are exclusively available to premium users
                    </h1>
                    <h2 className="text-3xl font-bold text-blue-600 mb-6">
                        Join now to access groundbreaking and incredible features
                    </h2>
                    <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                            <span className="text-green-500 text-xl mr-3">
                                ✔
                            </span>
                            <p className="text-gray-700">
                                Upload unlimited post to show your cooking skill
                            </p>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 text-xl mr-3">
                                ✔
                            </span>
                            <p className="text-gray-700">
                                Add your favorite dish to eating schedule
                            </p>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 text-xl mr-3">
                                ✔
                            </span>
                            <p className="text-gray-700">
                                Keep track of your nutrional consuming
                            </p>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 text-xl mr-3">
                                ✔
                            </span>
                            <p className="text-gray-700">
                                Receive advice about your eating habit
                            </p>
                        </li>
                    </ul>
                    <div className="text-2xl font-bold text-gray-800 mb-4">
                        0.25 USD/Week
                    </div>
                    <p className="text-gray-500 mb-6">
                        Billed as $1 every 4 weeks for the first year
                    </p>
                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Subscribe Now
                    </button>
                    <button className="text-gray-500 w-full text-sm mt-4 text-center">
                        Cancel or Pause anytime
                    </button>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/2 w-full mx-6 rounded-lg">
                    <img
                        src={foodPic}
                        alt="Delicious Recipes"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};
export default Upgrade;
