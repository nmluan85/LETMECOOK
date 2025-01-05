import { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
const Planing = () => {
    const [activeTab, setActiveTab] = useState("planing");
    const [date, setDate] = useState(new Date());
    return (
        <div className="w-full h-full p-8">
            <div className="flex items-center rounded-lg bg-primary-500 w-fit p-1">
                <button
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${activeTab === "planing" ? "bg-white text-primary-500" : ""}`}
                    onClick={() => setActiveTab("planing")}
                >
                    <SlCalender />
                    Planing
                </button>
                <button
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${activeTab === "tracking" ? "bg-white text-primary-500" : ""}`}
                    onClick={() => setActiveTab("tracking")}
                >
                    <VscGraph />
                    Tracking
                </button>
            </div>
        </div>
    );
};
export default Planing;
