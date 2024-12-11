import ChefIcon from '../../../assets/icons/chef.png';
import SearchIcon from '../../../assets/icons/search.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleLoginIconClick = () => {
        navigate('login');
    }
    const handleSearchIconClick = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearchIconClick();
        }
    };

    return (
        <div className="bg-white shadow w-full">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={ChefIcon} alt="Logo" className="h-10 w-10 mr-2"/>
                        <span className="text-xl font-bold primary-color">LETMECOOK</span>
                    </div>
                </Link>
                <div className="flex items-center space-x-4">
                    <div className="relative w-[450px]">
                        <input
                            type="text"
                            placeholder="What would you like to cook?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown} // Add this event handler
                            className="border bg-gray-200 rounded-full py-2 px-4 w-full pl-10"
                        />
                        <img
                            src={SearchIcon}
                            alt="Search Icon"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 cursor-pointer"
                            onClick={handleSearchIconClick}
                        />
                    </div>
                    <nav className="space-x-4">
                        <a href="#" className="text-gray-700">What to cook</a>
                        <a href="#" className="text-gray-700">Recipes</a>
                        <a href="#" className="text-gray-700">Ingredients</a>
                        <a href="#" className="text-gray-700">Nutrition tracking</a>
                        <a href="#" className="text-gray-700">About Us</a>
                    </nav>
                    <button 
                        className="bg-primary-default text-white font-medium py-2 px-4 rounded-full"
                        onClick={handleLoginIconClick}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;