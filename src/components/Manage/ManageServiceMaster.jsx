import React, { Component } from "react";
import "./ManageServiceMaster.css";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import ManageServiceTable from "./ManageServiceTable";
class ManageServiceMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
    };
  }
  modelopen = () => {
    this.setState({ openview: true });
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  render() {
    return (
      <div className="trainer_manage">
        <Paper> 
          <ManageServiceTable />
        </Paper>
       
      </div>
    );
  }
}

export default ManageServiceMaster;
