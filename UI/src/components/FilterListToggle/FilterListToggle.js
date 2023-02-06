import React from 'react'

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
          let newSelectedValues = this.state.selectedValues;
          if (this.state.selectedValues.includes(buttonId)) {
            newSelectedValues = this.state.selectedValues.filter(el => el !== buttonId)
              this.setState({
                  selectedValues: newSelectedValues
              })
          }
          else{
          newSelectedValues.push(buttonId);
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
