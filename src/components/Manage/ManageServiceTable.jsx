import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./ManageServiceTable.css";
import dateFormat from "dateformat";
import ManageServiceModal from "./ManageServiceModal";
import ManageViewModal from "./ManageViewModal";
import Axios from 'axios';
import plus from "../../Images/plus.png";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Input,notification } from "antd";
import DeleteMedia from '../../helpers/ModalComp/deleteModal' 
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import Moment from "react-moment";
import {Spin} from 'antd'
const current_date = dateFormat(new Date(), "dd mmm yyyy");
const apiurl="http://52.200.251.222:8158/api/v1/"
class ManageServiceTable extends React.Component {
  state = {
    TableData:[],
    openview: false, open: true,
    tableData: [],
    searchValue: '',
    insertOpen: false,
    deleteopen: false,
    loading: true,
    props_loading: true,
    deleteid:"",
    EditData:"",
    id:""
  };
  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);
    var returnobj = {};
    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };
  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ openview: true,
        EditData:this.state.TotalData.find(val=>val.trainingCenterPackageId===id)  
      });
    } else if (data === "edit") {
      this.setState({ editopen: true,UpdateId:id,
        EditData:this.state.TotalData.find(val=>val.trainingCenterPackageId===id)
      });
      // if(new Date (data.trcr_package_from) < new Date() && new Date (data.trcr_package_to) < new Date() ){
      //   notification.info({
      //       description:
      //         'Package expired',
      //         placement:"topRight",
      //     });
      //   }
    }
  };
  componentDidMount(){
    this.GetTableData()
  }
GetTableData=(record_deleteMsg)=>{
  this.setState({loading:true})
  var self=this
  Axios({
    method:"post",
    url:apiurl + "/getTrainingCenterManagePackage",
    data:{
      "trainingCenterId":"11"
    },
  }).then((response)=>{
    var TableData=[]
    console.log("getdata",response)
    if(record_deleteMsg){
      notification.info({
        message:
          'Package ' + record_deleteMsg + ' successfully',
          placement:"topRight",
      });
    }
    response.data.data.map((val,index)=>{
        TableData.push({category:val.training_category,package:val.trcr_package_name,session:val.trcr_session,cost:val.trcr_cost,id:val.trainingCenterPackageId})
    })
    self.setState({
      TableData,
      TotalData:response.data.data,
      props_loading:false,
      loading:false,
      id:response.data.data[0].trainingCenterPackageId
    })
  })
}
deleteopen = (type, id) => {
  this.setState({
      deleteopen: true,
      iddata: id,
      deleteid:id
  })
}
deleterow = (data) => {
  // this.setState({ loading: true })
  var self = this
  Axios({
      method: 'post',
      url: apiurl + '/deleteTrainingCenterPackage',
      data: {
        "trainingCenterPackageId": this.state.iddata,
      }
  })
      .then(function (response) {
          console.log(response, "deleteres")
          if (response.data.status === 0) {
            notification.warning({
              message:response.data.msg,
              placement: "topRight",
            });
            self.GetTableData()
          } 
          else {
            notification.warning({
              message:response.data.msg,  
              placement: "topRight",
            });
            self.GetTableData()
          }
          // self.GetTableData("deleted")
      })
      .catch(function (error) {
          console.log(error, "error");
      });
  this.setState({
      Deletemodalopen: false
  })
  this.setState({ props_loading: false })
}
insertModalOpen = () => {
  this.setState({
      insertOpen: true
  })
}
closemodal = () => {
  this.setState({ openview: false, insertOpen: false, editopen: false, Deletemodalopen: false, deleteopen: false })
}
searchData = (e) => {
  this.setState({
    searchData: e.target.value,
    search:this.state.searchData
  })
}
rangedataFun=(date)=>{
  this.setState({
    rangedate:date,
    dateRangeOpen:false,
  })
}
  render() {
    const { Search } = Input;
   var searchdata=[]
    this.state.TableData.filter((data,index) => {
      console.log(data,"divya")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({
          category: data.category,
          package:data.package,
          session:data.session,
          cost:data.cost,
          id: data.id
          })
      }
      else if (data.category !== null && data.category.toLowerCase().includes(this.state.search.toLowerCase()) || data.cost !== null && data.cost.toString().toLowerCase().includes(this.state.search.toLowerCase()) || data.package !== null && data.package.toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          category: data.category,
          package:data.package,
          session:data.session,
          cost:data.cost,
          id: data.id
        })
      }
  })
    return (
      <div>
      <div className="hms_trainer_header">
            <div className="titleuser">
              <div>MANAGE PACKAGE</div>
            </div>
            {/* SEARCH AREA */}
            <div className="manage_package_container">
                <Search
                  placeholder=" Search "
                  onSearch={value => console.log(value)}
                  onChange={(e)=>this.setState({search:e.target.value})}
                  style={{ width: 150 }}
                  className="mr-2 ml-2"
                />
                <div className="plus_icon_parent">
                  <img
                    className="managepackage_plusicon"
                    src={plus}
                    onClick={this.insertModalOpen}
                  />
                </div>
            </div>
          </div>
      <div>
      <Spin className="spinner_align" spinning={this.state.loading}>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "category", label: " Category" },
            { id: "package", label: "Package" },
            { id: "session", label: "Session " },
            { id: "cost", label: "Cost (KWD)" },
            { id: "", label: "Action" },
          ]}
          rowdata={searchdata}
          tableicon_align={""}
          Workflow="close"
          modelopen={(e,id) => this.modelopen(e,id)}
          deleteopen={this.deleteopen}
          props_loading={this.state.props_loading}
        />
   </Spin>
                  <Modalcomp clrchange="text_color" visible={this.state.insertOpen ? this.state.insertOpen : this.state.editopen} title={this.state.insertOpen === true ? "ADD PACKAGE" : "EDIT PACKAGE"} closemodal={(e) => this.closemodal(e)}
                        xswidth={"md"} clrchange="text_clr_change"
                    >
                        <ManageServiceModal
                            btnProps={this.state.insertOpen}
                            GetTableData={this.GetTableData}
                            EditData={this.state.EditData}
                            UpdateId={this.state.UpdateId}
                            closemodal={this.closemodal}
                            TotalData={this.state.TotalData}
                            deleterow={this.deleterow}
                            // iddata={this.state.deleteid}
                            editOpenModal={this.state.editopen && true}
                        />
                    </Modalcomp>
                    <Modalcomp visible={this.state.deleteopen} title={"DELETE"} closemodal={this.closemodal} clrchange="text_clr_change"  customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                        <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal} />
                    </Modalcomp>
                    <Modalcomp visible={this.state.openview} title={"PACKAGE DETAILS"} closemodal={this.closemodal} clrchange="text_clr_change" customwidth_dialog="cus_wid_delmodel" xswidth={"xs"}>
                        <ManageViewModal  ViewData={this.state.EditData} closemodal={this.closemodal} />
                    </Modalcomp>
      </div>
      </div>
);
  }
}
export default ManageServiceTable;