import React, { Component } from "react";
import "./TrainerDashboardMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import dateformat from "dateformat";
import Card from "@material-ui/core/Card";
import "./TrainerDashboard.css";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ProfileView from "./ProfileView";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Axios from "axios";
const apiurl_2 = "http://52.200.251.222:8158/api/v1/";
const current_date = dateformat(new Date(), "dd mmm yyyy");

class PharmacyDashboardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
      openview: false,
      tabledatavalue: [],
      totalValue: "",
      viewData: [],
      Openviewdata: [],
      props_loading: true,
      GetDashboardFunction: [],
      managepackage: "",
      cancellation: "",
      viewdata: "",
    };
  }
  modelopen = (data, id) => {
    if (data === "view") {
      this.setState({
        openview: true,
        Openviewdata: this.state.totalValue[id],
      });
      console.log(this.state.totalValue, "open_chk");
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  componentDidMount() {
    this.GetDashboardFunction();
    // this.ViewApiFunction()
  }
  // GET API FUNCTION
  GetDashboardFunction = () => {
    Axios({
      method: "post",
      url: apiurl_2 + "TrainingCenter/TCDashboard",
      data: {
        tcvendorId: 11,
        today_date: dateformat(new Date(), "yyyy-mm-dd"),
      },
    })
      .then((response) => {
        console.log("divyaaaaa", response.data);
        const CardData = response.data.dashboard;
        var tabledatavalue = [];
        response.data.data.map((val, index) => {
          tabledatavalue.push({
            customer: val.CustomerName,
            package: val.trcr_package_name,
            fromdate: dateformat(val.fromDate, "dd mmm yyyy"),
            todate: dateformat(val.Todate, "dd mmm yyyy"),
            totaldays: val.Noofdays,
            id: index,
          });
        });
        this.setState({
          tabledatavalue: tabledatavalue,
          totalValue: response.data.data,
          totalappointment: CardData.total_appointments,
          managepackage: CardData.managepackage,
          cancellation: CardData.cancel_count,
          totalrevenue: CardData.total_revenue,
          props_loading: false,
        });
        console.log(this.state.totalValue, "vhkking");
      })
      .catch((error) => {
        // alert(JSON.stringify(error));
      });
  };
  render() {
    const { Option } = Select;
    return (
      <div>
        <div className="nurse_dashboard_buttons_wrap">
          <Card
            component={NavLink}
            to="/Home/appointments"
            className="dashboard_card_container_green nurse_button_common_styles"
          >
            <p className="nurse_button_text">Total Appointments</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">
                {this.state.totalappointment}
              </p>
            </div>
          </Card>
          <Card
            className="dashboard_card_container_yellow nurse_button_common_styles"
            component={NavLink}
            to="/Home/managepackage"
          >
            <p className="nurse_button_text">Manage Package</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">
                {this.state.managepackage}
              </p>
            </div>
          </Card>
          <Card
            className="dashboard_card_container_pinky nurse_button_common_styles"
            component={NavLink}
            to="/Home/cancelhistory"
          >
            <p className="nurse_button_text">Cancellation</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">
                {this.state.cancellation}
              </p>
            </div>
          </Card>
          <Card
            className="dashboard_card_container_darkgreen nurse_button_common_styles"
            component={NavLink}
            to="/Home/revenue"
          >
            <p className="nurse_button_text">Total Revenue(KWD)</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">
                {this.state.totalrevenue === null
                  ? "0"
                  : this.state.totalrevenue}
              </p>
            </div>
          </Card>
        </div>
        <div className="today_Appointments">
          <span>Today's Appointments</span>
          <span className="current_date">{current_date}</span>
        </div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "package", label: "Package" },
            { id: "fromdate", label: "From Date" },
            { id: "todate", label: "To Date" },
            { id: "totaldays", label: "Total Sessions" },
            { id: "action", label: "Action" },
          ]}
          rowdata={this.state.tabledatavalue && this.state.tabledatavalue}
          tableicon_align={"cell_eye"}
          modelopen={(e, id) => this.modelopen(e, id)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          props_loading={this.state.props_loading}
        />
        <div className="dash_buttons_container mt-5">
          <div className="dash_butt">
            <Button
              className="nurse_dash_bottom_buttons nurse_dash_bottom2"
              component={NavLink}
              to="/Home/mediaupload"
            >
              Media Uploads
            </Button>
            <Button
              className="nurse_dash_bottom_buttons nurse_dash_bottom3"
              component={NavLink}
              to="/Home/advertise"
            >
              Advertisement Booking
            </Button>
          </div>
        </div>
        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
    xswidth={"xs"}
    >
    </Modalcomp> */}
        <ProfileView
          open={this.state.openview}
          onClose={this.closemodal}
          Openviewdata={this.state.Openviewdata}
        />
      </div>
    );
  }
}
export default PharmacyDashboardCard;


