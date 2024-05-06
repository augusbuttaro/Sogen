import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Slider, Box } from '@mui/material';

function PriceFilter({ onChange }) {
  const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 100,
      label: '+$100',
    },
  ];
  const [value, setValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };


  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            marks={marks}
        />
      </Box>
    </>
  )
}

export default PriceFilter