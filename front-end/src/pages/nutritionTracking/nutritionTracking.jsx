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
    const [warning, setWarning] = useState([]);

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
                                id: item.ingredient._id,
                                ingredient: item.ingredient.name,
                                weight: +item.weight})) || [],
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
    useEffect(() => {
        const listWarning = [];
        dataTracking.forEach((item) => {
            if (item.label === 'calories' && item.value > 50){
                listWarning.push("This plan contains too many calories. It may exceed your daily caloric needs.");
            } else if (item.label === 'protein' && item.value > 35){
                listWarning.push("High protein intake can stress your kidneys. Consider moderating protein consumption.");
            } else if (item.label === 'protein' && item.value < 10){
                listWarning.push("Low protein intake. Protein is crucial for muscle repair and overall health.");
            } else if (item.label === 'fat' && item.value < 20){
                listWarning.push("Your fat intake is too low. Fats are essential for brain function and energy.");
            } else if (item.label === 'fat' && item.value > 35){
                listWarning.push("Fat content is excessively high. This may increase the risk of cardiovascular diseases.")
            } else if (item.label == 'carbs' && item.value < 45){
                listWarning.push("Your carbohydrate intake is very low. This may cause fatigue and lack of energy.");
            } else if (item.label == 'carbs' && item.value > 65){
                listWarning.push("Excessive carbohydrate intake can lead to spikes in blood sugar levels. Consider reducing carbs.");
            }
        });
        setWarning(listWarning);
    }, [dataTracking])
    // Function to handle adding a new event
    const handleAddEvent = async (newEvent) => {
        console.log("Add");
        const test = {
                startDate: newEvent.start,
                endDate: newEvent.end,
                name: newEvent.title,
                user: user._id,
                posts: newEvent.extendedProps.recipe,
                type: newEvent.extendedProps.type,
                ingredients: newEvent.extendedProps.ingredients.map((item) => ({
                    ingredient: item.id,
                    quantity: item.weight
                }))
            };
            
        console.log("Add:", test);
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
                    user: user._id,
                    posts: newEvent.extendedProps.recipe,
                    type: newEvent.extendedProps.type,
                    ingredients: newEvent.extendedProps.ingredients.map((item) => ({
                        ingredient: item.id,
                        quantity: +item.weight
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
        console.log("Update");
        console.log("Update:", updateEvent);
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/plans/update/${updateEvent.id}`, {
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
                        ingredient: item.id,
                        quantity: +item.weight
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
        console.log("Delete");
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/plans/delete/"${deleteEvent.id}`, {
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
                    {activeTab === 'tracking' && dataTracking.length > 0 &&
                        <Tracking
                            warning={warning}
                            inputData={dataTracking}
                    />}
                    {activeTab === 'tracking' && dataTracking.length === 0 &&
                        <div className="flex justify-center items-center h-2/3 flex-col">
                            <p>There is no data available for today.</p>
                            <p>Please select another day that has nutrition tracking data.</p>
                        </div>                    
                    }
                </div>   
                <div className="w-1/4 border-2 border-gray-100">
                    <Calender
                        events={plans}
                        handleDatePick={(date) => {setDatePick(date)}}
                    />
                    {activeTab === 'tracking' && dataTracking.length > 0 && (
                        <div className="flex justify-center items-center flex-col">
                            <h2 className="text-red-600 font-medium flex-row flex items-center">
                                Attention
                                <TbAlertTriangle className="m-2 h-6 w-6" />
                            </h2>
                            <div className="mt-4 rounded-lg p-2 max-h-60 overflow-y-auto w-full">
                            {warning.length > 0 ? (
                                <ul className="flex flex-col gap-4">
                                {warning.map((message, index) => (
                                    <li
                                    key={index}
                                    className="bg-red-50 shadow-md p-4 rounded-md text-black text-sm border border-gray-300"
                                    >
                                    {message}
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p className="text-green-600 font-medium text-sm text-center">
                                Your plan is good!
                                </p>
                            )}
                            </div>
                        </div>
                    )}
                </div> 
            </div>
        </div>
    );
};
export default NutritionTracking;