import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="w-14 h-14 rounded-full text-white bg-primary-700 bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2"
            onClick={onClick}
        >
            <span className="text-xl">
                <FaLongArrowAltRight />
            </span>
        </div>
    );
};

export default NextArrow;
