import React, { useState } from "react";
import { FaStar, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Collapse } from "react-collapse";

const RatingFilter = ({ ratings, onRatingsChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Rating</h2>
                {isOpen ? (
                    <FaChevronUp
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                ) : (
                    <FaChevronDown
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                )}
            </div>
            <Collapse isOpened={isOpen}>
                <div className="space-y-2">
                    {ratings.map((checked, index) => (
                        <div className="flex items-center" key={index}>
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"
                                checked={checked}
                                onChange={() => onRatingsChange(index)}
                            />
                            <div className="flex ml-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        className={
                                            i < 5 - index
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    );
};

export default RatingFilter;
