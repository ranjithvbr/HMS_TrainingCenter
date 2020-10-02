import React,{Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './queuecomp.css'
import { DatePicker } from 'antd';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import Labelbox from '../../helpers/labelbox/labelbox'
import Walk from '../../images/whitewalk.png'
import Crown from '../../images/whitecrown.png'
import Phone from '../../images/mobile.png'
import Men from '../../images/men.png'
import { config } from "react-spring";
import ImageCarouselDynamic from './carosal'
class QueueComp extends Component
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
  onChange=(date, dateString)=>{
  console.log(date, dateString);
}
	render()
	{
     const { Option } = Select;
		return(
        <div className="queuecomp_container_doctor">
          <Paper>
        <div>
        
      <div className="queueborder_box">
           <div><p className="headqueue">TODAY'S QUEUE</p></div>
           <div className="clinic_container"><p className="clinic">Clinic</p><Labelbox type="select" style={{width:"150px"}}/></div>
   </div>
            
            <div className="queuepaper_container">
            <Grid container spacing={2} className="doctorqueue_container">
            {/* <Grid className="queue_clinic_datefrom" item xs={12}  md={3}>
                
                <div style={{width:"90%"}}> <Labelbox type="select" labelname="Clinic"/></div>
                
            </Grid> */}
                    <Grid className="valuecheck_griditem1" item xs={12}  md={6}>
                    <div className="valuecheck_griditem_div">
                       <div>
                       <div className="valuecheck_griditem_paperdiv">
                        <Paper className="valuecheck_griditem_divpaper">
                         <div className="heading_total"><p>Total</p></div>
                           <Grid container>
                           <Grid item xs={12}  md={12} className="iconsapp_containter">
                               
                              <div className="App_div"><span><div className="crown_div"><img className="Apps" src={Crown}/></div><label className="labelvip_div">VIP:10</label></span></div>
                              <div className="Vip_div"><div className="app_phone"><img className="Vips" src={Phone}/></div><label className="labelvip_div">APP:18</label></div>
                              <div className="App_div"><span><div className="walk-div"><img className="walk" src={Walk}/></div><label className="walklabelvip_div">Walk-In:8</label></span></div>
                              <div className="Vip_div"><span><div className="mens_div"><img  className="mens" src={Men}/></div><label className="labelvip_div">Referrals:18</label></span></div>
                               
                           </Grid>
                           </Grid>
                        </Paper>
                        </div>
                        </div>
                        </div>
                    </Grid>
                     <Grid className="valuecheck_griditem2" item={12}  md={6}>
                      <div className="valuecheck_griditem_div">
                        <Paper className="valuecheck_griditem_divpaper">
                         <div className="heading_total"><p>Checked In</p></div>
                           <Grid container>
                           <Grid item xs={12}  md={12} className="iconsapp_containter">
                               
                              <div className="App_div"><span><div className="crown_div"><img className="Apps" src={Crown}/></div><label className="labelvip_div">VIP:10</label></span></div>
                              <div className="Vip_div"><div className="app_phone"><img className="Vips" src={Phone}/></div><label className="labelvip_div">APP:18</label></div>
                              <div className="App_div"><span><div className="walk-div"><img className="walk" src={Walk}/></div><label className="walklabelvip_div">Walk-In:8</label></span></div>
                              <div className="Vip_div"><span><div className="mens_div"><img  className="mens" src={Men}/></div><label className="labelvip_div">Referrals:18</label></span></div>
                               
                           </Grid>
                           </Grid> 
                        </Paper>
                        </div>
                    </Grid>
                     </Grid>
            </div>
         
             </div>
             <div>
                 <Grid container>
                 <Grid item xs={12} md={12} sm={12}>
                 <ImageCarouselDynamic/>
                 </Grid>
                 </Grid>
                
             </div>
             </Paper>
             </div>
		);
	}
}
export default QueueComp;