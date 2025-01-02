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
    const [dataTracking, setDataTracking] = useState([]);

    // Function to get all plans
    useEffect(() => {
        const getAllPlans = async () => {
            try {
                const test = "6774f5a8d3191c559faeaf74"
                setIsLoading(true);
                const response = await fetch("http://localhost:3000/api/plans/all/" + test, {
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
                            ingredients: plan?.ingredients?.map((item) => ({
                                ingredient: item.ingredient.name,
                                weight: item.weight})) || [],
                            type: plan.type || "other",
                        },
                    }))
                );
            } catch (error) {
                console.log(error.message || "An unexpected error occurred.");
            }
        };
        getAllPlans();
    }, [user]);
    // Function to calculate the calories
    useEffect(() => {
        const pickDate = new Date(datePick);
        const normalizeDate = (date) => {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        };
        const matchingPlans = plans.filter((plan) => {
            const normalizedPickDate = normalizeDate(pickDate);
            const normalizedPlanStart = normalizeDate(new Date(plan.start));
            return normalizedPickDate.getTime() === normalizedPlanStart.getTime();
        });
        const list = matchingPlans.map((plan) => plan.id);
        const caclueCalories = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:3000/api/plans/calculate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user._id,
                        planIds: matchingPlans.map((plan) => plan.id),
                    })
                });
                const data = await response.json();
                if (data.message === 'Plan nutrition calculated successfully.'){
                    setDataTracking(data.nutritionPercentages);
                } else {
                    setDataTracking([]);
                }
            } catch (error) {
                console.log(error.message || "An unexpected error occurred.");
            }
        };
        caclueCalories();
    }, [datePick, plans]);
    // Function to handle adding a new event
    const handleAddEvent = async (newEvent) => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/plans/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startDate: newEvent.start,
                    endDate: newEvent.end,
                    name: newEvent.title,
                    user: user,
                    posts: newEvent.extendedProps.recipe,
                    type: newEvent.extendedProps.type,
                    ingredients: newEvent.extendedProps.ingredients.map((item) => ({
                        ingredient: item.ingredient,
                        weight: item.weight
                    })),
                }),
            });
            const data = await response.json();
            if (data.message === 'Plan created successfully.'){
                alert("Plan created successfully.");
                setPlans((prevEvents) => [
                    ...prevEvents,
                    { ...newEvent, id: data.plan.id}, // Assign a new id
                ]);
            }
        } catch (error) {
            console.log(error.message || "An unexpected error occurred.");
        }
    };
    // Function to handle updating an event
    const handleUpdateEvent = async (updateEvent) => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/plans/update/" + updateEvent.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: updateEvent.id,
                    startDate: updateEvent.start,
                    endDate: updateEvent.end,
                    name: updateEvent.title,
                    posts: updateEvent.extendedProps.recipe,
                    type: updateEvent.extendedProps.type,
                    ingredients: updateEvent.extendedProps.ingredients.map((item) => ({
                        ingredient: item.ingredient,
                        weight: item.weight
                    })),
                }),
            });
            const data = await response.json();
            if (data.massage == 'Plan updated successfully.'){
                alert("Plan updated successfully.");
                setPlans((prevEvents) =>
                    prevEvents.map((event) => {
                        if (event.id === updateEvent.id) {
                          event.title = updateEvent.title;
                          event.start = updateEvent.start;
                          event.end = updateEvent.end;
                          event.extendedProps = { ...updateEvent.extendedProps };
                        }
                    })
                );
            }
        } catch (error) {
            console.log(error.message || "An unexpected error occurred.");
        }
    };
    // Function to handle deleting an event
    const handleDeleteEvent = async (deleteEvent) => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/plans/delete/" + deleteEvent.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.massage == 'Plan deleted successfully.'){
                alert("Plan deleted successfully.");
                setPlans((prevEvents) =>
                    prevEvents.filter((event) => event.id !== deleteEvent.id)
                );
            }
        } catch (error) {
            console.log(error.message || "An unexpected error occurred.");
        }
    };
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
                    {activeTab === 'planing' && 
                        <Scheduler 
                            datePick={datePick} 
                            event={plans}
                            handleAddEvent={(newEvent) => handleAddEvent(newEvent)}
                            handleUpdateEvent={(updateEvent) => handleUpdateEvent(updateEvent)}
                            handleDeleteEvent={(deleteEvent) => handleDeleteEvent(deleteEvent)}
                    />}
                    {activeTab === 'tracking' && 
                        <Tracking
                            inputData={dataTracking}
                    />}
                </div>   
                <div className="w-1/4 border-2 border-gray-100">
                    <Calender
                        events={plans}
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