import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Trainee from "../../Images/11.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./ProfileView.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Patient from "../../Images/1.jpg";
import empty from "../../Images/user.png";
import CloseIcon from '@material-ui/icons/Close';
import Clinic from "../../Images/trainer1.png";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Axios from "axios";
import { apiurl } from "../../App";
import { ReactSVG } from "react-svg";
import dateformat from "dateformat";
import close from "../../Images/close.svg";
const apiurl_2 = "http://52.200.251.222:8158/api/v1/";
const styles = {};
export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: null,
      Openviewdata: [],
    };
  }
  formatTimeShow = (h_24) => {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (
      (h < 10 ? "0" : "") +
      h +
      ":" +
      h_24.substring(3, 5) +
      (Number(h_24.substring(0, 2)) < 12 ? " AM" : " PM")
    );
  };
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };
  UNSAFE_componentWillReceiveProps(newprops) {
    this.setState({
      viewdata: newprops.Openviewdata,
    });
  }
  render() {
    const val = this.props.Openviewdata;
    // const {Openviewdata}=this.props
    console.log(val, "PROPS_CHECK");
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    return (
      <>
        <div className="doctor_popup_details">
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
            {...other}
            className="profile_modal"
          >
            {/* {this.props.Openviewdata.map((val)=>{
            console.log(val,"val_test")
            return( */}
            <>
            <div className="close_icon_modal_div"><CloseIcon onClick={this.props.onClose} className="close_icon_modal"/></div>
              <div>
                {/* <img
                  className="close_ico"
                  src={close}
                  onClick={this.props.onClose}
                /> */}
                {
             (val.profile_image === null)?
         <img src={empty} className="patient"/>:<img src={val && val.profile_image} className="patient" />
                }
               
              </div>
              <Grid>
                <div className="doctor_dashboard_view">
                  <div className="doctor_details_container">
                    <div className="doctor_detailsdiv">
                      <h3 className="patient_name">
                        {val && val.CustomerName}
                      </h3>
                      <p className="patient_age">
                        {val && val.age} Years
                      </p>
                      <p className="booked_details_font">Booked Details</p>
                      <Grid className="d-flex">
                        <Grid item md={6} sm={6}>
                          <div className="patientappointment_details">
                            <p className="patientappointment_details">
                            Booked  Date
                              <span className="patient_date">
                                {dateformat(val && val.Date, "dd mmm yyyy")}
                              </span>
                            </p>
                          </div>
                          <div className="patientappointment_details-div">
                            <p className="patientappointment_details">
                             Booked Time
                              <span className="patient_date">
                                {val && val.Time && this.formatTimeShow(val && val && val.Time)}
                              </span>
                            </p>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={6} className="book_date_adjust">
                          <div className="fromdate_adjust">
                            <p className="fromdate_adjust">
                              From Date
                              <span className="patient_date">
                                {dateformat(val && val.fromDate, "dd mmm yyyy")}
                              </span>
                            </p>
                          </div>
                          <div className="fromdate_adjust-div">
                            <p className="fromdate_adjust">
                              To Date
                              <span className="to_date">
                                {dateformat(val && val.toDate, "dd mmm yyyy")}
                              </span>
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                      <div className="divider_root" />
                      <Grid className="d-flex mt-2">
                        <Grid item md={5} sm={6}>
                          <div className="patientappointment_details">
                            <p className="patientappointment_details">
                              Package
                              <span className="patient_date2">
                                {val && val.trcr_package_name}
                              </span>
                            </p>
                          </div>
                          <div className="patientappointment_details-div">
                            <p className="patientappointment_details">
                              Total Sessions
                              <span className="patient_date">
                                {val && val.trcr_session}
                              </span>
                            </p>
                          </div>
                        </Grid>
                        <Grid md={1}></Grid>
                        <div className="vertical_line"></div>
                        <Grid item md={7} sm={6} className="billed_adjust ">
                          <div className="fromdate_adjust">
                            <p className="fromdate_adjust">
                              Total Cost
                              <span className="patient_date">
                                {val && val.amount} KWD
                              </span>
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </Grid>
            </>
            {/* )
        })} */}
          </Dialog>
        </div>
      </>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ProfileView);
