import React from 'react';
import { buildingOptions, colourOptions } from '../../docs/data.ts';

export default class FilterListBuilding extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            faculty: this.props.faculty,                     
            selectedValues: [],                      
        }
        this.handleCheckboxChange=this.handleCheckboxChange.bind(this);
    }  

    componentDidMount(){
        this.handleFacultyChange();
    }

    handleFacultyChange(){       
        if(this.state.faculty !== '')
        {
            let newDefaultBuilding = this.state.selectedValues;                   
            colourOptions.map(({value, label, usedBuildings}) =>{
                if(value === this.state.faculty)
                {                    
                    for (var i = 0; i < usedBuildings.length; i++) {
                        newDefaultBuilding.push(usedBuildings[i]);    
                    }                
                }
            })
            this.setState({
                selectedValues: newDefaultBuilding
            })                        
        }            
    }

    handleCheckboxChange=value=>{
        let newSelectedValues = this.state.selectedValues;        
        if (this.state.selectedValues.includes(value)) {            
            newSelectedValues = this.state.selectedValues.filter(el => el !== value)
            this.setState({
                selectedValues: newSelectedValues
            })            
        }        
        else{            
            newSelectedValues.push(value);            
            this.setState({
                selectedValues: newSelectedValues
            })
        }
    }

render(){    
    return (                 
        <div className='buildingOptions'>
            <div className='optionsItem'>
                {buildingOptions.map((menu, index) => {
                    return (
                        <li className="menu-items" key={index}>
                            <a href={`/Geolocation/:${menu.value}`}>{menu.value} </a>                                                                           
                            <input 
                                key={index}
                                type="checkbox"                                
                                checked={this.state.selectedValues.includes(menu.value) ? true : false}
                                onClick={()=> this.handleCheckboxChange(menu.value)}                              
                                />                                                                                                                                                                                                                             
                        </li>
                    );
                })}
            </div>
        </div>           
    );
    }
};
