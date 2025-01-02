import React, { useState } from "react";
import AddIngredient from "./addIngredient";
import { useEffect} from "react";

const Plan = ({type, event, handleSaveChange, handleCancel}) => {
    const [events, setEvents] = useState(event);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 shadow-md w-[1000px] max-w-[90%]">
                <h2 className="text-2xl font-bold mb-4">{type === 'edit' ? 'Edit Plan' : 'Create a new plan'}</h2>
                <label className="block mb-2">
                    Title:
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={events.title}
                        onChange={(e) => setEvents({...events, title: e.target.value})}
                    />
                </label>

                <label className="block mb-2">
                    Start:
                    <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={events.extendedProps.start}
                        onChange={(e) => setEvents({...events, start: e.target.value})}
                    />
                </label>
                
                <label className="block mb-2">
                    End:
                    <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={events.extendedProps.end}
                        onChange={(e) => setEvents({...events, end: e.target.value})}
                    />
                </label>

                <label className="block mb-2">
                    Recipe
                    <input 
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={events.extendedProps.recipe}
                        onChange={(e) => setEvents({...events, extendedProps: {...events.extendedProps, recipe: e.target.value}})}
                    />
                </label>

                <AddIngredient
                    ingre={events.extendedProps.ingredient}
                    listIngredients={(updateIngredients) => {
                        setEvents({...events, extendedProps: {...events.extendedProps, ingredient: updateIngredients}})}}
                />

                <label className="block mb-2">
                    Type:
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["breakfast", "brunch", "lunch", "snacks", "dinner", "supper"].map((tag) => (
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
                    <button
                        className="px-4 py-2 text-red-600 rounded-md mr-6"
                        onClick={() => {
                            setEvents({
                                id: events.id,
                                title: "",
                                start: "",
                                end: "",
                                extendedProps: null
                            });
                            handleSaveChange(events);
                        }}
                    >
                        Delete plan
                    </button>
                    <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md mr-6"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md"
                        onClick={() => {
                            console.log("Plann", events)
                            handleSaveChange(events)}}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>  
    )
}
export default Plan;