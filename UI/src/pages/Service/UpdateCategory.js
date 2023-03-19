import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CategoryManagement from '../../components/CatalogManagement/CategoryManagement';

const UpdateCategory = () => {
    return (
        <div>
            <Navbar/>
            <Header/>
            <CategoryManagement                                
                managementTask={'Update Category'}/>            
            <Footer/>
        </div>
    );
};

export default UpdateCategory;