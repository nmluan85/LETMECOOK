import Planing from "./planing";
import Calender from "../../components/calender/calender";
import Scheduler from "../../components/scheduler/scheduler";
import Tracking from "./tracking";
import { useState, useEffect} from 'react';
import { SlCalender } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";
import { TbAlertTriangle } from "react-icons/tb";
import { useAuth } from "../../contexts/AuthContext";


const NutritionTracking = () => {
    const [activeTab, setActiveTab] = useState('planing');
    const [plans, setPlans] = useState([]);
    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [datePick, setDatePick] = useState(null);
    useEffect(() => {
        console.log("Plans", plans);
    }, [plans])
    useEffect(() => {
        console.log("In nutrioton", user ? user._id : "No user");
        const getAllPlans = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:3000/api/plans/all/6774f5a8d3191c559faeaf74", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setPlans(
                    data.map((plan) => ({
                        id: plan._id,
                        start: new Date(plan.startDate),
                        end: new Date(plan.endDate),
                        title: plan.name,
                        extendedProps: {
                            recipe: plan?.posts?.title || "",
                            ingredients: plan?.ingredients || [],
                            type: plan.type || "other",
                        },
                    }))
                );
                data.map((plan) => {
                    plan.start = new Date(plan.start);
                    plan.end = new Date(plan.end);
                    
                });
            } catch (error) {
                console.log(error.message || "An unexpected error occurred.");
            }
        };
        getAllPlans();
    }, [user]);
    return (
        <div>
            <div className="w-full h-full pt-8 pl-10">
                <div className="flex items-center rounded-lg bg-primary-500 w-fit p-1">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${activeTab === 'planing' ? 'bg-white text-primary-500' : 'text-white'}`}
                        onClick={() => setActiveTab('planing')}
                    >   
                        <SlCalender/>
                        Planing
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md ${activeTab === 'tracking' ? 'bg-white text-primary-500' : 'text-white'}`}
                        onClick={() => setActiveTab('tracking')}
                    >
                        <VscGraph/>
                        Tracking
                    </button>
                </div>
            </div>
            <div className="flex h-screen pl-4 pr-4 pb-4">
                <div className="w-3/4 p-8">
                    {activeTab === 'planing' && <Scheduler datePick={datePick}/>}
                    {activeTab === 'tracking' && <Tracking/>}
                </div>   
                <div className="w-1/4 border-2 border-gray-100">
                    <Calender
                        handleDatePick={(date) => {setDatePick(date)}}
                    />
                    {activeTab === 'tracking' && 
                        <div className="flex justify-center items-center flex-col">
                            
                            <h2 className="text-red-600 font-medium flex-row flex items-center">Attention
                                <TbAlertTriangle className="m-2 h-6 w-6"/>
                            </h2>
                            <div className="bg-red-100 rounded-lg p-4 m-4">
                                "You have exceeded the daily limit of calories. Please consider reducing the amount of food you consume."
                            </div>
                        </div>

                    }
                </div> 
            </div>
        </div>
    );
};
export default NutritionTracking;