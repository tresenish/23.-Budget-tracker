import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';
import './Chart.js';

export const Chart = () => {
  const expenses = useSelector((state) => state.expenses);
  const currency = useSelector((state) => state.expenses.currency);

  const [margins, setMargins] = useState({ top: 40, right: 80, bottom: 80, left: 80 });
  const [legendTranslateY, setLegendTranslateY] = useState(56);
  const [containerHeight, setContainerHeight] = useState('500px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setMargins({ top: 0, right: 3, bottom: 0, left: 3 });
        setLegendTranslateY(20);
        setContainerHeight('350px');
      } else {
        setMargins({ top: 40, right: 80, bottom: 80, left: 80 });
        setLegendTranslateY(56);
        setContainerHeight('500px');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = React.useMemo(() => {
    const data = Object.entries(expenses)
      .filter(([key]) => key !== 'currency' && key !== 'History')
      .map(([key, value]) => {
        const totalValue = value.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0).toFixed(2);
        return {
          id: key,
          label: key.replace(/([A-Z])/g, ' $1').trim(),
          value: parseFloat(totalValue),
        };
      })
      .filter((data) => data.value > 0);

    console.log('Chart data:', data);
    return data;
  }, [expenses]);

  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);

  if (chartData.length === 0) {
    return <div>No data available for the chart</div>;
  }

  return (
    <div className="chart-container" style={{ height: containerHeight, width: '100%', maxWidth: '90vw', margin: '0 auto' }}>
      <ResponsivePie
        data={chartData}
        margin={margins}
        innerRadius={0.5}
        padAngle={1.5}
        cornerRadius={3}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#ffffff"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#ffffff"
        enableSliceLabels={true}
        sliceLabel={(d) => `${currency}${d.value}`}
        activeOuterRadiusOffset={8}
        motionConfig="wobbly"
        tooltip={({ datum }) => (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              color: '#333',
            }}
          >
            <strong>{datum.label}</strong>
            <br />
            Total: {currency}
            {datum.value.toFixed(2)}
            <br />
            Percentage: {((datum.value / totalExpenses) * 100).toFixed(2)}%
          </div>
        )}
        theme={{
          labels: {
            text: {
              fill: '#ffffff',
            },
          },
          legends: {
            text: {
              fill: '#ffffff',
              fontSize: 12,
            },
          },
        }}
        layers={[
          'arcs',
          'arcLabels',
          'radialLabels',
          'slices',
          'sliceLabels',
          'legends',
          ({ centerX, centerY }) => (
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                fill: '#ffffff',
              }}
            >
              {currency}
              {totalExpenses.toFixed(2)}
            </text>
          ),
        ]}
      />
    </div>
  );
};
