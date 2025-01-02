import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { mobileAndDesktopOS, valueFormatter } from './webUsageStats';
import { useEffect, useState } from 'react';

const Tracking = ({inputData}) => {
  const [data, setData] = useState(inputData);
  useEffect(() => {
    console.log('inputData', inputData);
    setData(inputData.nutritionPercentages);
  }, [inputData]);
  return (
    <PieChart
      series={[
        {
          data: inputData,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={400}
    />
  );
}
export default Tracking;