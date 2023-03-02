import React from 'react';
import {listItems} from '../MenuItems/ListItems';
import MenuItems from '../MenuItems/MenuItems';
import Faculty  from '../Select/Faculty'
import Menu from "../Menu/Menu";
import "./Header.scss"

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            homeMode: this.props.homeMode,      
        };
    }
       
render(){    
    return (        
        <div className='header'>                             
            <div className={this.state.homeMode ? "headerContainer homeMode" : "headerContainer"}>                                   
                    {/* <div className='headerList'>
                        {listItems.map((menu, index) => {
                            const depthLevel = 0;
                            return <MenuItems items={menu} key={index} depthLevel={depthLevel}/>;
                        })}  
                    </div>            */}
                <Menu />   
                {this.state.homeMode && 
                    <div>
                        <h1 className='headerTitle'>Belarusian National Technical University</h1>
                        <p className='headerDesc'>
                            We are the Leader of technical education in Belarus. Since 1920, we have been providing modern education and training highly qualified specialists
                        </p>
                        <Faculty/>           
                    </div>
                }
            </div>
        </div>
    );
};
}

Header.defaultProps = {homeMode: false};
