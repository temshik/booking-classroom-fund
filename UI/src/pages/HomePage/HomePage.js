import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <Header homeMode={true} />
        </div>
    );
};

export default HomePage;