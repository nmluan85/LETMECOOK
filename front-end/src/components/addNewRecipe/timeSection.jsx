import React, { useState } from 'react';

const NewRecipeTimeSection = () => {
  const [cookTime, setCookTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const handleCookTimeChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setCookTime(value);

    // Update total time in minutes
    setTotalTime(value); // Assuming cookTime is the total time for now
  };

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Other Information</h2>
        <div className="flex items-center space-x-4">
            <label className="font-bold mr-60">Cook Time</label>
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
        <div className='mt-5'>
            <label className="block font-bold mb-2" htmlFor="youtube-video">
                Youtube Video (optional)
            </label>
            <input
                type="text"
                id="youtube-video"
                placeholder="Enter Youtube URL of the dish"
                className="w-full border border-gray-300 rounded p-5"
            />
        </div>
    </div>
  );
};

export default NewRecipeTimeSection;