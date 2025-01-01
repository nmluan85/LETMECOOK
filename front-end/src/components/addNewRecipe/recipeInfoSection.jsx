

const NewRecipeInfoSection = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold flex items-center mb-4">
                <span className="text-blue-500 text-4xl mr-2">+</span>
                    Add a Recipe
            </h1>
            <p className="mb-6">
                Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the LETMECOOK community.
            </p>
            <hr className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div>
                        <label className="block text-lg font-semibold mb-2" htmlFor="recipe-title">
                            Recipe Title
                        </label>
                        <input
                            type="text"
                            id="recipe-title"
                            placeholder="Give your recipe a title"
                            className="w-full border border-gray-300 rounded p-5"
                        />
                    </div>
                    <div className="mt-6">
                        <label className="block text-lg font-semibold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Share the story behind your recipe and what makes it special."
                            className="w-full border border-gray-300 p-5 rounded h-32"
                        ></textarea>
                    </div>
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="photo">
                        Photo (optional)
                    </label>
                    <img
                        src="https://storage.googleapis.com/a1aa/image/KyUkDOnqlt6VI9tVgNk2Av20F0lR025FfEs3dB23BDhIvTAKA.jpg"
                        alt="Placeholder for recipe photo"
                        className="w-full border border-gray-300 rounded mb-2"
                        width="200"
                        height="200"
                    />
                    <p className="text-sm text-gray-600">
                        Use JPEG or PNG. Must be at least 960 x 960. Max file size: 30MB
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NewRecipeInfoSection;