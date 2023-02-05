import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../../images/headerimage.jpg'
import image2 from '../../images/2_DJI_0021.jpg'
import image3 from '../../images/Main_building_of_BNTU.jpg';
const Slider = () => {
    return (
        <Carousel fade>            
            <Carousel.Item interval={5000}>                
                <img
                    className='d-flex w-100'
                    src={image1}
                    alt="First slide"
                />     
                <Carousel.Caption>
                    <h3>QS Global World Ranking #750-800</h3>
                    <p>Total Students 20,156</p>
                    <p>Academic Faculty Staff 2,572</p>
                </Carousel.Caption>           
            </Carousel.Item>
            <Carousel.Item interval={5000}>                
                <img
                    className='d-flex w-100'
                    src={image2}
                    alt="First slide"
                />       
                <Carousel.Caption>
                    <h3>QS Global World Ranking #750-800</h3>
                    <p>Total Students 20,156</p>
                    <p>Academic Faculty Staff 2,572</p>
                </Carousel.Caption>         
            </Carousel.Item>
            <Carousel.Item interval={5000}>                
                <img
                    className='d-flex w-100'
                    src={image3}
                    alt="First slide"
                />       
                <Carousel.Caption>
                    <h3>QS Global World Ranking #750-800</h3>
                    <p>Total Students 20,156</p>
                    <p>Academic Faculty Staff 2,572</p>
                </Carousel.Caption>         
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;