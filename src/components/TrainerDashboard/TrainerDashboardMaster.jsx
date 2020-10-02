import React, { Component } from "react";
import "./TrainerDashboardMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import TrainerDashboard from "./TrainerDashboard";

class PharmacyDashboardMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
    };
  }

  render() {
    const { Option } = Select;
    return (
      <div className="trainer_dashboard_master">
        <Paper>
          <div className="dashboardborder_box">
            <p className="dashboard">TRAINING CENTER DASHBOARD</p>

          </div>

          <div>
            <TrainerDashboard />
          </div>
        </Paper>
      </div>
    );
  }
}
export default PharmacyDashboardMaster;
