import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Slider from '../../components/Slider/Slider';
import "./HomePage.scss"

const HomePage = () => {
    return (
        <div>
            <Navbar/>
            <Header homeMode={true} />
            <Slider/>
            <Footer/>
        </div>
    );
};

export default HomePage;