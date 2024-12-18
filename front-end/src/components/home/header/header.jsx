import ChefIcon from '../../../assets/icons/chef.png';
import SearchIcon from '../../../assets/icons/search.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from '../../login/loginModal';
import { RiArchive2Line } from "react-icons/ri";
import { useAuth } from '../../../contexts/AuthContext';
import { useLoginModal } from '../../../contexts/LoginModalContext';

const Header = () => {
    const navigate = useNavigate();
    const {openLoginModal, closeLoginModal} = useLoginModal();
    const {isLoggedIn, login, logout} = useAuth();
    const [searchTerm, setSearchTerm] = useState("");

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
    const handleLoginClick = () => {
        openLoginModal(true);
    }
    const handleSignUpClick = () => {
        openLoginModal(false);
    }
    const handleLogoutClick = () => {
        logout();
        closeLoginModal();
    }
    const handleNutritionClick = () => {
        if (isLoggedIn) {
            navigate("/nutrition");
        }
        else {
            openLoginModal(true);
        }
    }
    const handleLoginSuccess = () => {
        login();
        closeLoginModal();
    }
    const navOptions = [
        { label: "What to cook", href: "#" },
        { label: "Recipes", href: "#" },
        { label: "Ingredients", href: "#" },
        { label: "Nutrition tracking", onClick: () => handleNutritionClick() },
        { label: "About Us", href: "#" },
        ...(isLoggedIn
            ? [
                {   
                    paddingX: "px-4",
                    paddingY: "py-2",
                    backgroundColor: "bg-primary-100",
                    hoverBackgroundColor: "hover:bg-primary-150",
                    rounded: "rounded-full",
                    label: "Your Recipe Box",
                    href: "/profile",
                    icon: <RiArchive2Line className="inline-block text-primary-default" />,
                },
              ]
            : []),
    ];

    return (
        <div className="bg-white shadow w-full">
            <div className="flex justify-between items-center py-4 px-6 w-full">
                <Link to="/">
                    <div className="flex items-center mr-5">
                        <img src={ChefIcon} alt="Logo" className="h-10 w-10 mr-2"/>
                        <span className="text-xl font-bold primary-color">LETMECOOK</span>
                    </div>
                </Link>
                <div className="flex-grow max-w mx-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="What would you like to cook?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="border bg-gray-200 rounded-full py-2 px-4 w-full pl-10"
                        />
                        <img
                            src={SearchIcon}
                            alt="Search Icon"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 cursor-pointer"
                            onClick={handleSearchIconClick}
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <nav className="space-x-4 flex flex-wrap text-sm md:text-base">
                        {navOptions.map((option, index) => (
                            <a
                                href={option.href}
                                key={index}
                                onClick={option.onClick}
                                className={`flex items-center justify-center text-gray-700 truncate cursor-pointer transition
                                    ${option.paddingX || ""} 
                                    ${option.paddingY || ""} 
                                    ${option.backgroundColor || ""} 
                                    ${option.rounded || ""}
                                    ${option.hoverBackgroundColor || ""}`}
                            >
                                {option.icon && option.icon}
                                <span className="ml-1">{option.label}</span>
                            </a>
                        ))}
                    </nav>
                    {!isLoggedIn ? (
                        <div>
                            <button
                                onClick={() => handleLoginClick()}
                                className="bg-primary-default text-white font-medium py-2 px-4 rounded-md"
                            >
                                Log in
                            </button>
                            <button
                                onClick={() => handleSignUpClick()}
                                className="bg-primary-150 text-primary-default font-medium py-2 px-4 ml-2 rounded-md"
                            >
                                Sign up
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleLogoutClick()}
                            className="bg-gray-500 text-white font-medium py-2 px-4 rounded-full"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;