import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WorkspaciesManagement from '../../components/CatalogManagement/WorkspaciesManagement';

const UpdateWorkspace = () => {   
    const location = useLocation(); 
    const item = {        
        "campusNumber": null,
        "workspaceNumber": null,
        "categoryId": null,
        "description": null,
        "numberOfSeats": null,
        "courseNumber": null,
        "specialEquipment": false,
        "isAvailable": true
    }
    const [form, setForm] = useState(location.state !== null ? location.state.value : item);   
    
    return (
        <div>
            <Navbar/>
            <Header/>
            <WorkspaciesManagement                 
                form={form}                
                managementTask={'Update Workspace'}/>            
            <Footer/>
        </div>
    );
};

export default UpdateWorkspace;