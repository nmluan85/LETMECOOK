import Slider from 'react-slider';
import { Collapse } from 'react-collapse';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

const TimeFilter = ({time, onTimeChange}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            {/* Time */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Time</h2>
                {isOpen ? (
                <FaChevronUp className="text-blue-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
                ) : (
                <FaChevronDown className="text-blue-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
                )}
            </div>

            <Collapse isOpened={isOpen}>
                <div className="filter-group slider-group">
                    <Slider
                        className="time-slider"
                        thumbClassName="thumb"
                        trackClassName={(index) => (index === 1 ? 'track track-1' : 'track')}
                        min={0}
                        max={120}
                        value={[time.min, time.max]}
                        onChange={onTimeChange}
                        ariaLabel={['Minimum time', 'Maximum time']}
                        ariaValuetext={(state) => `Time: ${state} minutes`}
                        withTracks
                    />

                    <div className="flex justify-between">
                        <span>{time.min} minutes</span>
                        <span>{time.max} minutes</span>
                    </div>
                </div>
            </Collapse>
        </div>
    );
};

export default TimeFilter;