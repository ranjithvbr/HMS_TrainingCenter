import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./MediaUploadsMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import MediaUploadsModal from "./MediaUploadsModal";
import MediaUploadsTable from "./MediaUploadsTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import Paper from "@material-ui/core/Paper";
import dateFormat from 'dateformat';
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))
export default class MediaUploadsMaster extends Component {
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
    const { Search } = Input;
    console.log(dateFormat(new Date(),"dd mmm yyyy"))
    return (
      <div >
       
        <div className="hms_trainer_header">
              <div className="titleuser">MEDIA UPLOADS</div>
           
                <img
                  className="plus-icon"
                  src={plus}
                  alt={"hi"}
                  style={{ width: 46, height:46,cursor:"pointer" }}
                  className="mr-4 ml-2"
                  onClick={this.handleClickopen}
                />
                
          </div>
        <MediaUploadsTable truegetmethod={this.state.truegetmethod} falsegetmethod={()=>this.setState({truegetmethod:false})} />
       
        <div className="Upload-modal-container">
          <Modalcomp
            visible={this.state.open}
            closemodal={this.handleClickclose}
            title={"New Media Uploads"}
          >
            <MediaUploadsModal visible={this.state.open}
            closemodal={this.handleClickclose}
            getTableData={()=>this.setState({truegetmethod:true})} />
          </Modalcomp>
        </div>
      </div>
    );
  }
}
