import React, { useState } from 'react';
import Select  from 'react-select'
import colourStyles from '../Select/Select.tsx'
import { colourOptions } from '../../docs/data.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuildingColumns, faBookOpen, faList, faEllipsisH, faUser} from "@fortawesome/free-solid-svg-icons";
import "./Header.scss"

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            homeMode: this.props.homeMode
        }
    }
    
    handleChange(event) {
        console.log(event.value)   
        this.setState({value: event.value})        
    }

render(){    
    console.log(this.state.value);
    return (
        <div className='header'>
            <div className={this.state.homeMode ? "headerContainer homeMode" : "headerContainer"}>
                <div className='headerList'>
                    <div className='headerListItem active'>
                    <FontAwesomeIcon icon={faBuildingColumns} />
                    <span>Univesity</span>
                    </div> 
                    <div className='headerListItem'>
                    <FontAwesomeIcon icon={faList} />
                    <span>Catalog</span>
                    </div>
                    <div className='headerListItem'>
                    <FontAwesomeIcon icon={faBookOpen} />
                    <span>Booking</span>
                    </div> 
                    <div className='headerListItem'>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Account</span>
                    </div> 
                    <div className='headerListItem'>
                    <FontAwesomeIcon icon={faEllipsisH} />
                    <span>About</span>
                    </div> 
                </div>
                {this.state.homeMode && 
                    <div>
                        <h1 className='headerTitle'>Belarusian National Technical University</h1>
                        <p className='headerDesc'>
                            We are the Leader of technical education in Belarus. Since 1920, we have been providing modern education and training highly qualified specialists
                        </p>
                        <Select  
                            onChange={this.handleChange.bind(this)}  
                            placeholder={'Select Faculty'}                                 
                            options={colourOptions}
                            styles={colourStyles}                                        
                            theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                            colors: {
                                ...theme.colors,
                                primary: 'black',
                            },
                            })}
                        />                
                    </div>
                }
            </div>
        </div>
    );
};
}

Header.defaultProps = {homeMode: false};
