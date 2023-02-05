import React, { useState, useEffect, useRef } from "react";
import {useNavigate} from 'react-router-dom';
import Select  from 'react-select'
import colourStyles from '../Select/Select.tsx'
import { colourOptions } from '../../docs/data.ts';

function Faculty() {
  const [faculty, setFaculty] = useState('');
  const navigate = useNavigate();
  const latestFaculty = useRef('');

  useEffect(() => {
    latestFaculty.current = faculty;
  });

  const showMessage =()=>{  
      if(window.confirm('You will be redirected to a selection of classrooms of the corresponding faculty.'))
      navigate('/catalog', {state: {value:latestFaculty.current}});
  }

  const handleChange = (event) => {
    setFaculty(event.value);
    setTimeout(showMessage, 1000);
  }

  return(
    <Select  
      onChange={handleChange}  
      placeholder={'Select Faculty'}                                 
      options={colourOptions}
      styles={colourStyles}                                        
      theme={(theme) => ({
      ...theme,
      borderRadius: 10,
      colors: {
          ...theme.colors,
          primary: 'black',
      },})}
    />);
}

export default Faculty