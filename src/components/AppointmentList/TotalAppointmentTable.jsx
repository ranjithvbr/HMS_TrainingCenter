import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./TotalAppointmentTable.css";
import './TotalAppointmentDashboard.css';
import crowngold from "../../Images/crown-golden.png";
import dateformat from "dateformat";
import ProfileView from "./ProfileView";
import Axios from "axios";
import { Select,notification,Input } from "antd";
import pdf from '../../Images/pdf.svg'
import excel from '../../Images/excel.svg'
import print from '../../Images/print.svg'
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import jsPDF from 'jspdf';
import ReactSVG from "react-svg";
import 'jspdf-autotable';
import ReactExport from 'react-data-export';
import { MdFormatListBulleted } from "react-icons/md";
import PrintData from "./printdata";
import ReactToPrint from "react-to-print";
import {Spin} from 'antd';
import { apiurl } from "../../App";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class DashboardTable extends React.Component {
  state = {
     openview: false,
    viewdata:[],
    Search:null,
    wk_mh_yr_Data:[],
    totalData:"",
    spinner:false,    
    dateRangeOpen:false,
    openDateRange:false,
    props_loading:true
  };

  modelopen = (data,id) => {
    if (data === "view") {   
      this.setState({
         openview: true,
        viewdata:this.state.totalData[id]
         });   
    } 
  
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };


// SEARCH FUNCTION 
    SearchData=(e)=>{
      this.setState({
        Search:e.target.value
      })
      this.setState({})
      console.log(this.state.Search,"ddd")
    }

 // pdf function
  generatepdf=()=>{
    if(this.state.wk_mh_yr_Data.length===0){
      notification.info({
        description:
          'No Data Found',
          placement:"topRight",
      });
    }
    else{
      const doc = new jsPDF("a3")
      var bodydata  = []
      this.state.wk_mh_yr_Data.map((data,index)=>{
        console.log(data,"dataaa")
        bodydata.push([index+1,data.customer,data.category,data.from_date,data.to_date,data.total_days])
      })
      doc.autoTable({
        beforePageContent: function(data) {
          doc.text("Appointment List", 15, 23); // 15,13 for css
          },
        margin: { top: 30 },
        showHead:"everyPage",
        theme:"grid",
        head: [['S.No', 'Customer', 'Category','Package']],
        body:bodydata,
      })
      doc.save('Appointment List.pdf')
    }
  }
      // PRINT FUNCTION
      generateprint=()=>{
        this.setState({
          printComOpen:true
        })
      }
    // API FUNC
    componentDidMount=()=>{
      this.GetApiFunction()
    }
    GetApiFunction=()=>{
      var tabledata=[];
      Axios({
   
          method: 'POST',
          url: apiurl + "TrainingCenter/gettrainingcenterappointmentlist",
          data:{
            "tcvendorId":"11",
            "fromDate":dateformat(new Date(), "yyyy-mm-dd"),
            "toDate":dateformat(new Date(), "yyyy-mm-dd"),
            "period":"Day"
          }
      })
    .then((response) => {
      console.log(response,"ressss")
      var wk_mh_yr_Data =[]
      console.log(response.data.data,"response_chk")
      response.data.data.length > 0 && 
      response.data.data.map((val,index)=>{
        console.log(val,"table_data_chk")
        wk_mh_yr_Data.push({customer:val.CustomerName,category:val.training_category,from_date:val.trcr_package_name,
          id:index})
      })
        this.setState({
          wk_mh_yr_Data:wk_mh_yr_Data,
          totalData:response.data.data,
          props_loading:false,
          // spinner:false
        })
    })
    }

    // DATE RANGE PICKER FUNCTION
    dayReport=(data)=>{
      function formatTimeShow(h_24) {
        
        var h = Number(h_24.substring(0, 2)) % 12;
        if (h === 0) h = 12;
        return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
    }
      console.log(data,"itemdaterange")
      console.log(data,"data_test")
        var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
        var enddate = dateformat(data[0].endDate,"yyyy-mm-dd")
      this.setState({ spinner: true })
      var self = this
      Axios({
        method: 'POST',
        url: apiurl + "TrainingCenter/gettrainingcenterappointmentlist",
        data:{
          tcvendorId: "11",
          fromDate: startdate,
          toDate: enddate,
          period: "Day",
        }
      })
      .then((response) => {
        console.log(response,"dauuuuuuuuuuu")
       
        var tabledata = [];
        var tableDatafull = [];
        var  wk_mh_yr_Data=[]
        response.data.data.length > 0 && 
        response.data.data.map((val,index) =>{
          console.log(val,"text_valdata")
          wk_mh_yr_Data.push({customer:val.CustomerName,category:val.training_category,from_date:val.trcr_package_name,
            id:index})
               tableDatafull.push(val)
          })
          this.setState({
            wk_mh_yr_Data,
            totalData:response.data.data, 
            props_loading:false,
            spinner:false,
        })
        console.log(this.state.wk_Mn_Yr_Full_Data,"datattat")
    }
    )}
  
  render() {
    const { Option } = Select;

    //SERACH FUNCTION
    const { Search } = Input;
      // SEARCH DATA 
      const TotalBookSearch = this.state.wk_mh_yr_Data.filter((data)=>{
        console.log(data,"Search_data")
         if(this.state.Search=== null)
           return data
  
          else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.Search.toLowerCase())
          || (data.category != null && data.category.toLowerCase().includes(this.state.Search.toLowerCase()))
          || (data.to_date != null && data.to_date.toLowerCase().includes(this.state.Search.toLowerCase()))
          || (data.from_date != null && data.from_date.toLowerCase().includes(this.state.Search.toLowerCase()))
          || (data.total_days != null && data.total_days.toString().includes(this.state.Search.toString()))
          ) {
            return data
        }   
      })

    //EXCEL FUNCTION

    var multiDataSetbody = []
    this.state.wk_mh_yr_Data.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.customer},
        {value:xldata.category},
        {value:xldata.from_date},
      ])
      }
      else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.category,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.from_date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
       ])
      }
    })

    const multiDataSet = [
      {
          columns: [
              {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
              {title: "Category", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Package",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <div>
      <div className="media_service_head">
         <div className="appointment_titleuser">Appointment List</div>
         <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
         <Spin className="spinner_align" spinning={this.state.spinner}>
           <DateRangeSelect openDateRange={this.state.openDateRange} DateRange={()=>this.setState({openDateRange:!this.state.openDateRange})} 
           dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
           </Spin>
               <Search
                 placeholder="search "
                 onSearch={value => console.log(value)}
                 onChange ={(e)=>this.SearchData(e)}
                 style={{ width: 150 }}
                 className="search_box_container"
                 />
                 <div className="icon_head">
                   <ReactSVG
                     onClick={this.generatepdf}
                     src={pdf}
                     style={{ marginRight: "15px", marginLeft: "15px",cursor:"pointer" }}
                   />
                 {this.state.wk_mh_yr_Data.length === 0 ?
                 <ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />:
                   <ExcelFile filename={"TodayAppointments"} element={<ReactSVG src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />}>
                     <ExcelSheet dataSet={multiDataSet} name="Appoinment Details" />
                   </ExcelFile>
                   }

                   {this.state.wk_mh_yr_Data.length === 0 ?
                   <ReactSVG  onClick={this.Notification} src={print} style={{ marginRight: "15px",cursor:"pointer" }} />:
                   <ReactToPrint
                     trigger={() => <ReactSVG src={print} style ={{cursor:"pointer"}} />}
                     content={() => this.componentRef}
                     
                   />
                 }
                   <div style={{ display: "none" }}><PrintData printTableData={this.state.wk_mh_yr_Data} ref={el => (this.componentRef = el)} /></div>
                 </div>
         </div>

       </div>
      
     <Tablecomponent
       heading={[
         { id: "", label: "S.No" },
         // { id: "type", label: "Type" },
         { id: "customer", label: "Customer" },
         { id: "category", label: "Category" },
         { id: "from_date", label: "Package" },
         { id: "", label: "Action" },
       ]}
       // rowdata={this.props.wk_mh_yr_Data && this.props.wk_mh_yr_Data}
       rowdata={TotalBookSearch.length ===  0 ? []:TotalBookSearch }
       tableicon_align={"cell_eye"}
       modelopen={(e,id )=> this.modelopen(e,id)}
       EditIcon="close"
       DeleteIcon="close"
       Workflow="close"
       props_loading = {this.state.props_loading}
      
     />
{/* 
     <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
     xswidth={"xs"}  > */}
           <ProfileView open={this.state.openview} onClose={this.closemodal} viewdata={this.state.viewdata} />
     {/* </Modalcomp>
  */}

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
export default DashboardTable;

