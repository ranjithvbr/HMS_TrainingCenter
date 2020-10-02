import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ViewDetailsMaster.css";
import ViewDetails from './ViewDetails'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Plus from '../../images/plus.png'
import dateFormat from 'dateformat';
import Paper from '@material-ui/core/Paper';
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
export default class ViewDetailsMaster extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          open: false
        };
      }
      handleClickopen = () => {
        this.setState({ open: true });
      };
      handleClickclose = () => {
        this.setState({ open: false });
      };
    
      render() {
        return (
          <div className="uploadmaster">
            <Paper>
            <div className="doctorviewheader">
                 <div className="viewdetails_person"><p className="doctor_upload_text">ABDUL KHADHER</p><p className="person_age">45 Years</p></div>
                 <div className="viewdetails_persondate"><p className="current_date_report">{current_date}</p><p>10.00AM</p></div>
                  </div>
            <ViewDetails />
            <div className="Upload-modal-container">
              <Modalcomp
                visible={this.state.open}
                closemodal={this.handleClickclose}
                title={"Create a User"}
              >
              </Modalcomp>
            </div>
            </Paper>
          </div>
        );
      }
    }
    