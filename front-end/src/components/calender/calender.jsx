import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const Calender = ({ handleDatePick, events }) => {
  const [selected, setSelected] = useState();
  const [plans, setPlans] = useState(events);
  const [plannedDates, setPlannedDates] = useState([]);
  const defaultClassNames = getDefaultClassNames();
  useEffect(() => {
    setPlans(events);
    console.log("Calenn", plans);
  }, [events]);
  useEffect(() => {
    setPlannedDates(plans.map((plan) => plan.start));
  }, [plans])
  useEffect(() => {
    handleDatePick(selected);
  }, [selected, handleDatePick]);

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      modifiers={{
        marked: plannedDates,
      }}
      classNames={{
        today: `border-amber-500`,
        selected: `bg-primary-500 border-primary-500 text-white rounded-full`, // Highlight the selected day
        root: `${defaultClassNames.root} p-5`, // Root styling
        chevron: `${defaultClassNames.chevron} fill-amber-500`, // Chevron styling
        day: `${defaultClassNames.day} ${plannedDates.includes(selected) ? 'bg-primary-200 text-black rounded-full' : ''}`,
      }}
      modifiersStyles={{
        marked: {
          backgroundColor: '#d3e0fa', // Light blue for marked days
          color: '#1d4ed8', // Blue text
          borderRadius: '50%',
        },
        today: {
          borderColor: '#0b2660', // Amber border for today's date
          borderWidth: '2px',
          borderStyle: 'solid',
          borderRadius: '50%',
          width: '44px', // Ensure equal width
          height: '44px', // Ensure equal height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    />
  );
};

export default Calender;
