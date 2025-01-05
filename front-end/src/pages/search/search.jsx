import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchResult from "../../components/search/searchResult/searchResult";
import "./Search.css"; // Import the CSS file
import FilterSection from "../../components/search/filter/filter2";

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    const [filters, setFilters] = useState({
        type: [],
        time: { min: 0, max: 120 },
        rating: 0,
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="search-container">
            <main className="search-main">
                <div className="filters">
                    <FilterSection onApplyFilters={handleApplyFilters} />
                </div>
                <div className="search-results">
                    <SearchResult queri={query} filters={filters} />
                </div>
            </main>
        </div>
    );
};

export default Search;
