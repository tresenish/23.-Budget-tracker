import React from 'react';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';

export const Chart = () => {
  const expenses = useSelector((state) => state.expenses);
  const currency = useSelector((state) => state.expenses.currency);

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
    <div style={{ height: 500 }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
        sliceLabel={d => `${currency}${d.value}`} 
        activeOuterRadiusOffset={8}
        motionConfig="wobbly"
        tooltip={({ datum }) => (
          <div style={{ 
            background: 'white', 
            padding: '9px 12px', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            color: '#333'
          }}>
            <strong>{datum.label}</strong>
            <br />
            Total: {currency}{datum.value.toFixed(2)}
            <br />
            Percentage: {((datum.value / totalExpenses) * 100).toFixed(2)}%
          </div>
        )}
        legends={[
          {
            anchor: 'left',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#ffffff',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 15,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#ffffff',
                },
              },
            ],
          },
        ]}
        theme={{
          labels: {
            text: {
              fill: '#ffffff',
            },
          },
          legends: {
            text: {
              fill: '#ffffff',
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
              {currency}{totalExpenses.toFixed(2)}
            </text>
          ),
        ]}
      />
    </div>
  );
};
