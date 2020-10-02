import React, { Component } from "react";
import "./RevenueMaster.css";
import "antd/dist/antd.css";
import "./Revenuedetails.css";
import { Input, notification } from "antd";

import Paper from '@material-ui/core/Paper';
import Pdf from '../../Images/pdf.svg';
import Print from '../../Images/print.svg';
import Excel from '../../Images/excel.svg';

import Tablecomponent from "../../helpers/TableComponent/TableComp";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { apiurl } from "../../App";
import dateFormat from 'dateformat';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class RevenueMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props_loading: true,
      tableData: [],
      revenueTotal: 0,
      search: null,
      fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
      toDate: dateFormat(new Date(), "yyyy-mm-dd")
    };
  }

  componentDidMount() {
    this.getRevenueData()
  }


  getRevenueData = () => {
    this.setState({
      props_loading: true,
    })
    axios({
      method: 'POST',
      url: apiurl + 'getTrcrRevenue',
      data: {
        "trcr_id": "11",
        "revenue_from": this.state.fromDate,
        "revenue_to": this.state.toDate,
      }
    }).then((response) => {
      console.log(response.data.data.result, "res")
      var tableData = [];
      response.data.data.result.map((val) => {
        console.log("sdfkshdfgsdhs", val)
        tableData.push({
          customer: val.patient_name,
          category: val.category,
          package: val.package,
          bookedDate: dateFormat(val.book_date,"dd-mm-yyyy"),
          cost: val.cost,
          cash: val.card.toFixed(2),
          card: val.insurance,
          wallet: val.wallet,
          totalCharge: val.total_charge,
          id: val.booking_id
        })
      })
      var totalAmount = 0
      for (var i in response.data.data.result) {
        totalAmount = response.data.data.result[i].total_charge + totalAmount
      }
      this.setState({
        props_loading: false,
        tableData: tableData,
        enableSearch: false,
        revenueTotal: totalAmount
      })
      this.setState({})

    }).catch((error) => {
    })
  }

  getRangeDate = (item) => {
    console.log(item, "checking Date")
    this.setState({
      fromDate: dateFormat(item[0].startDate, "yyyy-mm-dd"),
      toDate: dateFormat(item[0].endDate, "yyyy-mm-dd")
    }, () => this.getRevenueData())
  }


  // PDF FUNCTION
  generatepdf = () => {
    if (this.state.tableData.length === 0) {
      notification.info({
        description:
          'No Data Found',
        placement: "topRight",
      });
    }
    else {
      const doc = new jsPDF("a3")
      var bodydata = []
      this.state.tableData.map((data, index) => {
        bodydata.push([index + 1, data.customer, data.category, data.package, data.bookedDate, data.cost, data.cash,
        data.card,
        data.wallet,
        data.totalCharge
        ])
      })
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Revenue Details", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [['S.No', 'Customer', 'Category', 'Package', 'Booked Date', 'Cost', 'Cash', 'Card', 'Wallet', 'Total Charge']],
        body: bodydata,
      })

      doc.save('Revenue_Details.pdf')
    }
  }

  searchChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.setState({})
  }
  render() {
    const { Search } = Input;
    var searchData = [];
    searchData = this.state.tableData.filter((data) => {
      console.log(data, "Search_data")
      if (this.state.search === null)
        return data
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.category != null && data.category.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.package != null && data.package.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.bookedDate != null && data.bookedDate.toString().includes(this.state.search.toString()))
        || (data.cost != null && data.cost.toString().includes(this.state.search.toString()))
        || (data.cash != null && data.cash.toString().includes(this.state.search.toString()))
        || (data.card != null && data.card.toString().includes(this.state.search.toString()))
        || (data.wallet != null && data.wallet.toString().includes(this.state.search.toString()))
        || (data.totalCharge != null && data.totalCharge.toString().includes(this.state.search.toString()))

      ) {
        return data
      }
    })

    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.customer },
        { value: xldata.category },
        { value: xldata.package },
        { value: xldata.bookedDate },
        { value: xldata.cost },
        { value: xldata.cash },
        { value: xldata.card },
        { value: xldata.wallet },
        { value: xldata.totalCharge, style: { alignment: { horizontal: "center" } } }])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.category, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.package, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.bookedDate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.cost, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.cash, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.card, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.wallet, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.totalCharge, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Category", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Package", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Booked Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cost", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cash", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Card", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Wallet", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Total Charge", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },

        ],
        data: multiDataSetbody
      }
    ];
    return (
      <div className="revenue_dash">
        <Paper>
          <div className="dashboard_header">
            <div className="dashboard_title">REVENUE</div>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)} />
              <Search
                placeholder="Search"
                onChange={(e) => this.searchChange(e)}
                style={{ width: 150 }}
                className="mr-2 ml-2"
              />
              <ReactSVG
                onClick={this.generatepdf}
                src={Pdf}
                style={{ marginRight: "15px", marginLeft: "15px" }}
              />
              {this.state.tableData.length === 0 ? <ReactSVG onClick={this.Notification} src={Excel} style={{ marginRight: "15px" }} /> :
                <ExcelFile element={<ReactSVG src={Excel} style={{ marginRight: "15px" }} />}>
                  <ExcelSheet dataSet={multiDataSet} name="Uploaded Details" />
                </ExcelFile>}

              {this.state.tableData.length === 0 ?
                <ReactSVG src={Print} onClick={this.Notification} /> :
                <ReactToPrint
                  trigger={() => <ReactSVG src={Print} />}
                  content={() => this.componentRef}
                />}
              <div style={{ display: "none" }}><PrintData printTableData={this.state.tableData} ref={el => (this.componentRef = el)} /></div>
            </div>
          </div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "customer", label: "Customer" },
              { id: "category", label: "Category" },
              { id: "package", label: "Package" },
              { id: "bookedDate", label: "Booked Date" },
              { id: "cost", label: "Cost" },
              { id: "cash", label: "Cash" },
              { id: "card", label: "Card" },
              { id: "wallet", label: "Wallet" },
              { id: "charge", label: "Total Charge (KWD)" },
            ]}
            rowdata={searchData}
            tableicon_align={""}
            modelopen={(e) => this.modelopen(e)}
            actionclose="close"
            props_loading={this.state.props_loading}
            modeprop
          />
          <div className="revenueTotal">
            <span>Grand Total : {`${this.state.revenueTotal}`} KWD</span>
          </div>
        </Paper>
      </div>
    );
  }
}

export default RevenueMaster;
