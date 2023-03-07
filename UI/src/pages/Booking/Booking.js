import React from "react";
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Loader from '../../components/Loader/Loader';
import BookingSelect from '../../components/BookingManagement/BookingSelect'
import './Booking.scss'

const Booking = () => {    
    
    return(
        <div>
            {/* {isLoading && <Loader/>} */}            
            <Navbar/>
            <Header/>    
            <BookingSelect/>
            <Footer/>
        </div>
    );
};

export default Booking;