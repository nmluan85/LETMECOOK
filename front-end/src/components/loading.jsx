import React from "react";

function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                {/* Loading text */}
                <p className="mt-4 text-gray-700 text-lg">Fetching Data</p>
            </div>
        </div>
    );
}

export default LoadingScreen;
