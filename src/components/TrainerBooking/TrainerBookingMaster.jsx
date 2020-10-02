import React,{Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './TrainerBookingMaster.css';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import TrainerBookingDetails from './TrainerBookingDetails'
class TrainerBookingMaster extends Component
{
	constructor(props)
	{
		super(props);
		this.toggle = this.toggle.bind(this);
         this.state = {
          dropdownOpen: false
    };
	
}
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
 

	render()
	{
		 const { Option } = Select;
		return(
			<div className="trainer_booking_master">
			<div className="bookingborder_box"><p className="bookings">Bookings</p>
			
</div>
       <TrainerBookingDetails/>
      </div>
		);
	}
}
export default TrainerBookingMaster;