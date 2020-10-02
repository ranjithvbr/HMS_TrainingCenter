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
import Trainee from "../../Images/1.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./Profilepage.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
const styles = {};
export default class Profilepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cancel: null,
      viewdata:[],
    };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  render() {
    const viewdata = this.props
    console.log(viewdata,"profile_chk")

    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;


    return (
      <div className="trainee_popup_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <Grid container className="total">
            <Grid item xs={12} md={5}>
              <div className="trainee_image_container">
                <div className="trainee_image_div">
                  <img className="trainee_image" src={Trainee} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={7} className="addtrainee_gridcontainer">
              <div>
                <div>
                  <h1 className="trainee_detail">Abdul Khaafid</h1>

                  <div>
                    <h4 className="working_hour">
                      <b>Booking Details</b>
                    </h4>
                  </div>
                  <div className="working_detail">
                    <h4 className="working_hour_detail">Gender</h4>

                    <p className="working_time_detail">Male</p>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">Age</h4>
                      <p className="working_time_detail">35</p>
                    </div>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">Date</h4>

                      <p className="working_time_detail">08 Dec 2019</p>
                    </div>
                  </div>
                  <div>
                    <div className="working_detail">
                      <h4 className="working_hour_detail">Time</h4>
                      <p className="working_time_detail">09:15 AM</p>
                    </div>
                  </div>
                  <Grid container className="todays-appoinment-buttons">
                    <Grid
                      className="todays-appoinment-griditems"
                      items
                      xs={12}
                      md={4}
                    >
                      <Button className="reports_button">Reports</Button>
                    </Grid>
                    <Grid
                      className="todays-appoinment-griditems"
                      items
                      xs={12}
                      md={4}
                    >
                      <Button className="watch_button">Watch</Button>
                    </Grid>
                    <Grid
                      className="todays-appoinment-griditems"
                      items
                      xs={12}
                      md={4}
                    >
                      <Button className="prescription_button">
                        Prescription
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Divider />

              {/* <div className="package_cancel_details">
                <Button
                  className="package-cancel_button"
                  onClick={this.props.onClose}
                >
                  Cancel
                </Button>
              </div> */}
            </Grid>
          </Grid>
        </Dialog>
        {/* <Modalcomp
          open={this.state.view}
          onClose={this.onclose}
          title="gfffffffffffffh"
        /> */}
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(Profilepage);

// export default function SimpleDialogDemo(props) {
//   const [open, setOpen] = React.useState(props);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = value => {
//     setOpen(false);

//   };

//   return (
//     <div>

//       <SimpleDialog  open={open} onClose={handleClose}>

//       </SimpleDialog>
//     </div>
//   );
// }
