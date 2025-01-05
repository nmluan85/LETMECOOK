import React, { useState } from "react";

const NewRecipeInfoSection = ({ onChange }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        onChange({ title: value, description, photo: photoPreview });
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        onChange({ title, description: value, photo: photoPreview });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file); // Generate the URL here
            setPhoto(file);
            setPhotoPreview(previewURL); // Create a preview URL
            onChange({ title, description, photo: previewURL });
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold flex items-center mb-4">
                <span className="text-blue-500 text-4xl mr-2">+</span>
                Add a Recipe
            </h1>
            <p className="mb-6">
                Uploading personal recipes is easy! Add yours to your favorites,
                share with friends, family, or the LETMECOOK community.
            </p>
            <hr className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div>
                        <label
                            className="block text-lg font-semibold mb-2"
                            htmlFor="recipe-title"
                        >
                            Recipe Title*
                        </label>
                        <input
                            type="text"
                            id="recipe-title"
                            placeholder="Give your recipe a title"
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full border border-gray-300 rounded p-5"
                        />
                    </div>
                    <div className="mt-6">
                        <label
                            className="block text-lg font-semibold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Share the story behind your recipe and what makes it special."
                            value={description}
                            onChange={handleDescriptionChange}
                            className="w-full border border-gray-300 p-5 rounded h-32"
                        ></textarea>
                    </div>
                </div>
                <div>
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="photo"
                    >
                        Photo
                    </label>
                    {photoPreview ? (
                        <img
                            src={photoPreview}
                            alt="Recipe preview"
                            className="w-full border border-gray-300 rounded mb-2"
                            style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                    ) : (
                        <div className="w-full h-40 border border-gray-300 rounded mb-2 flex items-center justify-center text-gray-500">
                            No photo uploaded
                        </div>
                    )}
                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="w-full text-sm text-gray-600"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                        Use JPEG or PNG. Must be at least 960 x 960. Max file
                        size: 30MB.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewRecipeInfoSection;
