import React from 'react';
import { buildingOptions, colourOptions } from '../../docs/data.ts';

export default class FilterListBuilding extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            faculty: this.props.faculty,                     
            selectedValues: [],            
            defaultBuildings: [],
            openOptions: false,            
        }
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
    }  

    handleFacultyChange(){       
        console.log("handleFacultyChange");
        if(this.state.faculty !== null)
        {
        let newDefaultBuilding = this.state.selectedValues;                   
        colourOptions.map(({value, label, usedBuildings}) =>{
            console.log('value: ',value, 'usedBuildings: ',usedBuildings);
            if(value === this.state.faculty)
            {
                console.log('value: ',value);
                for (var i = 0; i < usedBuildings.length; i++) {
                    newDefaultBuilding.push(usedBuildings[i]);    
                    //this.handleCheckboxChange(usedBuildings[i]);
                }                
            }
        })
        console.log('newDefaultBuilding: ',newDefaultBuilding);
        this.setState({
            selectedValues: newDefaultBuilding
        })
        this.setState({
            faculty: null
        })
        console.log('selectedValues: ',this.state.selectedValues);    
        console.log('facultu: ',this.state.faculty);  
    }    
    }

    handleCheckboxChange=(value)=>{
        let newSelectedValues = this.state.selectedValues;        
        if (this.state.selectedValues.includes(value)) {
            console.log("newSelectedValues if 1:",newSelectedValues);
            newSelectedValues = this.state.selectedValues.filter(el => el !== value)
            this.setState({
                selectedValues: newSelectedValues
            })
            console.log("newSelectedValues if 2: ",newSelectedValues);
        }        
        else{
            console.log("newSelectedValues: ",newSelectedValues);
            newSelectedValues.push(value);
            console.log("newSelectedValues push: ",newSelectedValues);
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
                                onChange={this.handleFacultyChange}                                 
                                />                                                                                                                                                                                                                             
                        </li>
                    );
                })}
            </div>
        </div>           
    );
    }
};
