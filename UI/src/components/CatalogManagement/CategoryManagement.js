import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loader from '../Loader/Loader';
import image1 from '../../images/AccessDenied.jpg'
import {GetUserRoleByEmail, selectRole, selectEmail} from '../../redux/slice/authSlice';
import { selectIsCategoryCreated, selectIsCategoryUpdated, selectIsCategoryDeleted, selectIsCategoryLoading,
         getCategory, selectCat, selectCategory, updateCategory, createCategory, updatedCat, deleteCategory} from '../../redux/slice/catalogSlice';
import './WorkspaciesManagement.scss';

const CategoryManagement = (props) => {
    const dispatch = useDispatch();
    const stateEmail = useSelector(selectEmail);
    const role = useSelector(selectRole);
    const [userRole, setUserRole] = useState('Teacher');
    const email = (stateEmail !== null)? stateEmail : window.sessionStorage.getItem('email');
    const navigate = useNavigate();
    const category = useSelector(selectCat);
    const updatedCategory = useSelector(updatedCat);
    const createdCategory = useSelector(selectCategory); 
    const isCategoryLoading = useSelector(selectIsCategoryLoading);
    const isCategoryCreated = useSelector(selectIsCategoryCreated);
    const isCategoryUpdated = useSelector(selectIsCategoryUpdated);
    const isCategoryDeleted = useSelector(selectIsCategoryDeleted);      
    const [selectedCategory, setSelectedCategory] = useState([]);//
    const [name, setName] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{ 
      getRole();
      if(props.managementTask === 'Update Category'){      
        getCategories();       
      }       
    },[])

    useEffect(()=>{
      if(category !== null)                  
          setSelectedCategory(category)                       
    },[category])

    useEffect(()=>{
      if(role !== null)
      setUserRole(role)
    },[role])

    useEffect(()=>{
      if(createdCategory)
        setTimeout(showMessage,500);
    },[createdCategory])

    useEffect(()=>{
        if(updatedCategory)
            setTimeout(showMessage,500);
    },[updatedCategory])

    useEffect(()=>{
      if(isCategoryLoading === false || isCategoryCreated === false ||
         isCategoryDeleted === false || isCategoryUpdated === false)
          setTimeout(() => {setLoading(false)}, 500);
      else setLoading(true);
    },[isCategoryLoading,isCategoryCreated, isCategoryUpdated, isCategoryDeleted])

    const getRole = () => {
      if(window.localStorage.getItem('accessToken') !== null){  
          dispatch(GetUserRoleByEmail(email))            
      }
    }

    const getCategories = () => {
      if(window.localStorage.getItem('accessToken') !== null){    
        dispatch(getCategory());          
      }
    }

    const showMessage =()=>{  
        if(window.confirm(`Succesfuly ${props.managementTask}. You can redirect to catalog page.`))        
            {navigate('/Catalog');}
        else{
            window.location.reload(); 
        }
    }

    const setField = (field, value) => {
      setName({
        ...name,
        [field]: value
      })
      // Check and see if errors exist, and remove them from the error object:
      if ( !!errors[field] ) setErrors({
        ...errors,
        [field]: null
      })
    }    

    const findFormErrors = () => {
      const {description} = name
      const newErrors = {}                
      
      if ( !description || description === '' ) newErrors.description = 'cannot be blank!'  
      else if ( description.length > 20 ) newErrors.description = 'description is too long, must be < 20 characters!'

      return newErrors
    }

    const handleDelete = (e)=>{
        e.preventDefault()
        if(window.localStorage.getItem('accessToken') !== null && name.categoryId){        
        if (window.confirm(`Are you sure you want to delete the category? When you delete a category, the associated audiences will be deleted automatically!!!`)) {               
            dispatch(deleteCategory(name.categoryId));             
        }
        }
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
          if(props.managementTask === 'Update Category')     
          {          
            var data = {
                id: name.categoryId,
                name: name.description,
                selected: false
            } 
            dispatch(updateCategory(data));              
          }
          else if(props.managementTask === 'Create Category')
          {
            var data = {
                name: name.description,
                selected: false
            }    
            dispatch(createCategory(data));
          }
          else
          console.log('form',name)
        }
      }
    }

    return (        
        <div className='CreateWorkspace'>
        {loading && <Loader/>}   
        { userRole!=='Teacher' ? <div className='Form'>        
          <h1 style={{margin:'10px'}}>{props.managementTask}</h1>                    
          <Form style={{ width: '300px' }}>        
            {props.managementTask === 'Update Category' && 
            <Form.Group>
              <Form.Label>Category</Form.Label>
                <Form.Control as='select' 
                  required
                  onChange={ e => setField('categoryId', e.target.value) }
                  isInvalid={ !!errors.categoryId }> 
                  <option>Select category...</option>                    
                  {selectedCategory !== [] && selectedCategory.map((category) =>{
                      return <option key={category.id} value={category.id}>{category.name}</option>
                  })}</Form.Control>
                <Form.Control.Feedback type='invalid'>
                    { errors.categoryId }
                </Form.Control.Feedback>
            </Form.Group>}
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type='text'                                
                onChange={ e => setField('description', e.target.value)}
                isInvalid={ !!errors.description } 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.description }
                </Form.Control.Feedback>
            </Form.Group>                                 
            <Button style={{margin:'10px'}} type='submit' onClick={handleSubmit}>Submit</Button>
            {props.managementTask === 'Update Category' && 
                <Button style={{margin:'10px'}} className='btn btn-danger' type='submit' onClick={handleDelete}>Delete</Button>
            }
          </Form>
        </div> : <><img src={image1} alt="" className='workspaceImage'/></> }
    </div>
    )
};

export default CategoryManagement;