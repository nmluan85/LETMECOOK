import React, { useState } from "react";
import AddIngredient from "./addIngredient";
import { useEffect } from "react";

const Plan = ({
    type,
    event,
    handleSaveChange,
    handleCancel,
    handleDelete,
}) => {
    const [events, setEvents] = useState(event);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-md w-[1000px] max-w-[90%]">
                <h2 className="text-2xl font-bold mb-4 text-primary-500">
                    {type === "edit" ? "Edit Plan" : "Create A New Plan"}
                </h2>
                <div className="flex flex-wrap gap-4">
                    {/* Left Column */}
                    <div className="flex-1">
                        <label className="block mb-2">
                            <span className="font-medium">Title:</span>
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={events?.title ? events.title : ""}
                                onChange={(e) =>
                                    setEvents({
                                        ...events,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <label className="block mb-2">
                            <span className="font-medium">Recipe:</span>
                            <input
                                type="text"
                                placeholder="Recipe"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={
                                    events?.extendedProps.recipe
                                        ? events.extendedProps.recipe
                                        : ""
                                }
                                onChange={(e) =>
                                    setEvents({
                                        ...events,
                                        extendedProps: {
                                            ...events.extendedProps,
                                            recipe: e.target.value,
                                        },
                                    })
                                }
                            />
                        </label>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1">
                        <label className="block mb-2">
                            <span className="font-medium">Start:</span>
                            <input
                                type="datetime-local"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={events?.start || ""}
                                onChange={(e) =>
                                    setEvents({
                                        ...events,
                                        start: e.target.value,
                                    })
                                }
                            />
                        </label>

                        <label className="block mb-2">
                            <span className="font-medium">End:</span>
                            <input
                                type="datetime-local"
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={events?.end || ""}
                                onChange={(e) => {
                                    const endTime = e.target.value;
                                    if (
                                        new Date(endTime) >
                                        new Date(events.start)
                                    ) {
                                        setEvents({ ...events, end: endTime });
                                    } else {
                                        alert(
                                            "End time must be later than the start time.",
                                        );
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>
                <AddIngredient
                    ingre={
                        events?.extendedProps.ingredients
                            ? events.extendedProps.ingredients
                            : []
                    }
                    listIngredients={(updateIngredients) => {
                        setEvents({
                            ...events,
                            extendedProps: {
                                ...events.extendedProps,
                                ingredients: updateIngredients,
                            },
                        });
                    }}
                />

                <label className="block mb-2">
                    <span className="font-medium">Type:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {[
                            "breakfast",
                            "brunch",
                            "lunch",
                            "snacks",
                            "dinner",
                            "supper",
                        ].map((tag) => (
                            <button
                                key={tag}
                                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                                    events?.extendedProps?.type === tag
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                                onClick={() =>
                                    setEvents({
                                        ...events,
                                        extendedProps: {
                                            ...events.extendedProps,
                                            type: tag,
                                        },
                                    })
                                }
                            >
                                {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </button>
                        ))}
                    </div>
                </label>

                <div className="flex justify-end">
                    {type === "edit" && (
                        <button
                            className="px-4 py-2 text-red-600 rounded-md mr-6"
                            onClick={() => {
                                setEvents({
                                    id: events.id,
                                    title: "",
                                    start: "",
                                    end: "",
                                    extendedProps: null,
                                });
                                handleDelete(events);
                            }}
                        >
                            Delete plan
                        </button>
                    )}
                    <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md mr-6"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md"
                        onClick={() => {
                            handleSaveChange(events);
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Plan;
