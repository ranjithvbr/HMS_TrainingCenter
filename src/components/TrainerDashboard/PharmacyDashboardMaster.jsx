import React, { Component } from "react";
import "./TrainerDashboardMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import TrainerDashboard from "./TrainerDashboard";

class TrainerDashboardMaster extends Component {
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
        <div className="dashboardborder_box">
          <p className="dashboard">TRAINING CENTER DASHBOARD</p>
          {/* <div className="dashboard_time"><a className="totay_date" href="#">Today</a>	
			      <Moment format="DD-MMM-YYYY">
            </Moment>
            </div> */}
        </div>
        <Paper>
          <div>
            <TrainerDashboard />
          </div>
          <div>
            <TrainerDashboardDetails />
          </div>
        </Paper>
      </div>
    );
  }
}
export default TrainerDashboardMaster;
