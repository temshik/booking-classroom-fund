import React from 'react';
import "./Footer.scss"

const Footer = () => {
    return (
        <div className='footer'>
        <div className='container'>
            <div className='row'>
                <div className='col'>                    
                    <ui className='fList'>     
                        <p className='fListHeading'>About Us</p>           
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/university/work-here">Jobs</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/students">For Students</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/times">BNTU news</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/science">Science</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="http://park.bntu.by/en/">Innovations</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/study">Education</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/international">International</a></li>
                    </ui>     
                </div>
                <div className='col'>                      
                    <ui className='fList'>   
                        <p className='fListHeading'>Services</p>              
                        <li className='fListItem'>University</li>
                        <li className='fListItem'>Catalog</li>
                        <li className='fListItem'>Booking</li>
                        <li className='fListItem'>Account</li>
                        <li className='fListItem'>About</li>
                    </ui>     
                </div>     
                <div className='col'>                    
                    <ui className='fList'>     
                        <p className='fListHeading'>Contacts</p>            
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en">BNTU</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} href="/Geolocation">Belarus, Minsk, Prospekt Nezavisimosti, 65</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="">8 (017) 292-10-11</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="">bntu@bntu.by</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://bntu.by/en/university/map">Campus map</a></li>
                    </ui>  
                </div>
                <div className='col'>                    
                    <ui className='fList'>    
                        <p className='fListHeading'>Social Media</p>                                    
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="">Twitter</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://www.facebook.com/bntu.by/">Facebook</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://vk.com/bntuby">VK</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://www.youtube.com/bntuby">YouTube</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://www.youtube.com/bntuby">Instagram</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://www.youtube.com/bntuby">LinkedIn</a></li>
                        <li className='fListItem'><a style={{color: 'green'}} target="_blank" href="https://t.me/bntuby">Telegram</a></li>
                    </ui>      
                </div>
            </div>
            <div className='row'>
                <div className='col-sm' style={{textAlign: 'center', borderTop: "2px solid #E7E7E7"}}>The old website is available at <a style={{color: 'green'}} target="_blank" href="http://old.bntu.by">old.bntu.by</a></div>
            </div>
            <div className='row'>                
                <div className='col-sm'style={{textAlign: 'center'}}>Copyright © {new Date().getFullYear()} Belarusian National Technical University</div>
            </div>       
        </div>
    </div>
    );
};

export default Footer;