import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./CancelledTable.css";
import axios from "axios";
import dateFormat from "dateformat";
import moment from "react-moment";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import { apiurl } from "../../App";
import dateformat from "dateformat";
import { Input, Select, Icon } from "antd";
import { Spin, notification } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactToPrint from "react-to-print";
import ReactExport from "react-data-export";
import PrintData from "./printdata";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactSVG from "react-svg";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class CancelledTable extends React.Component {
  state = {
    openview: false,
    tabledata: [],
    search: null,
    // props_loading:true,
    wk_Mn_Yr_Full_Data: [],
    spinner: false,
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  componentDidMount() {
    // this.GetApiFunction();
    this.dayReport(
      [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ],
      true
    );
  }

  dayReport = (data) => {
    function formatTimeShow(h_24) {
      var h = Number(h_24.substring(0, 2)) % 12;
      if (h === 0) h = 12;
      return (
        (h < 10 ? "0" : "") +
        h +
        ":" +
        h_24.substring(3, 5) +
        (Number(h_24.substring(0, 2)) < 12 ? " AM" : " PM")
      );
    }
    this.setState({
      props_loading: true,
    });

    console.log(data, "itemdaterange");
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd");
    var enddate = dateformat(data[0].endDate, "yyyy-mm-dd");
    this.setState({ spinner: true });
    var self = this;
    axios({
      method: "POST",
      url: apiurl + "TrainingCenter/gettccancelledappointment",
      data: {
        tcvendorId: "11",
        fromDate: startdate,
        toDate: enddate,
        period: "Day",
      },
    })
      .then((response) => {
        console.log(response, "resres");
        var tabledata = [];
        var tableDatafull = [];
        response.data.data.map((val) => {
          console.log(val, "res");
          tabledata.push({
            CustomerName: val.CustomerName,
            Packagename: val.trcr_package_name,
            Session: val.trcr_session,
            CancelDate: dateFormat(val.CancelDate, "dd mmm yyyy"),
            Time: formatTimeShow(val.CancelTime),
            id: val.Hc_packageId,
          });
          tableDatafull.push(val);
        });

        this.setState({
          tabledata: tabledata,
          wk_Mn_Yr_Full_Data: tableDatafull,
          props_loading: false,
          spinner: false,
        });

        console.log(this.state.wk_Mn_Yr_Full_Data, "datattat");
      })
      .catch((error) => {
        // alert(JSON.stringify(error))
      });
  };

  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };

  generatepdf = () => {
    if (this.state.tabledata.length === 0) {
      notification.info({
        description: "No Data Found",
        placement: "topRight",
      });
    } else {
      const doc = new jsPDF("a4");
      var bodydata = [];
      this.state.tabledata.map((data, index) => {
        bodydata.push([
          index + 1,
          data.CustomerName,
          data.Packagename,
          data.Session,
          data.CancelDate,
          data.Time,
        ]);
      });
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Cancelled Appointments", 15, 23);
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [
          [
            "S.No",
            "Customer",
            "Package Name",
            "Session",
            "Cancelled Date",
            "Time",
          ],
        ],
        body: bodydata,
      });

      doc.save("Cancelled Appointments.pdf");
    }
  };

  Notification = () => {
    notification.info({
      description: "No Data Found",
      placement: "topRight",
    });
  };

  render() {
    const { Option } = Select;
    const { Search } = Input;
    var multiDataSetbody = [];
    this.state.tabledata.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" } } },
          { value: xldata.CustomerName },
          { value: xldata.Packagename },
          { value: xldata.Session },
          { value: xldata.CancelDate },
          { value: xldata.Time },
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
            value: xldata.CustomerName,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.Packagename,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.Session,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.CancelDate,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.Time,
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
            title: "Package Name",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Session",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Cancelled Date",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Time",
            width: { wpx: 90 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
        ],
        data: multiDataSetbody,
      },
    ];
    var searchdata = [];
    this.state.tabledata.filter((data, index) => {
      console.log(data, "searck");
      if (this.state.search === undefined || this.state.search === null) {
        searchdata.push({
          customer: data.CustomerName,
          package: data.Packagename,
          session: data.Session,
          date: data.CancelDate,
          time: data.Time ? data.Time : "-",
          id: index,
        });
      } else if (
        (data.CustomerName !== null &&
          data.CustomerName.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.Packagename !== null &&
          data.Packagename.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.CancelDate !== null &&
          data.CancelDate.toLowerCase().includes(
            this.state.search.toLowerCase()
          )) ||
        (data.Time !== null &&
          data.Time.toLowerCase().includes(this.state.search.toLowerCase()))
      ) {
        searchdata.push({
          customer: data.CustomerName,
          package: data.Packagename,
          session: data.Session,
          date: data.CancelDate,
          time: data.Time ? data.Time : "-",
          id: index,
        });
      }
    });
    return (
      <div className="cancelled_histroy">
        <div className="dashboard_header">
          <div className="dashboard_title">CANCELLED APPOINTMENTS</div>
          <div
            style={{
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
           <DateRangeSelect openDateRange={this.state.openDateRange} DateRange={()=>this.setState({openDateRange:!this.state.openDateRange})} 
           dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
    

            <Search
              placeholder="Search"
              onSearch={(value) => console.log(value)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
              onChange={(e) => this.searchChange(e)}
            />

            <div className="icon_head">
              <ReactSVG
                onClick={this.generatepdf}
                src={pdf}
                style={{ marginRight: "15px", marginLeft: "15px",cursor:"pointer" }}
              />
              {this.state.tabledata.length === 0 ? (
                <ReactSVG
                  onClick={this.Notification}
                  src={excel}
                  style={{ marginRight: "15px",cursor:"pointer" }}
                />
              ) : (
                <ExcelFile
                  filename={"Cancelled Appointments"}
                  element={
                    <ReactSVG src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />
                  }
                >
                  <ExcelSheet dataSet={multiDataSet} name="Cancelled Appointments" />
                </ExcelFile>
              )}

              {this.state.tabledata.length === 0 ? (
                <ReactSVG src={print} onClick={this.Notification} style ={{cursor:"pointer"}}/>
              ) : (
                <ReactToPrint
                  trigger={() => <ReactSVG src={print} />}
                  content={() => this.componentRef}
                />
              )}
              <div style={{ display: "none" ,cursor:"pointer" }} >
                <PrintData
                  printTableData={this.state.tabledata}
                  ref={(el) => (this.componentRef = el)}
                />
              </div>
            </div>
          </div>
        </div>
        <Spin className="spinner_align" spinning={this.state.spinner}>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "customer", label: "Customer" },
              { id: "package", label: "Package Name" },
              { id: "session", label: "Session" },
              { id: "date", label: "Cancelled Date" },
              { id: "time", label: "Time" },
            ]}v
            rowdata={searchdata.length === 0 ? [] : searchdata}
            tableicon_align={"cell_eye"}
            VisibilityIcon="close"
            DeleteIcon="close"
            EditIcon="close"
            UploadIcon="close"
            GrandTotal="close"
            Workflow="close"
            props_loading={this.state.props_loading}
            modelopen={(e) => this.modelopen(e)}
          />
        </Spin>
        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default CancelledTable;
