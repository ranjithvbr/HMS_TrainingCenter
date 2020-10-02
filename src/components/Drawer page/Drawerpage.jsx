import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import Deals from "../../Images/deals.svg";
import home_svg from "../../Images/home_svg.svg";
import advertise_svg from "../../Images/ad_svg.svg";
import revenue_svg from "../../Images/revenue_svg.svg";
import upload_svg from "../../Images/upload_svg.svg";
import manage_package from "../../Images/manage.svg";
import Cancel from "../../Images/cancel.svg";
import profile from "../../Images/profile.svg";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Appointment from "../../Images/Appoint.svg";
import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import calendar_svg from "../../Images/calendar_svg.svg";
import ReactSVG from "react-svg";
import ProfileLogout from "../../components/ProfileLogout/ProfileLogout";
import Report from "../../Images/report.svg";
import {notification} from 'antd';

import TrainerDashboardMaster from "../TrainerDashboard/TrainerDashboardMaster";
import CancelledDashboard from "../CancelledHistory/CancelledDashboard";
import AdvertisementMaster from "../AdvertisementBooking/AdvertisementMaster";
// import AppointmentsDashboard from "../AppointmentsList/AppointmentsDashboard"
import TotalAppointmentDashboard from "../AppointmentList/TotalAppointmentDashboard"
import DealsMaster from "../Deals/DealsMaster";
import RevenueMaster from "../Revenue/RevenueMaster";
import ManageMaster from "../Manage/ManageServiceMaster"
import MediaUploadsMaster from "../MediaUploads/MediaUploadsMaster";
import ProfileComp from "../LabProfile/ProfileComp";
import PaymentMethod from "../CancelPayment/PaymentMethod";
import PaymentReceived from "../PaymentReceived/PaymentReceived";
import dateFormat from "dateformat";
import Axios from 'axios';
import { apiurl } from "../../App";
const current_date = dateFormat(new Date(), "dd mmm yyyy");


const drawerWidth = 260;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36,
    Fontsize:10
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});
var today = new Date();

var date=today.getDate().toString().padStart(2, "0")+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getFullYear();
var time = today.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })

class MiniDrawer extends React.Component {
 
  state = {
    open: false,
    viewmodal: false,
    ProfileData:[],
    date: date,
    time: time,
    current_location:""
  };
  active=()=>
  {
    this.setState({current_location:window.location.pathname})
  }
  componentDidMount(){
    this.ProfileGetApi()
  }

  generateAlert = (description) => {
    notification.success({
      // message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  report=()=>{
    this.props.history.push("/");
  }


  ProfileGetApi=()=>{
    var self=this
    Axios({
      method: 'POST',
      url: apiurl+"gettrainingcenterprofile",
      data:{
        "trainingCenterId":"11"
      },
  }).then((response) => {
    var ProfileData=[]
    console.log(response,"getdetails")
    ProfileData=response.data.data
    this.setState({ProfileData})
    // this.props.ProfilegetApi() 
  }).catch((error) => {
      })
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false });
  };
  logoutClick = () => {
    window.localStorage.clear();
    window.location.assign('/?/nursemodule')
    this.props.onClose()
  }

  render() {
    const { classes, theme, children, onClose, selectedValue } = this.props;
console.log(this.state.ProfileData,"dd")
const { current_location } = this.state
const location=window.location.href
    return (
      <div className="drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              {/* <div className="hamburger_icon"> */}
              <IconButton
                
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open
                })}
              >
                <MenuIcon />
              </IconButton>
              {/* </div> */}
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.margin}
                  >
                    <div className="notification-icon">
                      {" "}
                      <img className="notification" src={bell} />
                    </div>
                  </Badge>
                  <Dropdown.Toggle variant="my_style" id="dropdown-basic">
                  {this.state.ProfileData && this.state.ProfileData[0] && this.state.ProfileData[0].vendor_name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                  {this.state.ProfileData.map((val)=>{
               return(
                    <div className="dropdown-img">
                    {/* <NavLink activeClassName="active" to="/Home/profilepage"> */}
                   
                      <img
                      
                        className="Avatar"
                        alt="avatar-missing"
                        src={val.vendor_filename}
                      />
             
                      {/* </NavLink> */}
                      
                     
                    </div>
                    )})}
                    {this.state.ProfileData.map((val)=>{
               return(
                    <div className="name_email">
                      <NavLink className={`${location.endsWith("dashboard") && "activecolor"}`} to="/Home/profile">
                   <div className="username" style={{color:'black',textDecoration:'none',fontSize:'15px'}}>{val.vendor_name}</div>
                   </NavLink>
                   <NavLink activeClassName="active" to="/Home/profile">

                   <div style={{color:'grey',textDecoration:'none',fontSize:'12px'}}>{val.vendor_contact_email}</div>
                   </NavLink>
                   </div>
               )})}
                    <Divider />
                    <div className="profile_logout_butt">
                    <NavLink activeClassName="active" to="/Home/profile">
                      <p>Profile</p>
                      </NavLink>
                      {/* <Button
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                        onClick={this.logoutclick}
                      >
                        Logout
                      </Button> */}
                      <a
                        component={NavLink}
                        href="/trainingcenter/?/"
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                      >
                        Logout
                      </a>
                    </div>
                    <Divider />
                    <div className="profile_logout_privacy ">
                      <p>Privacy Policy Terms of Service</p>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                  <large className="date">{this.state.date}{`   `}{this.state.time}</large>
                  </div>
                </div>
              </div>
              {this.state.ProfileData.map((val)=>{
               return(
              // <NavLink activeClassName="active" to="/Home/profilepage">
              <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={val.vendor_filename}
                // onClick={this.viewmodalOpen}
                className={classes.avatar}
              />
              // </NavLink>
               )})}
              
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>


            <MenuList className="appbar_sideicons">
               <MenuItem component={Link} to="/Home/dashboard" className={`${location.endsWith("dashboard") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={home_svg} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Home" />
               </MenuItem>

               <MenuItem component={Link} to="/Home/appointments" className={`${location.endsWith("appointments") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={Appointment} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Appointment List" />
               </MenuItem>
               <MenuItem component={Link} to="/Home/cancelhistory" className={`${location.endsWith("cancelhistory") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={Cancel} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Cancelled Appointments" />
               </MenuItem>
               <MenuItem component={Link} to="/Home/advertise" className={`${location.endsWith("advertise") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={advertise_svg} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Advertisement Booking" />
               </MenuItem>
              <MenuItem component={Link} to="/Home/deals" className={`${location.endsWith("deals") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <div>
                       <ReactSVG src={Deals} />
                     </div>
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Deals" />
               </MenuItem>
               <MenuItem component={Link} to="/Home/revenue" className={`${location.endsWith("revenue") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={revenue_svg} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Revenue" />
               </MenuItem>

               <MenuItem component={Link} to="/Home/managepackage" className={`${location.endsWith("manageservice") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={manage_package} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Manage Package" />
               </MenuItem>

               <MenuItem component={Link} to="/Home/mediaupload" className={`${location.endsWith("mediaupload") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <div>
                       <ReactSVG src={upload_svg} />
                     </div>
                 </div>
                 </ListItemIcon>
                 <ListItemText primary="Media Uploads" />
               </MenuItem>
               <MenuItem component={Link} to="/Home/profile" className={`${location.endsWith("profile") && "activecolor"}`}>
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={profile}/>
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Profile" />
               </MenuItem>
               <MenuItem >
                 <ListItemIcon>
                   <div className="icon-container">
                     <ReactSVG src={Report} />
                   </div>
                 </ListItemIcon>
                 <ListItemText primary="Report" />
               </MenuItem>
            </MenuList>

          </Drawer>

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route
              path={`${this.props.match.path}/dashboard`}
              component={TrainerDashboardMaster}
              exact
            />

            <Route
              path={`${this.props.match.path}/appointments`}
              render={(props) => <TotalAppointmentDashboard {...props} generateAlert={this.generateAlert}  />} exact />


            <Route
              path={`${this.props.match.path}/cancelhistory`}
              render={(props) => <CancelledDashboard {...props} generateAlert={this.generateAlert}  />} exact />
            

            <Route
              path={`${this.props.match.path}/advertise`}
              render={(props) => <AdvertisementMaster {...props} generateAlert={this.generateAlert}  />} exact />

            
            <Route
              path={`${this.props.match.path}/deals`}
              render={(props) => <DealsMaster {...props} generateAlert={this.generateAlert}  />} exact />

            <Route
              path={`${this.props.match.path}/revenue`}
              render={(props) => <RevenueMaster {...props} generateAlert={this.generateAlert}  />} exact />


            <Route
              path={`${this.props.match.path}/managepackage`}
              render={(props) => <ManageMaster {...props} generateAlert={this.generateAlert}  />} exact />

            <Route
              path={`${this.props.match.path}/mediaupload`}
              render={(props) => <MediaUploadsMaster {...props} generateAlert={this.generateAlert}  />} exact />

            <Route
              path={`${this.props.match.path}/profile`}
              render={(props) => <ProfileComp {...props} generateAlert={this.generateAlert} ProfileGetApi={this.ProfileGetApi
              } />} exact />
            <Route
              path={`${this.props.match.path}/Cancelpayment`}
              component={PaymentMethod}
              exact
            />
            <Route
              path={`${this.props.match.path}/paymentreceived`}
              component={PaymentReceived}
              exact
            />
            <div>
              {children}
              {/* <Profilepage
                open={this.state.viewmodal}
                onClose={this.viewmodalClose}
              /> */}
            </div>
          </main>

          
          
        </div>
      </div>
    );
  }
}


MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};


export default withStyles(styles, { withTheme: true })(MiniDrawer);







