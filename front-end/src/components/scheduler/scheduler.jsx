import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Plan from "../plan/plan";
import { set } from "date-fns";

const Scheduler = (date) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [type, setType] = useState("edit");
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Pancakes with Cheese and Egg",
            start: "2025-01-05T08:00:00",
            end: "2025-01-05T010:00:00",
            extendedProps: {
                recipe: "Recipe 01",
                ingredient: ["beef", "cheese"],
                type: "breakfast",
            },
        },
        {
            id: 2, 
            title: "Pancakes with Cheese and Egg",
            start: "2025-01-04T10:00:00",
            end: "2025-01-04T11:00:00",
            extendedProps: {
                ingredient: ["beef", "cheese"],
                recipe: "Recipe 01",
                type: "brunch",
            },
        },
        {
            id: 3,
            title: "Chicken Salad",
            start: "2025-01-03T10:00:00",
            end: "2025-01-03T11:00:00",
            extendedProps: {
                recipe: "Recipe 01",
                ingredient: ["chicken", "egg"],
                type: "lunch",
            },
        },
        {
            id: 4,
            title: "Fruits",
            start: "2025-01-02T10:00:00",
            end: "2025-01-02T11:00:00",
            extendedProps: {
                recipe: "Recipe 01",
                ingredient: [],
                type: "snacks",
            },
        },
        {
            id: 5,
            title: "Pastas",
            start: "2025-01-01T10:00:00",
            end: "2025-01-01T11:00:00",
            extendedProps: {
                recipe: "Recipe 01",
                ingredient: ["beef", "cheese"],
                type: "dinner",
            },
        },
        {
            id: 6,
            title: "Supper",
            start: "2025-01-04T11:00:00",
            end: "2025-01-04T12:00:00",
            extendedProps: {
                recipe: "Recipe 01",
                ingredient: [],
                type: "supper",
            },
        },
        // Add more events as needed
    ]);
    const handleDateClick = (arg) => {
        setType("add");
        setSelectedDate(arg.dateStr);
        setIsOpenModal(true);
    };
    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr,
            extendedProps: info.event.extendedProps,
        });
        setType("edit");
        setIsOpenModal(true);
    };
    const handleSaveChanges = (events) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === events.id ? events : event
            )
        );
        setIsOpenModal(false);
    };
    return (
        <div className="scheduler-container">
        <style>
            {`
                .fc-toolbar .fc-button {
                    background-color: #ffffff; /* Default Blue */
                    color: #1751d0; /* Text color */
                    font-weight: bold;
                    padding: 8px 16px;
                    border-color: transparent;
                    border-radius: 6px;
                    font-size: 14px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.3s ease;
                }
                .fc-toolbar .fc-button:hover {
                    background-color: #2563eb; /* Lighter Blue on Hover */
                }
                .fc-toolbar .fc-button.fc-state-active {
                    background-color: #1751d0; /* Active State Green */
                    color: black;
                    font-weight: bold;
                }
                .fc-toolbar .fc-button::first-letter {
                    text-transform: uppercase; /* Uppercase the first letter */
                }
                .fc-timegrid-slot-label {
                    text-transform: uppercase;
            `}
        </style>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
            start: "title",
            center: "prev,next today",
            end: "dayGridMonth timeGridWeek timeGridDay",
            }}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventBackgroundColor="#d3e0fa"
            eventBorderColor="#d3e0fa"
            events={events}
            eventContent={(eventInfo) => {
            const { title, extendedProps } = eventInfo.event;
            return (
                <div className="flex flex-col bg-opacity-50 p-1 rounded-lg overflow-hidden w-full cursor-pointer">
                    <p 
                        className="font-bold text-primary-500 truncate"
                    >
                    {title}
                    </p>
                    <p className="text-sm text-primary-500"> Recipe:  {extendedProps.recipe ? "Yes" : "No"}</p>
                    <p className="text-sm text-primary-500"> Ingredient: {extendedProps.ingredient ? extendedProps.ingredient.length : 0}</p>
                    <span
                        className={`text-xs px-2 py-1 rounded-full w-fit mt-1 ${
                        extendedProps.type === "breakfast"
                            ? "bg-blue-300 text-black"
                            : extendedProps.type === "brunch"
                            ? "bg-pink-300 text-black"
                            : extendedProps.type === "lunch"
                            ? "bg-green-300 text-black"
                            : extendedProps.type === "snacks"
                            ? "bg-yellow-300 text-black"
                            : extendedProps.type === "dinner"
                            ? "bg-red-300 text-black"
                            : extendedProps.type === "supper"
                            ? "bg-purple-300 text-black" 
                            : "bg-orange-300 text-black"
                        }`}
                    >
                        {extendedProps.type.charAt(0).toUpperCase() +
                        extendedProps.type.slice(1)}
                    </span>
                </div>
            );
            }}
            height="90vh"
        />
        {isOpenModal && (
            <Plan
                type={type}
                event={selectedEvent}
                handleSaveChange={(events) => {
                    console.log("Scheduler", events);
                    handleSaveChanges(events)}}
                handleCancel={() => setIsOpenModal(false)}
            />
        )}
        </div>
    );
};

export default Scheduler;
