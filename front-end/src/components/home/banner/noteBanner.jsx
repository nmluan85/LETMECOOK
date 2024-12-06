import React, {useRef, useState, useEffect} from "react";
import { GrFormNextLink } from "react-icons/gr";

const NoteBanner = ({title, author, content}) => {
    const titleRef = useRef(null);
    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {
        if (titleRef.current){
            setTitleHeight(titleRef.current.offsetHeight);
        }
    }, [title]);
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <div ref={titleRef}
                    className="absolute left-1/2 transform -translate-x-1/2 bg-secondary-default text-white px-4 py-2 rounded-md shadow-md"
                    style={{top: `-${titleHeight/2}px`}}>

                    {title}
                </div>

                <h3 className="text-2xl font-bold mb-4 mt-6">{author}</h3>
                <p className="text-gray-700 mb-4">{content}</p>
                <div className="flex items-center justify-center mb-10">
                    <img
                        src="https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg"
                        alt="Salad Caprese"
                        className="h-10 w-10 rounded-full mr-2"
                    />
                    <span className="text-gray-700">{author}</span>
                    
                </div>
                <div className="flex items-center justify-center mb-4">
                    <button className="button text-white py-2 px-2 rounded-lg">
                        <span>View now</span>
                        <GrFormNextLink className="ml-1 w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default NoteBanner;