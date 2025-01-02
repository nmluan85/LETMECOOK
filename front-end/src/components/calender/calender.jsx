import { useState } from 'react';
import { format } from 'date-fns';

import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calender() {
  const [selected, setSelected] = useState();
  const defaultClassNames = getDefaultClassNames();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      classNames={{
        today: `border-amber-500`, // Add a border to today's date
        selected: `bg-primary-500 border-primary-500 text-white rounded-full`, // Highlight the selected day
        root: `${defaultClassNames.root} p-5`, // Add a shadow to the root element
        chevron: `${defaultClassNames.chevron} fill-amber-500` // Change the color of the chevron
      }}
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  );
}