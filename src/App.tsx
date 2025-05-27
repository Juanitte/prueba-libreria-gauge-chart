
import { useEffect, useState } from 'react';
import './App.css'
import { GaugeChart } from 'reactts-gauge-chart';
import GaugeCharts from './components/gauge-chart';

function App() {
  
const defaultMeterColor = "#fff";
const veryLowColor = "rgba(27, 98, 190, 0.77)";
const lowColor = "rgba(255, 227, 68, 0.77)";
const goodColor = "rgba(71, 185, 48, 0.77)";
const highColor = "rgba(255, 132, 31, 0.77)";
const veryHighColor = "rgba(190, 27, 27, 0.77)";

const [value, setValue] = useState(150);
const [meterColor, setMeterColor] = useState(defaultMeterColor);
const [minValue, setMinValue] = useState(100);
const [maxValue, setMaxValue] = useState(200);
const [veryLowLimit, setVeryLowLimit] = useState(120);
const [lowLimit, setLowLimit] = useState(130);
const [highLimit, setHighLimit] = useState(170);
const [veryHighLimit, setVeryHighLimit] = useState(180);

// Generar valores para que se mueva la aguja
useEffect(() => {
  const interval = setInterval(() => {
    setValue(prev => {
      if (prev < minValue) {
        return minValue;
      }
      const siguiente = prev + 2;
      if (siguiente > maxValue) {
        return minValue;
      }
      return siguiente;
    });
  }, 500);

  return () => clearInterval(interval);
}, [minValue, maxValue]);

useEffect(() => {
  if (value <= veryLowLimit && value >= minValue) {
    setMeterColor(veryLowColor);
  } else if (value <= lowLimit && value > veryLowLimit) {
    setMeterColor(lowColor);
  } else if (value <= highLimit && value > lowLimit) {
    setMeterColor(goodColor);
  } else if (value <= veryHighLimit && value > highLimit) {
    setMeterColor(highColor);
  } else if (value >= veryHighLimit) {
    setMeterColor(veryHighColor);
  } else {
    setMeterColor(defaultMeterColor);
  }
}, [value]);

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <GaugeChart
          dataUnit=""
          needleCurrentValue={value}
          minValue={minValue}
          maxValue={maxValue}
          veryLowLimit={veryLowLimit}
          lowLimit={lowLimit}
          highLimit={highLimit}
          veryHighLimit={veryHighLimit}
          needleWidth={2}
          meterColor={meterColor}
           />
      </div>
    </>
  )
}

export default App
