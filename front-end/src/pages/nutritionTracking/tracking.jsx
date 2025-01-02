import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { mobileAndDesktopOS, valueFormatter } from './webUsageStats';

const Tracking = () => {
  return (
    <PieChart
      series={[
        {
          data: mobileAndDesktopOS,
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