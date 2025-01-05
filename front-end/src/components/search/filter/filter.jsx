import React, { useState } from "react";
import Slider from "react-slider";
import "./filter.css";

const Filters = ({ onApplyFilters }) => {
    const [type, setType] = useState({
        panFried: false,
        stirFried: false,
        grilled: true,
        roasted: true,
        sauteed: false,
        baked: false,
        steamed: false,
        stewed: false,
    });
    const [time, setTime] = useState({ min: 0, max: 120 });
    const [rating, setRating] = useState(3);

    const handleTypeChange = (e) => {
        setType({ ...type, [e.target.name]: e.target.checked });
    };

    const handleTimeChange = ([min, max]) => {
        setTime({ min, max });
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleApplyClick = () => {
        const selectedTypes = Object.keys(type).filter((key) => type[key]);
        onApplyFilters({
            type: selectedTypes,
            time,
            rating,
        });
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <span>Filters</span>
                <span>☰</span>
            </div>

            <div className="filter-group">
                <h3>Type</h3>
                <div className="checkbox-group">
                    {Object.keys(type).map((key) => (
                        <label key={key} htmlFor={key}>
                            <input
                                type="checkbox"
                                id={key}
                                name={key}
                                checked={type[key]}
                                onChange={handleTypeChange}
                            />
                            {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-group slider-group">
                <h3>Time</h3>
                <Slider
                    className="time-slider"
                    thumbClassName="thumb"
                    trackClassName={(index) =>
                        index === 1 ? "track track-1" : "track"
                    }
                    min={0}
                    max={120}
                    value={[time.min, time.max]}
                    onChange={handleTimeChange}
                    ariaLabel={["Minimum time", "Maximum time"]}
                    ariaValuetext={(state) => `Time: ${state} minutes`}
                    withTracks
                />

                <div className="flex justify-between">
                    <span>{time.min} minutes</span>
                    <span>{time.max} minutes</span>
                </div>
            </div>

            <div className="filter-group rating-group">
                <h3>Rating</h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            style={{
                                color: star <= rating ? "#ffc107" : "#ddd",
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div className="apply-button" onClick={handleApplyClick}>
                Apply
            </div>
        </div>
    );
};

export default Filters;
