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
import Trainee from "../../Images/trainee_img.jpg";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./ManageServiceModal.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Patient from "../../Images/trainee_img.jpg";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Dropdown } from "antd";
import Card from "@material-ui/core/Card";
import wrong from "../../Images/trainee_img.jpg";
import CloseIcon from "@material-ui/icons/Close";
const styles = {};

export default class ManageServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
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
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div className="trainer_popup_details">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="addpackage_modal"
        >
          <Card>
            <div className="d-flex">
              <Grid item md={4} sm={3} className="mt-2 font_add">
                <div className="ml-5 top_addpackage">ADD TRAINING</div>
              </Grid>
              {/* <Grid item md={4} sm={3} className="mt-2 font_add"><div className="ml-5 top_addpackage">ADD PACKAGE</div></Grid> */}
              <Grid item md={8} sm={3} className="clinicbutton-container">
                <div className="mr-3">
                  <Button className="manageCancel">Cancel</Button>
                  <Button
                    className="manageSubmit"
                    onClick={() => this.props.closemodal(false)}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </div>
          </Card>

          <div className="service_type_container">
            <Grid container>
              <Grid item md={4} sm={5} className="width_training">
                <Labelbox
                  className="training_adjust "
                  labelname="Training Category"
                  type="select"
                ></Labelbox>
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5} className="width_training ">
                <Labelbox
                  className="training_adjust "
                  labelname="Training"
                  type="select"
                ></Labelbox>
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5} className="width_training ">
                <Labelbox
                  className="training_adjust "
                  labelname="Package Name"
                  type="select"
                ></Labelbox>
              </Grid>
              <Grid container className="mt-4">
                <Grid item md={2} sm={5} className="width_training ">
                  <Labelbox
                    className="training_adjust "
                    labelname="Session"
                    type="text"
                  ></Labelbox>
                </Grid>
                <Grid item md={2} sm={5} className="width_training ml-3 ">
                  <Labelbox
                    className="training_adjust "
                    labelname="Cost(KWD)"
                    type="text"
                  ></Labelbox>
                </Grid>
              </Grid>
              <Grid container className="mt-4">
                <Grid item md={12} sm={5} className="width_training ">
                  <Labelbox
                    className="training_adjust "
                    labelname="Package Details"
                    value=" Just not to lose weight,just not to feel strong,just not to feel fit,its all about
                   complete well being!Leave a stress and hard day behind and rejuvenate yourself.   "
                    type="textarea"
                  ></Labelbox>
                </Grid>
                <div className="w-100 add_adjust">
                  <Button className="manage_add">Add</Button>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="dotted_line" />
          <div className="card_sizecontent">
            <Card className="mt-3 manage_card" variant="outlined">
              <div>
                <CloseIcon className="iconclose_adjust" />
              </div>
              <div className=" mt-3">
                <Grid container>
                  <Grid item md={4} sm={5}>
                    <div className=" mt-3">
                      <p className="card_training">Training Category</p>
                      <span className="card_outdoor">Outdoor</span>
                    </div>
                  </Grid>
                  <Grid md={1} />
                  <Grid item md={3} sm={5}>
                    <div className=" mt-3">
                      <p className="card_training">Training</p>
                      <span className="card_outdoor">Golf</span>
                    </div>
                  </Grid>
                  <Grid md={1} />
                  <Grid item md={3} sm={5}>
                    <div className=" mt-3">
                      <p className="card_training">Package</p>
                      <span className="card_outdoor">Gold Golf</span>
                    </div>
                  </Grid>
                  {/* <Grid md={4}/> */}
                  <Grid item md={6} sm={5}>
                    <div className=" mt-3">
                      <p className="card_training">Cost(KWD)</p>
                      <span className="card_outdoor">1400</span>
                    </div>
                  </Grid>
                  <Grid md={1} />
                  <Grid item md={4} sm={5} className="mt-2">
                    <div className="sessionmodal_border">
                      <p className="sessionmodal_color mt-1 ml-1">Session 24</p>
                    </div>
                  </Grid>
                </Grid>
                <div className="dotted_line mt-2" />
              </div>
            </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ManageServiceModal);
