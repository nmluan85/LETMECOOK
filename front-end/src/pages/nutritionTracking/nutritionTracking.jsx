import Planing from "./planing";
import Calender from "../../components/calender/calender";
import Scheduler from "../../components/scheduler/scheduler";
import { useState } from 'react';
import { SlCalender } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
const NutritionTracking = () => {
    const [activeTab, setActiveTab] = useState('planing');
    return (
        <div>
            <div className="w-full h-full pt-8 pl-10">
                <div className="flex items-center rounded-lg bg-primary-500 w-fit p-1">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${activeTab === 'planing' ? 'bg-white text-primary-500' : ''}`}
                        onClick={() => setActiveTab('planing')}
                    >   
                        <SlCalender/>
                        Planing
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${activeTab === 'tracking' ? 'bg-white text-primary-500' : ''}`}
                        onClick={() => setActiveTab('tracking')}
                    >
                        <VscGraph/>
                        Tracking
                    </button>
                </div>
            </div>
            <div className="flex h-screen p-4">
                <div className="w-3/4 p-8">
                    {/* <Planing /> */}
                    <Scheduler/>
                </div>   
                <div className="w-1/4 border-2 border-gray-100">
                    <Calender/>
                </div> 
            </div>
        </div>
    );
};
export default NutritionTracking;