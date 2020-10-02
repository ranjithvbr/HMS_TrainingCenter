import React, { Component } from "react";
import CancelledTable from "./CancelledTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input, Select, Icon } from "antd";
// import print from "../../Images/print.svg";
// import pdf from "../../Images/pdf.svg";
// import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";
import dateFormat from "dateformat";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { apiurl } from '../../App'

import DateRangeSelect from "../../helpers/DateRange/DateRange";
const current_date = dateFormat(new Date(), "dd mmm yyyy");
export default class CancelledDashboard extends Component {
  constructor(props){
    super(props)
    this.state={WeekData:[],props_loading:true,
      wk_mh_yr_Data:[],
      yearData:[],
      weekenable:true,
      monthenable:false,
      yearenable:false,
      CurrentData:new Date()
    }
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    // console.log(dateFormat(new Date(),"dd mmm yyyy"))
    
    return (
      <div>
          {/* {this.state.dateRangeOpen && <DateRangeSelect dynalign={"dynalign"} rangeDate={(data)=>this.rangedataFun(data)} />} */}
        <Paper>
          {/* <div className="dashboard_header">
            <div className="dashboard_title">CANCELLED APPOINTMENTS</div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center"
              }}
            >
         

              <Moment format="DD-MMM-YYYY" className="mr-5 range_date"onClick={()=>this.setState({dateRangeOpen:!this.state.dateRangeOpen})} ></Moment>
              <Search
                placeholder="Search"
                onSearch={value => console.log(value)}
                style={{ width: 150 }}
                className="mr-2 ml-2"
                onChange={(e) => this.setState({ searchData: e.target.value })}
              />
              <div className="icon_head">
                <ReactSVG
                  src={pdf}
                  style={{ marginRight: "15px", marginLeft: "15px" }}
                />
                <ReactSVG src={excel} style={{ marginRight: "15px" }} />
                <ReactSVG src={print} />
              </div>
            </div>
          </div> */}
          <CancelledTable 
          // wk_mh_yr_Data={this.state.wk_mh_yr_Data}
          // props_loading={this.state.props_loading}
        
          // monthData={this.state.monthData}
          // yearData={this.state.yearData}
          // DayDataApi={this.DayDataApi}
          // searchData={this.state.searchData}
          />
        </Paper>
      </div>
    );
  }
}
