import React, { Component } from "react";
import "./TotalAppointmentDashboard.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import DashboardTable from "./TotalAppointmentTable";
import { Input } from "antd";
import Button from '@material-ui/core/Button';

import dateFormat from 'dateformat';
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from '@material-ui/core/Paper';
import pdf from '../../Images/pdf.svg'
import excel from '../../Images/excel.svg'
import print from '../../Images/print.svg'
import axios from "axios";
import jsPDF from 'jspdf';
import ReactSVG from "react-svg";
import 'jspdf-autotable';

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))


class TotalAppointmentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
      open:false,
      WeekData:[],
      props_loading:true,
      wk_mh_yr_Data:[],
      yearData:[],
      Search:null,
      totalData:""
    };
  }



  render() {


    // RENDERING
    return (
      <div className="dashboard_master">
        <Paper>
          
        
        <DashboardTable
    
            />
        </Paper>
      </div>
    );
  }
}

export default TotalAppointmentDashboard;
