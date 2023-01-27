import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchItem from '../../components/SearchItem/SearchItem';
import notFound from '../../images/no-result-found-1.webp';
import "./Catalog.scss"

const Catalog = () => {
    const location = useLocation();
    console.log(location);
    const [faculty, setFaculty]= useState(location.state !== null ? location.state.value : '');
    return (
        <div>                   
            <Navbar/>
            <Header/>
            <div className='listContainer'>
                <div className='listWrapper'>                    
                    <div className='listSearch'>   
                        <FilterPanel/>                                              
                    </div>
                    <div className='listResult'>
                        <SearchItem/>
                        <SearchItem/>
                        <SearchItem/>                        
                    </div>
                    {/* <img src={notFound} alt=''/>  */}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Catalog;