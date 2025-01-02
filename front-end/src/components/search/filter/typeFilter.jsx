import { Collapse } from 'react-collapse';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

const TypeFilter = ({type, onTypeChange}) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Type</h2>
                {isOpen ? (
                <FaChevronUp className="text-blue-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
                ) : (
                <FaChevronDown className="text-blue-600 cursor-pointer" onClick={() => setIsOpen(!isOpen)}/>
                )}
            </div>

            {/* Collapsible Content */}
            <Collapse isOpened={isOpen}>
                <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.keys(type).map((key) => (
                    <div key={key} className="flex items-center">
                    <input
                        type="checkbox"
                        id={key}
                        name={key}
                        checked={type[key]}
                        onChange={onTypeChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label
                        htmlFor={key}
                        className="ml-2 text-sm font-medium text-gray-700 capitalize"
                    >
                        {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    </div>
                ))}
                </div>
            </Collapse>
        </div>
    );
};

export default TypeFilter;