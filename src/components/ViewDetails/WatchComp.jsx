import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import Report from '../../images/report.jpg'
import './WatchComp.css'
import { Progress } from 'antd';
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
const data = [
  { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
  month: {alias: 'Month',},
  count: {alias: 'Sales',},
};
export default class WatchDetails extends React.Component{
constructor(props)
{
super(props)
   this.state={name:""}
}
render()
{
    return(
       <div>
           <div className="paper_maincontainer">
        
               <Paper className="paper_container">
               <div className="heart_div"><p>Steps</p>
                   <div className="heart_rate"><p className="heartdate_per">1100</p></div>
                  
                   </div>
                   <div className="progress_container">
                       {/* <Chart height={400} data={data} scale={scale} forceFit>
                         <Axis title name="month" />
                         <Axis title name="count" />
                         <Legend />
                         <Tooltip crosshairs={{ type: 'rect' }} />
                         <Geom type="interval" position="month*count" color="month" />
                       </Chart> */}
                       </div>
               </Paper>
               <Paper className="paper_container">
               <div className="heart_div"><p>Heart Rate</p>
                   <div className="heart_rate"><p className="heartdate_per">78</p><p className="heart_date">Bpm</p></div>
                   
                  
                   </div>
                   <div className="progress_container"><Progress percent={100} status="active" className="heart_rate_progress"/></div>
               </Paper>
               <Paper className="paper_container">
               <div className="heart_div"><p>Sleep</p>
                   <div className="heart_rate"><p className="heartdate_per">0</p><p className="heart_date">H</p>
                   <p className="heartdate_per">0</p><p className="heart_date">M</p></div>
                  
                   </div>
                   <div className="progress_container"><Progress percent={100} status="active" className="sleep_progress"/></div>
               </Paper>
               
           </div>
           <div className="secondpaper_maincontainer">
           <Paper className="paper_container">
               <div className="heart_div"><p>Running</p>
                   <div className="heart_rate"><p className="heartdate_per">0</p><p className="heart_date">H</p>
                   <p className="heartdate_per">0</p><p className="heart_date">M</p></div>
                  
                   </div>
                   <div className="progress_container"><Progress percent={100} status="active" className="running_progress"/></div>
               </Paper>
           </div>
       </div>
    )
}
}