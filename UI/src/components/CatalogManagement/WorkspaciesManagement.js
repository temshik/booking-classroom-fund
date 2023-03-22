import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loader from '../Loader/Loader';
import { buildingOptions } from '../../docs/data.ts';
import image1 from '../../images/AccessDenied.jpg'
import {GetUserRoleByEmail, selectRole, selectEmail} from '../../redux/slice/authSlice';
import { selectIsWorkspaceCreated, selectIsWorkspaceUpdated,
  selectIsCategoryLoading, selectIsWorkspaceLoading, 
  getCategory, selectCat,
  createWorkspace, updateWorkspace} from '../../redux/slice/catalogSlice';
import './WorkspaciesManagement.scss';

const WorkspaciesManagement = (props) => {
    const dispatch = useDispatch();
    const stateEmail = useSelector(selectEmail);
    const role = useSelector(selectRole);
    const [userRole, setUserRole] = useState('Teacher');
    const email = (stateEmail !== null)? stateEmail : window.sessionStorage.getItem('email');
    const navigate = useNavigate();
    const category = useSelector(selectCat);
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isWorkspaceLoading = useSelector(selectIsWorkspaceLoading);
    const createdWorkspace = useSelector(selectIsWorkspaceCreated);
    const updatedWorkspace = useSelector(selectIsWorkspaceUpdated);
    const [selectedCategory, setSelectedCategory] = useState([]);//
    const [form, setForm] = useState(props.form)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{  
      getRole();  
      getCategories();      
    },[])

    useEffect(()=>{
      if(role !== null)
      setUserRole(role)
    },[role])

    useEffect(()=>{
      if(category !== null)                  
          setSelectedCategory(category)                       
    },[category])

    useEffect(()=>{
      if(createdWorkspace || updatedWorkspace)
        setTimeout(showMessage,500);
    },[createdWorkspace, updatedWorkspace])

    useEffect(()=>{
      if(isCategoryLoading === false || isWorkspaceLoading === false)
          setTimeout(() => {setLoading(false)}, 500);
      else setLoading(true);
    },[isCategoryLoading,isWorkspaceLoading])

    const getCategories = () => {
      if(window.localStorage.getItem('accessToken') !== null){    
        dispatch(getCategory());          
      }
    }

    const getRole = () => {
      if(window.localStorage.getItem('accessToken') !== null){  
          dispatch(GetUserRoleByEmail(email))            
      }
    }

    const showMessage =()=>{  
      if(window.confirm(`Succesfuly ${props.managementTask}. You can redirect to catalog page.`))
      navigate('/Catalog');
    }

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
      const {campusNumber, workspaceNumber, categoryId, description, numberOfSeats, courseNumber } = form
      const newErrors = {}
      // workspaceId errors
      //if(props.useId) {if ( !id || !isInt(id) || id<=0 || id === '') newErrors.id = 'must assign an existing Identifier!'}
      //  errors
      if ( !categoryId || categoryId === '') newErrors.categoryId = 'must assign an existing category!'     
      // workspaceNumber errors
      if ( !workspaceNumber || !isInt(workspaceNumber) || workspaceNumber<=0 || workspaceNumber>=999) newErrors.workspaceNumber = 'select a correct workspace number between 1...999 integers!'
      // campusNumber errors
      if ( !campusNumber || campusNumber === '') newErrors.campusNumber = 'must assign an existing campus number!'
      // courseNumber errors
      if ( !courseNumber || courseNumber === '') newErrors.courseNumber = 'must assign an existing course number!'
      // description errors
      if ( !description || description === '' ) newErrors.description = 'cannot be blank!'  
      else if ( description.length > 300 ) newErrors.description = 'description is too long, must be < 300 characters!'      
      // numberOfSeats errors
      if ( !numberOfSeats || !isInt(numberOfSeats) || numberOfSeats<=0 || numberOfSeats>=999) newErrors.numberOfSeats = 'select a correct number of seats between 0...999 integers!'

      return newErrors
    }

    function isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
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
        if(window.localStorage.getItem('accessToken') !== null){ 
          if(props.managementTask === 'Update Workspace')     
          {
            dispatch(updateWorkspace(form));              
          }
          else if(props.managementTask === 'Create Workspace')
          {
            dispatch(createWorkspace(form));
          }
          else
          console.log('form',form)
        }
      }
    }

    return (        
        <div className='CreateWorkspace'>
        {loading && <Loader/>}   
        {userRole!=='Teacher'? <div className='Form'>        
          <h1 style={{margin:'10px'}}>{props.managementTask}</h1>                    
          <Form style={{ width: '300px' }}>
            <Form.Group>
              <Form.Label>Campus number</Form.Label> 
                <Form.Control as='select' 
                  onChange={ e => setField('campusNumber', e.target.value) }
                  isInvalid={ !!errors.campusNumber }>                    
                  defaultValue={form.campusNumber}
                  {buildingOptions && buildingOptions.map((buildingOption)=>{
                    return <option key={buildingOption.id} value={buildingOption.value}>{buildingOption.value}</option>
                  })}</Form.Control>
                  <Form.Control.Feedback type='invalid'>
                      { errors.campusNumber }
                  </Form.Control.Feedback>
            </Form.Group> 
            <Form.Group>
              <Form.Label>Workspace number</Form.Label> 
              <Form.Control 
                type='number' 
                min={1}
                max={999}
                defaultValue={form.workspaceNumber}
                onChange={ e => setField('workspaceNumber', +(e.target.value)) }
                isInvalid={ !!errors.workspaceNumber }/>
                <Form.Control.Feedback type='invalid'>
                    { errors.workspaceNumber }
                </Form.Control.Feedback>
            </Form.Group>           
            <Form.Group>
              <Form.Label>Category</Form.Label>
                <Form.Control as='select' 
                  onChange={ e => setField('categoryId', e.target.value) }
                  isInvalid={ !!errors.categoryId }>                         
                  <option>Select category...</option>        
                  {Array.isArray(selectedCategory) && selectedCategory.map((category) =>{
                      return <option key={category.id} value={category.id}>{category.name}</option>
                  })}</Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.categoryId }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as='textarea'
                style={{minHeight:'100px'}}
                defaultValue={form.description}
                onChange={ e => setField('description', e.target.value)}
                isInvalid={ !!errors.description } 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.description }
                </Form.Control.Feedback>
            </Form.Group>            
            <Form.Group>
              <Form.Label>Number of seats</Form.Label>
              <Form.Control 
                type='number'
                min={1}
                max={999}
                defaultValue={form.numberOfSeats}
                onChange={ e => setField('numberOfSeats', +(e.target.value)) }
                isInvalid={ !!errors.numberOfSeats }/>
                <Form.Control.Feedback type='invalid'>
                    { errors.numberOfSeats }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                    <Form.Label>Course number</Form.Label>
                    <Form.Control as='select'
                        onChange={ e => setField('courseNumber', e.target.value) }
                        isInvalid={ !!errors.courseNumber }>
                        defaultValue={form.courseNumber}
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='4'>5</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        { errors.courseNumber }
                    </Form.Control.Feedback>
                </Form.Group>
            <Form.Group>
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check 
                    type={type}
                    id={`default-${type}`}
                    label={'Special equipment'}
                    checked={form.specialEquipment}
                    onChange={ e=>setField('specialEquipment', e.target.checked)}
                  />
                </div>
              ))}    
            </Form.Group>
            <Button style={{margin:'10px'}} type='submit' onClick={handleSubmit}>Submit</Button>
          </Form>
        </div> : <><img src={image1} alt="" className='workspaceImage'/></>}
    </div>
    )
};

export default WorkspaciesManagement;