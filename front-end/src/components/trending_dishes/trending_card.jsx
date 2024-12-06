import { FaBookmark, FaStar } from "react-icons/fa"

const DishCard = ({dishName, cookTime, author, description}) => {
    return (
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
            <img alt="Stuffed sticky rice ball on a plate" className="w-1/3 object-cover" height="150" src="https://storage.googleapis.com/a1aa/image/4RfzyGbIQLy6Uyz1ZiIs0IqVZ57iSTXZKfferQ0puxXsrcfeE.jpg" width="150"/>

            <div className="p-4 w-2/3">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold">
                            {dishName}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {cookTime}
                        </p>
                    </div>
                    <FaBookmark className="far fa-bookmark text-blue-600"/>
                </div>
                <div className="flex items-center mt-2">
                    <img alt="Jennifer King" className="w-8 h-8 rounded-full" height="30" src="https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg" width="30"/>
                    <p className="ml-2 text-gray-700">
                        {author}
                    </p>
                </div>
                <p class="text-gray-600 mt-2">
                    {description}
                </p>

                <div class="flex items-center mt-2 justify-end">
                    <span class="text-yellow-400">
                        <FaStar />
                    </span>
                    <span class="text-yellow-400">
                        <FaStar />
                    </span>
                    <span class="text-yellow-400">
                        <FaStar />
                    </span>
                    <span class="text-yellow-400">
                        <FaStar />
                    </span>
                    <span class="text-gray-300">
                        <FaStar />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DishCard;