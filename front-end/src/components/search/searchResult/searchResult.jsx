import React, { useState, useEffect } from "react";
import RecipeCard from "../../recipeCard/recipeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./searchResult.css";
import { useAuth } from "../../../contexts/AuthContext";

const SearchResult = ({ queri, filters }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState("A-Z");
    const [slideDirection, setSlideDirection] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);

    const [savedPosts, setSavedPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingSavedPosts, setIsLoadingSavedPosts] = useState(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:3000/api/posts/search?query=${queri}`, {
            method: "GET", // Explicitly specify GET method (optional, as it's the default)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                setData(data);
                setFilteredData(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                setIsLoadingPosts(false);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                setError(error);
                setIsLoadingPosts(false);
            });
    }, [queri, itemsPerPage]);

    useEffect(() => {
        if (isLoggedIn) {
            // Fetch saved posts
            fetch("http://localhost:3000/api/users/save-post", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies for authentication
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch saved posts");
                    }
                    return response.json();
                })
                .then((savedData) => {
                    setSavedPosts(savedData.savedPosts);
                    setIsLoadingSavedPosts(false);
                })
                .catch((error) => {
                    console.error("Error fetching saved posts:", error);
                    setError(error.message);
                    setIsLoadingSavedPosts(false);
                });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = data.filter((item) => {
                // const matchesType =
                //     filters.type.length === 0 || filters.type.includes(item.type);
                const matchesTime =
                    item.duration >= filters.time.min &&
                    item.duration <= filters.time.max;
                // const matchesRating = item.rating >= filters.rating;

                return matchesTime;
            });
            setFilteredData(filtered);
            setCurrentPage(1); // Reset to first page after applying filters
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        };

        applyFilters();
    }, [filters, data, itemsPerPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setSlideDirection("left");
            setTimeout(() => setCurrentPage((prev) => prev - 1), 300);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setSlideDirection("right");
            setTimeout(() => setCurrentPage((prev) => prev + 1), 300);
        }
    };

    const handlePageClick = (pageNumber) => {
        setSlideDirection(pageNumber > currentPage ? "right" : "left");
        setTimeout(() => setCurrentPage(pageNumber), 300);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const sortedItems = [...filteredData].sort((a, b) => {
        if (sortOrder === "A-Z") {
            return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
    });

    if (isLoadingPosts || isLoadingSavedPosts) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="search-result-container">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {queri} ({filteredData.length})
                </h1>
                <div>
                    <label
                        htmlFor="sort"
                        className="mr-2 font-medium text-gray-600"
                    >
                        Sort:
                    </label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
            </div>

            {/* Recipe Cards with Slide Animation */}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 transition-transform duration-300 ${
                    slideDirection === "right" ? "slide-in-from-right" : ""
                } ${slideDirection === "left" ? "slide-in-from-left" : ""}`}
                onAnimationEnd={() => setSlideDirection("")}
            >
                {sortedItems
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((item, index) => (
                        <div className="pt-4 pb-6 pl-2 pr-2" key={item.id}>
                            <RecipeCard
                                recipe={item}
                                isSaved={savedPosts.some(
                                    (savedPost) => savedPost._id === item._id,
                                )}
                            />
                        </div>
                    ))}
            </div>

            {/* Pagination */}
            <div className="pagination-container">
                <div className="flex justify-center items-center">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="text-blue-500 p-2 disabled:opacity-50"
                    >
                        <FaArrowLeft />
                    </button>
                    <div className="flex items-center space-x-2 mx-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageClick(index + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === index + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="text-blue-500 p-2 disabled:opacity-50"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
