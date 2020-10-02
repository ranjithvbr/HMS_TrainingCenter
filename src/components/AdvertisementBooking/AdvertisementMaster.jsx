import React, { Component } from "react";
import { Select } from "antd";
import "antd/dist/antd.css";
import './AdvertisementMaster.css'
import { Input } from "antd";
import dateFormat from 'dateformat';
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
import BookingDetails from './BookingDetails'
import { apiurl } from "../../App";
import Axios from "axios";

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

class AdvertisementMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      data:[],
      ClinicList: null,
      clinicId: null,
    };
  }
componentWillMount(){
 
    // var self = this;
    // Axios({
    //   method: "post",
    //   url: apiurl + "getDoctorClinics",
    //   data: {
    //     doctorId: "34",
    //   },
    // })
    //   .then((response) => {
    //     console.log(response, "clinic");

    //     this.setState({ 
    //       ClinicList: response.data.data,
    //       clinicId:response.data.data[0].clinicId
    //     }); 
    //   })
    //   .catch((error) => {
    //     // console.log(JSON.stringify(error));
    //   });

    // this.setState({});
  };
 
changeDynamic = (data, key) => {

  console.log("Data", data);
  console.log("key", key);
  if(key == "clinicId") {
    this.setState({clinicId:data})
  }

  this.setState({ [key]: data });
};

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log("sdafjsdhfksdhfds",this.props)
    return (
      <div className="">
          <Paper>
          <div className="dashboard_header">
          {/* <div className="hms_trainer_header"> */}
          <div className="titleuser">ADVERTISEMENT BOOKING</div>
          {/* </div> */}
          {/* <div className="doctor_type_head"><p className="doctorpatient_head">Clinic</p>
              <div className="clinic_appoint_drop" style={{width:"180px"}}>
              <Labelbox
                type="select"
                valuelabel={"clinicName"}
                valuebind={"clinicId"}
                changeData={(data) => this.changeDynamic(data, "clinicId")}
                dropdown={this.state.ClinicList}
                value={this.state.clinicId}
                
              /></div>
              </div> */}
          </div>
          <BookingDetails generateAlert={this.props.generateAlert} 
          userId={this.props.userId} clinicId={this.state.clinicId} />
          </Paper>
          </div>



      
    );
  }
}

export default AdvertisementMaster;
