import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from 'antd';
import Report from '../../images/report.jpg'
import WatchDetails from './WatchComp'
import './ViewDetails.css'
export default class ViewDetails extends React.Component{
constructor(props)
{
super(props)
   this.state={name:""}
}
 callback=(key)=>{
    console.log(key);
  }
render()
{
    const { TabPane } = Tabs;
    return(
        <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Report" key="1">
                    <Grid container style={{padding:"20px"}}>
                           <Grid item xs={12} md={5} className="reportcontainer">
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">Blood Test</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">Urine Test</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">Motion Test</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">X Ray</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                                   
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">X Ray</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                                   
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">X Ray</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                                   
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">X Ray</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                                   
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">X Ray</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                                   
                               </Paper>
                               <Paper className="firstpaper_test">
                                   <h5 className="test_report">X Ray</h5>
                                   <div className="date_view"><p>18-07-2019</p><p className="view">View</p></div>
                                   
                               </Paper>
                           </Grid>
                           <Grid item xs={12} md={7} className="report_view_container">
                               <div className="report_view_div">
                                   <p>Preview</p>
                                   <img src={Report} className="report_image"/>
                               </div>
                           </Grid>
                    </Grid>
                </TabPane>
                <TabPane tab="Watch" key="2">
                    <WatchDetails/>
                </TabPane>
                <TabPane tab="Prescription" key="3">
                  <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                          <div  className="prescription_container">
                    <div className="report_container"><img src={Report} className="report_image"/>
                      <div className="pres_date">10 Jan 2020</div>
                    </div>
                    <div  className="report_container"><img src={Report} className="report_image"/>
                    <div className="pres_date">10 Jan 2020</div>
                    </div>
                    </div>
                    </Grid>
                    </Grid>
                </TabPane>
            </Tabs>
            <div></div>
        
        </div>
    )
}
}