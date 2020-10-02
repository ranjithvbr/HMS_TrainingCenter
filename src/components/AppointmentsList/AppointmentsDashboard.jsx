/* eslint-disable jsx-a11y/alt-text */
// import React, { Component } from "react";
// import "./AppointmentsDashboard.css";
// import { Select } from "antd";
// import "antd/dist/antd.css";
// import AppointmentsTable from "./AppointmentsTable";
// import { Input, Spin, notification } from "antd";
// import Button from "@material-ui/core/Button";
// import Plus from "../../Images/plus.png";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import dateFormat from "dateformat";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import Labelbox from "../../helpers/labelbox/labelbox";
// import Paper from "@material-ui/core/Paper";
// import pdf from "../../Images/pdf.svg";
// import print from "../../Images/print.svg";
// import excel from "../../Images/excel.svg";
// import Axios from "axios";
// import { apiurl } from "../../App";
// import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import Card from "@material-ui/core/Card";
// import { NavLink } from "react-router-dom";
// import "./AppointmentsTable.css";
// import Profilepage from "./Profilepage";
// import dateformat from "dateformat";
// import ReactExport from "react-data-export";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import PrintData from "./printdata";
// import ReactToPrint from "react-to-print";
// import ReactSVG from "react-svg";
// import Moment from "react-moment";
// import DateRangeSelect from "../../helpers/DateRange/DateRange";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

// const current_date = dateFormat(new Date(), "dd mmm yyyy");
// var moment = require("moment");

// class AppointmentsDashboard extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       date: "rrr",
//       search: null,
//       enableSearch: false,
//       appointlistData: [],
//       tabledata: [],
//       startDate: new Date(),
//       endDate: new Date(),
//       spinner: false,
//       viewData: [],
//       props_loading:true
//     };
//   }

//   formatTimeShow = (h_24) => {
//     var h = Number(h_24.substring(0, 2)) % 12;
//     if (h === 0) h = 12;
//     return (
//       (h < 10 ? "0" : "") +
//       h +
//       ":" +
//       h_24.substring(3, 5) +
//       (Number(h_24.substring(0, 2)) < 12 ? " AM" : " PM")
//     );
//   };

//   generatepdf = () => {
//     const doc = new jsPDF("a3");
//     var bodydata = [];
//     this.state.appointlistData.map((data, index) => {
//       console.log(data, "dataaa");
//       bodydata.push([index + 1, data.name, data.category, data.package]);
//     });
//     doc.autoTable({
//       beforePageContent: function (data) {
//         doc.text("Apppointment List", 15, 23); // 15,13 for css
//       },
//       margin: { top: 30 },
//       showHead: "everyPage",
//       theme: "grid",
//       head: [["S.No", "Customer", "Category", "Package"]],
//       body: bodydata,
//     });
//     doc.save("Apppointment List.pdf");
//   };


//   componentDidMount() {
//     this.getTableData();
//     this.dayReport(
//       [
//         {
//           startDate: new Date(),
//           endDate: new Date(),
//           key: "selection",
//         },
//       ],
//       true
//     );
   
//   }

//   dayReport = (data, firstOpen) => {
//     console.log(data, "itemdaterange");
//     var startdate = dateformat(data[0].startDate, "yyyy-mm-dd");
//     var enddate = dateformat(data[0].endDate, "yyyy-mm-dd");
//     this.setState({ startDate: startdate, endDate: enddate });
//     if (!firstOpen) {
//       this.setState({ spinner: true });
//     }
//     var self = this;
//     Axios({
//       method: "POST",
//       url: apiurl + "TrainingCenter/gettrainingcenterappointmentlist",
//       data: {
//         tcvendorId: "11",
//         fromDate: startdate,
//         toDate: enddate,
//         period: "Day",
//       },
//     })
//       .then((res) => {
//         console.log(res.data.data, "res");

//         var appointlistData = [];
//         var viewData = [];
//         res.data.data.map((val, index) => {
//           console.log(val, "valeded");
//           appointlistData.push({
//             name: val.CustomerName,
//             category: val.training_category,
//             package: val.trcr_package_name,
//             id: val.CustomerId,
//           });
//           viewData.push({
//             name: val.CustomerName,
//             age: val.age,
//             fromDate: dateFormat(val.fromDate, "yyyy-mm-dd"),
//             toDate: dateFormat(val.ToDate, "yyyy-mm-dd"),
//             Date: dateFormat(val.Date, "yyyy-mm-dd"),
//             profile_image: val.profile_image,
//             packageName: val.trcr_package_name,
//             seSSion: val.trcr_session,
//             totalBilled: val.amount,
//             Time: this.formatTimeShow(val.Time),
//             id: val.CustomerId,
//           });
//           // appointlistData.push({
//           //   name: val.CustomerName,
//           //   category:val.training_category,
//           //   package: val.trcr_package_name,
//           //   id:index,
//           //   })

//           // viewData.push({

//           //   name:val.CustomerName,
//           //   age:val.age,
//           //   fromDate:dateformat(val.fromDate,"yyyy-mm-dd"),
//           //   toDate:this.dateformat(val.ToDate,"yyyy-mm-dd"),
//           //   Date:this.dateformat(val.Date,"yyyy-mm-dd"),
//           //   profile_image:val.profile_image,
//           //   packageName:val.trcr_package_name,
//           //   seSSion:val.trcr_session,
//           //   totalBilled:val.amount,
//           //   Time:this.formatTimeShow(val.Time),
//           //   id:index,

//           // })
//         });
//         this.setState({
//           appointlistData,
//           viewData,
//           props_loading: false,
//           spinner: false,
//         });
//         console.log("appointment_check", this.state.viewData);
//         // this.setState({
//         //   appointlistData,
//         //   viewData,
//         //   enableSearch:false,
//         //   tabledata:appointlistData,
//         //   props_loading: false,
//         //   spinner:false
//         // },() => console.log("appointment_check",this.state.viewData))
//       })
//       .catch((error) => {
//         // alert(JSON.stringify(error))
//       });
//   };

//   getTableData = (data) => {
//     this.setState({ spinner: true });
//     var self = this;
//     Axios({
//       method: "POST",
//       url: apiurl + "TrainingCenter/gettrainingcenterappointmentlist ",
//       data: {
//         tcvendorId: "11",
//         fromDate: this.state.startDate,
//         toDate: this.state.endDate,
//         period: "Day",
//       },
//     })
//       .then((res) => {
//         console.log(res.data.data, "res");

//         var appointlistData = [];
//         var viewData = [];
//         res.data.data.map((val, index) => {
//           console.log(val, "valeded");
//           appointlistData.push({
//             name: val.CustomerName,
//             category: val.training_category,
//             package: val.trcr_package_name,
//             id: val.CustomerId,
//           });

//           viewData.push({
//             name: val.CustomerName,
//             age: val.age,
//             fromDate: dateFormat(val.fromDate, "yyyy-mm-dd"),
//             toDate: dateFormat(val.ToDate, "yyyy-mm-dd"),
//             Date: dateFormat(val.Date, "yyyy-mm-dd"),
//             profile_image: val.profile_image,
//             packageName: val.trcr_package_name,
//             seSSion: val.trcr_session,
//             totalBilled: val.amount,
//             Time: this.formatTimeShow(val.Time),
//             id: val.CustomerId,
//           });
//         });

//         this.setState(
//           {
//             appointlistData,
//             viewData: viewData,
//             enableSearch: false,
//             tabledata: appointlistData,
//             props_loading: false,
//             spinner: false,
//           },
//           () =>
//             console.log("appointment_tablecheck", this.state.appointlistData)
//         );
//       })
//       .catch((error) => {
//         // alert(JSON.stringify(error))
//       });
//   };

//   Notification = () => {
//     notification.info({
//       message: "No Data Found",
//       placement: "topRight",
//     });
//   };

//   searchChange = (e) => {
//     this.setState({
//       search: e.target.value,
//       enableSearch: true,
//     });
//     this.setState({});
//   };

//   render() {
//     console.log("checki", this.props);
//     const { Option } = Select;
//     const { Search } = Input;
//     console.log(dateFormat(new Date(), "dd mmm yyyy"));

//     var multiDataSetbody = [];
//     this.state.appointlistData.map((xldata, index) => {
//       console.log(this.state.appointlistData, "xldata");
//       if (index % 2 !== 0) {
//         multiDataSetbody.push([
//           { value: index + 1, style: { alignment: { horizontal: "center" } } },
//           { value: xldata.name },
//           { value: xldata.category },
//           { value: xldata.package },
//         ]);
//       } else {
//         multiDataSetbody.push([
//           {
//             value: index + 1,
//             style: {
//               alignment: { horizontal: "center" },
//               fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
//             },
//           },

//           {
//             value: xldata.name,
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
//             },
//           },

//           {
//             value: xldata.category,
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
//             },
//           },
//           {
//             value: xldata.package,
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
//             },
//           },
//         ]);
//       }
//     });

//     const multiDataSet = [
//       {
//         columns: [
//           {
//             title: "S.No",
//             width: { wpx: 35 },
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
//             },
//           },

//           {
//             title: "Customer",
//             width: { wch: 20 },
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
//             },
//           },
//           {
//             title: "Category",
//             width: { wpx: 90 },
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
//             },
//           },
//           {
//             title: "Package",
//             width: { wpx: 100 },
//             style: {
//               fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
//             },
//           },
//         ],
//         data: multiDataSetbody,
//       },
//     ];

//     const searchdata = this.state.appointlistData.filter((data) => {
//       console.log(data, "Search_data");
//       if (this.state.search === null) {
//         return data;
//       } else if (
//         (data.name !== null &&
//           data.name.toLowerCase().includes(this.state.search.toLowerCase())) ||
//         (data.category !== null &&
//           data.category
//             .toLowerCase()
//             .includes(this.state.search.toLowerCase())) ||
//         (data.package.toString() !== null &&
//           data.package
//             .toString()
//             .toLowerCase()
//             .includes(this.state.search.toLowerCase()))
//       ) {
//         return data;
//       }
//     });

//     return (
//       <div>
//         <Paper>
//           <div className="dashboard_header">
//             <div className="dashboard_title">
//               <div>TOTAL APPOINTMENTS</div>
//             </div>

//             {/* <div className="doctorappoint_container"> */}

//             <div
//               style={{
//                 fontSize: "14px",
//                 display: "flex",
//                 alignItems: "center",
//                 zIndex: 1,
//               }}
//             >
//               <div className="doc_appointment">
//                 <DateRangeSelect
//                   dynalign={"dynalign"}
//                   rangeDate={(item) => this.dayReport(item)}
//                 />
//               </div>

//               <Search
//                 placeholder=" search "
//                 onChange={(e) => this.searchChange(e)}
//                 style={{ width: 150 }}
//                 className="mr-2 ml-2"
//               />

//               <div className="icon_head">
//                 {this.state.appointlistData.length === 0 ? (
//                   <ReactSVG
//                     onClick={this.Notification}
//                     src={pdf}
//                     style={{ marginRight: "15px", marginLeft: "15px" }}
//                   />
//                 ) : (
//                   <ReactSVG
//                     onClick={this.generatepdf}
//                     src={pdf}
//                     style={{ marginRight: "15px", marginLeft: "15px" }}
//                   />
//                 )}

//                 {this.state.appointlistData.length === 0 ? (
//                   <ReactSVG
//                     onClick={this.Notification}
//                     src={excel}
//                     style={{ marginRight: "15px" }}
//                   />
//                 ) : ( 
//                   <ExcelFile
//                     filename={"Appointment List"}
//                     element={
//                       <ReactSVG src={excel} style={{ marginRight: "15px" }} />
//                     }
//                   >
//                     <ExcelSheet
//                       dataSet={multiDataSet}
//                       name="Appointment List"
//                     />
//                   </ExcelFile>
//                 )}

//                 {this.state.appointlistData.length === 0 ? (
//                   <ReactSVG src={print} onClick={this.Notification} />
//                 ) : (
//                   <ReactToPrint
//                     trigger={() => <ReactSVG src={print} />}
//                     content={() => this.componentRef}
//                   />
//                 )}
//                 <div style={{ display: "none" }}>
//                   <PrintData
//                     printTableData={this.state.appointlistData}
//                     ref={(el) => (this.componentRef = el)}
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* </div> */}
//           </div>
//           <Spin className="spinner_align" spinning={this.state.spinner}>

//           <AppointmentsTable
//             appointmentData={this.state.appointlistData}
//             viewData={this.state.viewData}
//             searchIng={searchdata.length === 0 ? [] : searchdata}
//             enableSearch={this.state.enableSearch}
//             tableData={this.state.tabledata}
//           />

//           </Spin>
//         </Paper>
//       </div>
//     );
//   }
// }

// export default AppointmentsDashboard;











import React, { Component } from "react";
import "./AppointmentsDashboard.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import AppointmentsTable from "./AppointmentsTable";
import { Input, Spin, notification } from "antd";
import Button from "@material-ui/core/Button";
import Plus from "../../Images/plus.png";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import dateFormat from "dateformat";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from "@material-ui/core/Paper";
import pdf from "../../Images/pdf.svg";
import print from "../../Images/print.svg";
import excel from "../../Images/excel.svg";
import Axios from "axios";
import { apiurl } from "../../App";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import { NavLink } from "react-router-dom";
import "./AppointmentsTable.css";
import Profilepage from "./Profilepage";
import dateformat from "dateformat";
import ReactExport from "react-data-export";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PrintData from "./printdata";
import ReactToPrint from "react-to-print";
import ReactSVG from "react-svg";
import Moment from "react-moment";
import DateRangeSelect from "../../helpers/DateRange/DateRange";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const current_date = dateFormat(new Date(), "dd mmm yyyy");
var moment = require("moment");

class AppointmentsDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
      search: null,
      enableSearch: false,
      appointlistData: [],
      tabledata: [],
      startDate: new Date(),
      endDate: new Date(),
      spinner: false,
      viewData: [],
      props_loading:true
    };
  }

  formatTimeShow = (h_24) => {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (
      (h < 10 ? "0" : "") +
      h +
      ":" +
      h_24.substring(3, 5) +
      (Number(h_24.substring(0, 2)) < 12 ? " AM" : " PM")
    );
  };

  generatepdf = () => {
    const doc = new jsPDF("a3");
    var bodydata = [];
    this.state.appointlistData.map((data, index) => {
      console.log(data, "dataaa");
      bodydata.push([index + 1, data.name, data.category, data.package]);
    });
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Apppointment List", 15, 23); // 15,13 for css
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [["S.No", "Customer", "Category", "Package"]],
      body: bodydata,
    });
    doc.save("Apppointment List.pdf");
  };


  componentDidMount() {
    this.getTableData();
    // this.dayReport(
    //   [
    //     {
    //       startDate: new Date(),
    //       endDate: new Date(),
    //       key: "selection",
    //     },
    //   ],
    //   true
    // );
   
  }

  dayReport = (data, firstOpen) => {
    console.log(data, "itemdaterange");
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd");
    var enddate = dateformat(data[0].endDate, "yyyy-mm-dd");
    this.setState({ startDate: startdate, endDate: enddate });
    if (!firstOpen) {
      this.setState({ spinner: true });
    }
    var self = this;
    Axios({
      method: "POST",
      url: apiurl + "TrainingCenter/gettrainingcenterappointmentlist",
      data: {
        tcvendorId: "11",
        fromDate: startdate,
        toDate: enddate,
        period: "Day",
      },
    })
      .then((res) => {
        console.log(res.data.data, "res");

        var appointlistData = [];
        var viewData = [];
        res.data.data.map((val, index) => {
          console.log(val, "valeded");
          appointlistData.push({
            name: val.CustomerName,
            category: val.training_category,
            package: val.trcr_package_name,
            id: val.CustomerId,
          });
          viewData.push({
            name: val.CustomerName,
            age: val.age,
            fromDate: dateFormat(val.fromDate, "yyyy-mm-dd"),
            toDate: dateFormat(val.ToDate, "yyyy-mm-dd"),
            Date: dateFormat(val.Date, "yyyy-mm-dd"),
            profile_image: val.profile_image,
            packageName: val.trcr_package_name,
            seSSion: val.trcr_session,
            totalBilled: val.amount,
            Time: this.formatTimeShow(val.Time),
            id: val.CustomerId,
          });
      
        });
        this.setState({
          appointlistData,
          viewData,
          props_loading: false,
          spinner: false,
        });
        console.log("appointment_check", this.state.viewData);
      })
      .catch((error) => {
      });
  };

  getTableData = (data) => {
    this.setState({ spinner: true });
    var self = this;
    Axios({
      method: "POST",
      url: apiurl + "TrainingCenter/gettrainingcenterappointmentlist ",
      data: {
        tcvendorId: "11",
        fromDate: this.state.startDate,
        toDate: this.state.endDate,
        period: "Day",
      },
    })
      .then((res) => {
        console.log(res.data.data, "res");

        var appointlistData = [];
        var viewData = [];
        res.data.data.map((val, index) => {
          console.log(val, "valeded");
          appointlistData.push({
            name: val.CustomerName,
            category: val.training_category,
            package: val.trcr_package_name,
            id: val.CustomerId,
          });

          viewData.push({
            name: val.CustomerName,
            age: val.age,
            fromDate: dateFormat(val.fromDate, "yyyy-mm-dd"),
            toDate: dateFormat(val.ToDate, "yyyy-mm-dd"),
            Date: dateFormat(val.Date, "yyyy-mm-dd"),
            profile_image: val.profile_image,
            packageName: val.trcr_package_name,
            seSSion: val.trcr_session,
            totalBilled: val.amount,
            Time: this.formatTimeShow(val.Time),
            id: val.CustomerId,
          });
        });

        this.setState(
          {
            appointlistData,
            viewData: viewData,
            enableSearch: false,
            tabledata: appointlistData,
            props_loading: false,
            spinner: false,
          },
          () =>
            console.log("appointment_tablecheck", this.state.appointlistData)
        );
      })
      .catch((error) => {
        // alert(JSON.stringify(error))
      });
  };

  Notification = () => {
    notification.info({
      message: "No Data Found",
      placement: "topRight",
    });
  };

  searchChange = (e) => {
    this.setState({
      search: e.target.value,
      enableSearch: true,
    });
    this.setState({});
  };

  render() {
    console.log("checki", this.props);
    const { Option } = Select;
    const { Search } = Input;
    console.log(dateFormat(new Date(), "dd mmm yyyy"));

    var multiDataSetbody = [];
    this.state.appointlistData.map((xldata, index) => {
      console.log(this.state.appointlistData, "xldata");
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" } } },
          { value: xldata.name },
          { value: xldata.category },
          { value: xldata.package },
        ]);
      } else {
        multiDataSetbody.push([
          {
            value: index + 1,
            style: {
              alignment: { horizontal: "center" },
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },

          {
            value: xldata.name,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },

          {
            value: xldata.category,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.package,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
        ]);
      }
    });

    const multiDataSet = [
      {
        columns: [
          {
            title: "S.No",
            width: { wpx: 35 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },

          {
            title: "Customer",
            width: { wch: 20 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Category",
            width: { wpx: 90 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Package",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
        ],
        data: multiDataSetbody,
      },
    ];

    const searchdata = this.state.appointlistData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) {
        return data;
      } else if (
        (data.name !== null &&
          data.name.toLowerCase().includes(this.state.search.toLowerCase())) ||
        (data.category !== null &&
          data.category
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.package.toString() !== null &&
          data.package
            .toString()
            .toLowerCase()
            .includes(this.state.search.toLowerCase()))
      ) {
        return data;
      }
    });

    return (
      <div className="appoint_dashboard">
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">
              <div>TOTAL APPOINTMENTS</div>
            </div>

            {/* <div className="doctorappoint_container"> */}

            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <div className="doc_appointment">
                <DateRangeSelect
                  dynalign={"dynalign"}
                  rangeDate={(item) => this.dayReport(item)}
                />
              </div>

              <Search
                placeholder=" search "
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
                className="mr-2 ml-2"
              />

              <div className="icon_head">
                {this.state.appointlistData.length === 0 ? (
                  <ReactSVG
                    onClick={this.Notification}
                    src={pdf}
                    style={{ marginRight: "15px", marginLeft: "15px" ,cursor:"pointer"}}
                  />
                ) : (
                  <ReactSVG
                    onClick={this.generatepdf}
                    src={pdf}
                    style={{ marginRight: "15px", marginLeft: "15px" ,cursor:"pointer" }}
                  />
                )}

                {this.state.appointlistData.length === 0 ? (
                  <ReactSVG
                    onClick={this.Notification}
                    src={excel}
                    style={{ marginRight: "15px"  ,cursor:"pointer"}}
                  />
                ) : ( 
                  <ExcelFile
                    filename={"Appointment List"}
                    element={
                      <ReactSVG src={excel} style={{ marginRight: "15px"  ,cursor:"pointer"}} />
                    }
                  >
                    <ExcelSheet
                      dataSet={multiDataSet}
                      name="Appointment List"
                    />
                  </ExcelFile>
                )}

                {this.state.appointlistData.length === 0 ? (
                  <ReactSVG src={print} onClick={this.Notification} style={{cursor:"pointer"}}/>
                ) : (
                  <ReactToPrint
                    trigger={() => <ReactSVG src={print} />}
                    content={() => this.componentRef}
                  />
                )}
                <div style={{ display: "none",cursor:"pointer" }}>
                  <PrintData
                    printTableData={this.state.appointlistData}
                    ref={(el) => (this.componentRef = el)}
                  />
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <Spin className="spinner_align" spinning={this.state.spinner}>

          <AppointmentsTable
            appointmentData={this.state.appointlistData}
            viewData={this.state.viewData}
            searchIng={searchdata.length === 0 ? [] : searchdata}
            enableSearch={this.state.enableSearch}
            tableData={this.state.tabledata}
            props_loading={this.state.props_loading}
          />

          </Spin>
        </Paper>
      </div>
    );
  }
}

export default AppointmentsDashboard;

