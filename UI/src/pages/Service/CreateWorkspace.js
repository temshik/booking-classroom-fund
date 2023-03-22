import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WorkspaciesManagement from '../../components/CatalogManagement/WorkspaciesManagement';

const CreateWorkspace = () => {    
    const form = {
        "campusNumber": 1,
        "workspaceNumber": 0,
        "categoryId": 1,
        "description": "Description...",
        "numberOfSeats": 0,
        "courseNumber": 1,
        "specialEquipment": true,
        "isAvailable": true
    }
    return (
        <div>
            <Navbar/>
            <Header/>
            <WorkspaciesManagement form={form} managementTask={'Create Workspace'}/>            
            <Footer/>
        </div>
    );
};

export default CreateWorkspace;