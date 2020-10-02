import React,{Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './TraineesPopUp.css';
import { Select,Button,Tag,Icon} from 'antd';
import 'antd/dist/antd.css';
import Trainee from '../../Images/11.jpg';
import Grid from '@material-ui/core/Grid';

class TraineesPopUp extends Component
{
	constructor(props)
	{
		super(props);
		this.toggle = this.toggle.bind(this);
         this.state = {
          dropdownOpen: false
    };
	
}
	render()
	{
		 const { Option } = Select;
		return(
			  <div>
           <Grid container>
           <Grid item xs={12} md={4}>
               <img src={Trainee}/>
           </Grid>
                  <Grid item xs={12} md={4}>
                         
                  </Grid>
           </Grid>
        </div>
     
		);
	}
}
export default TraineesPopUp; 