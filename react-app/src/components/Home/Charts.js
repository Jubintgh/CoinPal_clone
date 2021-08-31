import React from 'react';
import {Line} from 'react-chartjs-2';


const Charts = ({coinData, coinDataColor}) => {
    let acc = -27;
    const timeLabels = coinData.map(time => {
        return `${acc += 1} days`;
    },)

    const state = {
      labels: timeLabels,
      datasets: [
        {
          label: 'Price',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(1,1,1,1)',
          borderColor: coinDataColor,
          borderWidth: 2,
          devicePixelRatio:-21,
          data: coinData
        }
      ],
      
    options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
                top: 105,
                left: 105,
                right: 105,
                bottom: 105
            }
        }
    }
    }

    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Past month',
              fontSize:100
            },
            legend:{
              display:true,
              position:'left'
            }
          }}
        />
      </div>
    );
}

export default Charts