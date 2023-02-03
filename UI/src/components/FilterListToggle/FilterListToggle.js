import React from 'react'
import './FilterListToggle.scss'

export default class FilterListToggle extends React.Component
{  
    constructor(props){
        super(props);
        this.state = {
            options: this.props.options,    
            value: this.props.value,
            selectToggle: this.props.selectToggle,        
            selectedValues: []
        }
    }

    handleButton(buttonId){
        console.log("ButtonId: ",buttonId);
          let newSelectedValues = this.state.selectedValues;
          if (this.state.selectedValues.includes(buttonId)) {
            console.log("newSelectedValues if 1:",newSelectedValues);
            newSelectedValues = this.state.selectedValues.filter(el => el !== buttonId)
              this.setState({
                  selectedValues: newSelectedValues
              })
             console.log("newSelectedValues if 2: ",newSelectedValues);
          }
          else{
          console.log("newSelectedValues: ",newSelectedValues);
          newSelectedValues.push(buttonId);
          console.log("newSelectedValues push: ",newSelectedValues);
          this.setState({
              selectedValues: newSelectedValues
          })
          }
      }

render () {
    return ( 
        <div
            className='categoryContainer'       
            // value={this.state.value}
            // onChange={this.state.selectToggle}
            >  
            {this.state.options.map( bt =>
                <button                     
                    key={bt.id}
                    onClick={() => this.handleButton(bt.id)}                    
                    className = { this.state.selectedValues.includes(bt.id) ? 'btSelected' : 'btItem'}                    
                    value={bt.value}>
                    {bt.label}
                </button>)
            }       
        </div>   
        );
    }
};
