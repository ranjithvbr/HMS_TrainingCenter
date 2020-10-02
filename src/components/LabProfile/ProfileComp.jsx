import React, { Component } from "react";
import { Select, Empty,Spin } from "antd";
import "antd/dist/antd.css";
import "./ProfileComp.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Divider from "@material-ui/core/Divider";
import Trainee from "../../Images/11.jpg";
// import "./Profilepage.css";
import ProfileModal from "./ProfileModal";
import Axios from "axios";
import { apiurl } from "../../App";
import dateFormat from 'dateformat';

import empty from '../../Images/user.png'



// import Calendar from './Calendar';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  TiLocation,
  MdLocationOn,
  MdLocalPhone,
  MdEmail,
} from "react-icons/md";

class ProfileComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      cancel: null,
      ProfileData: [],
      view:false,
      props_loading:true
    };

  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };
  ProfileGetApi = () => {
    var self = this
    Axios({
      method: 'POST',
      url: apiurl+"gettrainingcenterprofile",
      data: {
        "trainingCenterId": "11"
      },
    }).then((response) => {
      var ProfileData = []
      console.log(response.data.data[0], "getdetails")
      ProfileData = response.data.data
      this.setState({ ProfileData,props_loading:false },() => console.log("sdfjdsfdsfh",this.state.ProfileData))
      this.setState({})
    }).catch((error) => {
    })
  }
  componentDidMount() {
    this.ProfileGetApi()
  }

  profilecall=()=>{
    this.props.ProfileGetApi()
    this.ProfileGetApi()
  }

  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    return (
      <div className="deal_listcreatead">
        <Paper className="profile_background">
          <div className="profileback_first">PROFILE</div>
          <div className="profilepaper_container">
            <Paper className={this.state.props_loading===true?"profile_backchange":"profilebackground"}>
            <Spin className="profile_spinner_align" spinning={this.state.props_loading}>
            {this.state.ProfileData.map((val) => {
              console.log(val,"vall")

return (
              <Grid container className="total">
                <Grid item xs={12} md={5}>
                  <div className="trainee_image_container">
                    <div className="trainee_image_div">
                      {
                        (val.vendor_filename === null)?
                        <img className="trainee_image" src={Empty} /> : <img className="trainee_image" src={val.vendor_filename} />
            }
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
                  <div className="addtraineee_containerdiv">
                    <div className="icon_edit">
                      <EditIcon className="icon" onClick={this.open} />
                    </div>
                    <div>
                      <h1 className="trainee_detail">{val.vendor_name}</h1>
                      <div className="age_details">
                        <h5>
                          <MdLocationOn className="group_icons" />
                        </h5>
                        <p className="trainee_text">
                          {val.vendor_address}
                        </p>
                      </div>
                      <div className="age_details">
                        <h5>
                          <MdLocalPhone className="group_icons" />
                        </h5>
                        <p className="trainee_text">{val.vendor_contact_mobile}</p>
                      </div>
                      <div className="age_details">
                        <h5>
                          < MailOutlineIcon className="group_icons" />
                        </h5>
                 <p className="trainee_text">{val.vendor_contact_email}</p>
                      </div>
                      <div>
                        <h4 className="working_hour">
                          <b>{`Working Hours`}</b>
                        </h4>
                      </div>
                      {
                            val.workinghoursofTrainingCenter.length > 0 && val.workinghoursofTrainingCenter.map((wrkHrs) => {
                              return (
                                <div>
                                  <div className="working_detail">
                                    <h4 className="working_hour_detail">{wrkHrs.wh_weekday}</h4>
                                    <p className="working_time_detail">
                                      {
                                        dateFormat(new Date("1970-01-01T"+wrkHrs.wh_fromtime),"hh:MM TT") 
                                      }
                                      -
                                      {
                                        dateFormat(new Date("1970-01-01T"+wrkHrs.wh_totime),"hh:MM TT") 
                                      }
                                    </p>
                                  </div>
                                </div>
                              )
                            })

                          }
                        </div>
                      </div>
                  <Divider className="divider_profile" />
              
                </Grid>
              </Grid>
               )
              })

            }
            </Spin>
            </Paper>
          </div>
        </Paper>
        <ProfileModal
          open={this.state.view}
          onClose={this.onclose}
          ProfileGetApi={this.profilecall}
          ProfileData={this.state.ProfileData}
        />
      </div>
    );
  }
}

export default ProfileComp;
