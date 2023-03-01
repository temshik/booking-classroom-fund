import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CreateBooking.scss'

const CreateBooking = (schedule) => {    
   // const listItems = schedule.map((value) => <p>{value}</p>);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
          ...errors,
          [field]: null
        })
      }

    const findFormErrors = () => {
        const { userName, workspaceNumber, groupNumber, dayOfWeek } = form
        const newErrors = {}
        // userName errors
        if ( !userName && userName === '' ) newErrors.userName = 'cannot be blank!'        
        // workspaceNumber errors
        if ( !workspaceNumber || workspaceNumber === '' ) newErrors.workspaceNumber = 'select a workspace number!'
        // groupNumber errors
        if ( !groupNumber || groupNumber.length !== 8 ) newErrors.groupNumber = 'must assign a code that consists of 8 numbers!'
        // dayOfWeek errors
        if ( !dayOfWeek || dayOfWeek === '' ) newErrors.dayOfWeek = 'select a week number!'        

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors!
          setErrors(newErrors)
        } else {
          // No errors! Put any logic here for the form submission!
          alert('Booking created!')
        }
      }

    return (
        <div className='Form'>        
          <h1 style={{margin:'10px'}}>Create booking</h1>            
          <Form style={{ width: '300px' }}>
          <Form.Group>
              <Form.Label>Date: {}</Form.Label> 
            </Form.Group>
            <Form.Group>
              <Form.Label>User name</Form.Label>
              <Form.Control 
                type='text'
                defaultValue={'Current user'} 
                onChange={ e => setField('userName', e.target.value)}
                isInvalid={ !!errors.userName } 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.userName }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Workspace number</Form.Label>
              <Form.Control as='select' 
                onChange={ e => setField('workspaceNumber', e.target.value) }
                isInvalid={ !!errors.workspaceNumber }>
                <option value=''>Select a number:</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>                
              </Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.workspaceNumber }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Week number</Form.Label>
              <Form.Control as='select'
                onChange={ e => setField('dayOfWeek', e.target.value) }
                isInvalid={ !!errors.dayOfWeek }>
                <option value=''>Select a week:</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
              </Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.dayOfWeek }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Group number</Form.Label>
              <Form.Control 
                type='number' 
                onChange={ e => setField('groupNumber', e.target.value) }
                isInvalid={ !!errors.groupNumber }/>
                <Form.Control.Feedback type='invalid'>
                    { errors.groupNumber }
                </Form.Control.Feedback>
            </Form.Group>
            <Button style={{margin:'10px'}} type='submit' onClick={handleSubmit}>Submit Booking</Button>
          </Form>
        </div>
      )
};

export default CreateBooking;