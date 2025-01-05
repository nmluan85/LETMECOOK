import React, { useState } from "react";
import TypeFilter from "./typeFilter";
import RatingFilter from "./ratingFilter";
import TimeFilter from "./timeFilter";
import "./filter.css";

const FilterSection = ({ onApplyFilters }) => {
    const [type, setType] = useState({
        breakfast: true,
        dessert: true,
        seafood: true,
        vegetarian: true,
        beef: true,
        chicken: true,
        pork: true,
        starter: true,
    });
    const [time, setTime] = useState({ min: 0, max: 120 });
    // first element is for 5 stars, the last element is for 1 star
    const [ratings, setRatings] = useState([true, true, true, true, true]);

    const handleTypeChange = (e) => {
        const { name, checked } = e.target;
        setType((prevType) => ({
            ...prevType,
            [name]: checked,
        }));
    };

    const handleTimeChange = ([min, max]) => {
        setTime({ min, max });
    };

    const handleRatingChange = (index) => {
        setRatings((prevRatings) =>
            prevRatings.map((checked, i) => (i === index ? !checked : checked)),
        );
    };

    const handleApplyClick = () => {
        const selectedTypes = Object.keys(type).filter((key) => type[key]);
        onApplyFilters({
            type: selectedTypes,
            time,
            ratings,
        });
    };
    return (
        <div className="filter-section">
            {/* Type */}
            <div>
                <TypeFilter type={type} onTypeChange={handleTypeChange} />
            </div>

            <hr className="mb-1 mt-2" />

            <div>
                <TimeFilter time={time} onTimeChange={handleTimeChange} />
            </div>

            <hr className="mb-1 mt-2" />

            {/* Rating */}
            <div>
                <RatingFilter
                    ratings={ratings}
                    onRatingsChange={handleRatingChange}
                />
            </div>

            {/* Apply Button */}
            <button className="apply-button" onClick={handleApplyClick}>
                Apply
            </button>
        </div>
    );
};

export default FilterSection;
