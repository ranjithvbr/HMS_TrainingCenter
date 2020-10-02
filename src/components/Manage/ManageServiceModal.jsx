import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import "./ManageServiceModal.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Dropdown,Checkbox,message } from "antd";
import { Tag,notification } from "antd";
import Card from "@material-ui/core/Card";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Axios from 'axios'
import axios from 'axios'
import {apiurl} from '../../App'
import dateformat from 'dateformat';
// import {apiurl} from '../../App'
import Divider from '@material-ui/core/Divider';
import ValidationLibrary from '../../helpers/ValidationLibrary/validationfunction';
const apiurl_Tr="http://52.200.251.222:8158/api/v1/trainingCenter"
var startdate = dateformat(new Date(), "yyyy-mm-dd")

var enddate = dateformat(new Date(), "yyyy-mm-dd")
export default class ManageServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: null,
      Category:'',
      Training:null,
      InsertData:'',
      onchangeid:false,
      id:"",
      categoryFullres:[],
      categoryid:"",
      AddData:false,
      Package:[],
      store:[],
      Active:false,
      reshedule:false,
      dateRange:false,
      from_date:startdate,
      to_date:enddate,
      minDate:startdate,
      date_change:false,
      dateError:false,
      onchangereschedule_hide:true,
      PackageDetails:{
      'category': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
    },
    'training': {
      'value': '',
      validation: [{ 'name': 'required' }],
      error: null,
      errmsg: null
  },
    'package': {
    'value': '',
     validation: [{ 'name': 'required' }],
     error: null,
     errmsg: null
  },
   'session': {
    'value': '',
     validation: [{ 'name': 'required' },{'name':'allowNumaricOnly'},{"name":"custommaxLength","params":"2"}],
     error: null,
     errmsg: null
  },
  'cost': {
  'value': '',
   validation: [{ 'name': 'required' }],
   error: null,
   errmsg: null
  },
  'details': {
    'value': '',
     validation: [{ 'name': 'required' }],
     error: null,
     errmsg: null
    },
  }
    };
  }

  CategoryApi=()=>{    // for training category api
    var self=this
  axios({
      method: 'post',
      url:apiurl_Tr + '/getTrainingCategoryList', 
  }).then((response) => {
    console.log(response,"response")
    var category_Id=response.data.data.filter((data)=>{
      if(data.trainingCatId===this.state.PackageDetails.category.value){
        return data.trainingCatId
      }
    })
    self.setState({categoryFullres:response.data.data,
      Category:response.data.data,
    })
  })  
}
  ActiveCheck = (e) => {
    this.setState({
        Active: e.target.checked,

    })
}
Reshedule=(e)=>{
  this.setState({
    reshedule: e.target.checked
})
}
datepickerChange = (data, key) => {
  if (key === 'from_date') {
      this.setState({
          from_date: data,
          onchangereschedule_hide:false
      },() => this.compareDate())
  }
  if (key === 'to_date') {
      this.setState({
        to_date: data,
        onchangereschedule_hide:false
      },() => this.compareDate())
  }
}

compareDate = () => {
  console.log(this.state.from_date,"arjsirusiodfsdjfsak;dfj")
  if(dateformat(this.state.from_date,'mm-dd-yyyy') <= dateformat(this.state.to_date,'mm-dd-yyyy')) {
       this.setState({dateError:false})
  }else{
      this.setState({dateError:true})
  }
this.setState({
  // [key]:data,
dateRange:true
})
}

deleterow = (index) => {
alert(index)
  this.setState({ props_loading: true })
 
  var self = this
  Axios({
      method: 'post',
      url: apiurl + '/deleteTrainingCenterPackage',
      data: {
        "trainingCenterPackageId":index,
      }
  })
      .then(function (response) {
          console.log(response, "deleteres")
          this.props.GetTableData()
          this.deletecall(index)
      })
      .catch(function (error) {
          console.log(error, "error");
      });
  this.setState({
      Deletemodalopen: false
  })
  this.setState({ props_loading: false })


}

TrainingGetApi=(data)=>{    // training name get api
  // alert(data)
  var self=this
  axios({
      method: 'post',
      url:apiurl_Tr + '/getTrainingListTrainigCenterCategoryBased', 
      data:{
        "trainingCatId":data
      }
  }).then((response) => {
    console.log("training",response)
 
   this.setState({Training:response.data.data}) 
  
  })  
  
}
FormEmpty = () => {
  this.state.PackageDetails.package.value = ""
  this.state.PackageDetails.category.value = ""
  this.state.PackageDetails.training.value = ""
  this.state.PackageDetails.session.value=""
  this.state.PackageDetails.cost.value=""
  this.state.PackageDetails.details.value=""
  this.state.Active = false
  this.setState({})
}
deletecall=(data)=>
	{
   
		this.state.store.splice(data,1)
		this.setState({})
    var deletevalue=this.state.store
    console.log("del",deletevalue)
		var i
		for(i=0;i<deletevalue.length;i++)
		{
			if(deletevalue[i]===0)
			{
               deletevalue.splice(i,1)
			}
		}
       
	}
PackageInsertApi=(PackageApiData)=>{
  var self=this
  axios({
      method: 'post',
      url:apiurl_Tr + '/addTrainingCenterManagePackage', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data:{
      
       ...PackageApiData,
      }
  }).then((response) => {
   console.log(response,"insert")
  //  this.Notification("Package Inserted Successfully");
   this.props.GetTableData("inserted")
    this.state.store.push({
      "packageName":this.state.PackageDetails.package.value,
      "trainingCategoryId":this.state.PackageDetails.category.value,
      "trainerTrainingId":this.state.PackageDetails.training.value,
      "session":this.state.PackageDetails.session.value,
      "cost":this.state.PackageDetails.cost.value,
      "packageDetails":this.state.PackageDetails.details.value,
      "isActive":this.state.Active ==true?1:0,
      "packageFromDate":this.state.from_date,
      "packageToDate":this.state.to_date,
      "dateRange":this.state.dateRange&&this.state.dateRange,
      "trainingCenterId":"11",
      
    })
  self.setState({InsertData:response.data.data,
    AddData:true,
    // store:storevalue
  })
  this.FormEmpty()
  })  
  console.log(this.state.store,"dddd")
  // this.setState({store:storevalue})
}
Notification = (description) => {
 
  notification.info({
      message: 'Success',
      description,
      onClick: () => {
        console.log('Clicked!');
      },
    });
}
PackageUpdateApi=(UpdateApi)=>{
  // console.log(this.props.EditData[0].id,"edit")
  var self=this
  axios({
    method: 'post',
    url:apiurl_Tr + '/updateTrainingCenterManagePackage',
    data:{
        ...UpdateApi,
    }
}).then((response) => {
 console.log(response,"update")
//  this.Notification("Package Updated Successfully");
 this.props.GetTableData("updated")
//  self.setState({onchangeid:false})
})  
this.props.closemodal()

}

closemodal=()=>{
  this.props.closemodal() 
}

onSubmitData = (data) => {
 
  this.state.categoryFullres.map((val)=>{
    // if(val.)
  })
  var PackageApiData = {
    "packageList":[
      {
        "packageName":this.state.PackageDetails.package.value,
        "trainingCategoryId":this.state.PackageDetails.category.value,
        "trainerTrainingId":this.state.PackageDetails.training.value,
        "session":this.state.PackageDetails.session.value,
        "cost":this.state.PackageDetails.cost.value,
        "maxBooking":"10",
        "trainingMode":"1",
        "packageDetails":this.state.PackageDetails.details.value,
        "trainingCenterId":"11",
        "createdBy":"79",
        "isActive":this.state.Active ==true?1:0,
        "reschedule":this.state.reshedule===true?1:0,
			  "dateRange":this.state.dateRange&&this.state.dateRange,
		   	"packageFromDate":dateformat(this.state.from_date, "yyyy-mm-dd"),
		  	"packageToDate":dateformat(this.state.to_date, "yyyy-mm-dd")
      }
      ]
  }
  var category_Id=trainingCategoryId && trainingCategoryId.trainingCatId && trainingCategoryId.trainingCatId.filter((data)=>{
    if(data.trainingCatId===this.state.PackageDetails.category.value){
      return data.trainingCatId
    }
  })
  var training_Id=trainerTrainingId && trainerTrainingId[0].trainingId.filter((data)=>{
    if(data.trainingId===this.state.PackageDetails.training.value){
      return data.trainingId
    }
  })
  var trainingCategoryId = this.state.currentCatid

 var trainerTrainingId = this.state.currentTraid
 
  console.log("iddd",category_Id)
  

  var UpdateApi={
    "packageUpdateList":[
      
      {
       
        "trainingCenterPackageId":this.props.UpdateId,
        "packageName":this.state.PackageDetails.package.value,
        "trainingCategoryId":this.state.onchangeid===false?trainingCategoryId:this.state.PackageDetails.category.value,
        "trainerTrainingId":this.state.onchangeid===false?trainerTrainingId:this.state.PackageDetails.training.value,
        "session":this.state.PackageDetails.session.value,
        "cost":this.state.PackageDetails.cost.value,
        "maxBooking":"10",
        "trainingMode":"1",
        "packageDetails":this.state.PackageDetails.details.value,
        "trainingCenterId":"11",
        "updatedBy":"19",
        "isActive":this.state.Active ==true?1:0,
        "reschedule":this.state.reshedule===true?1:0,
			  "dateRange":this.state.dateRange&&this.state.dateRange,
		   	"packageFromDate":dateformat(this.state.from_date, "yyyy-mm-dd"),
		  	"packageToDate":dateformat(this.state.to_date, "yyyy-mm-dd")
        // this.state.assetsdata&&this.state.assetsdata[0].assetAllocId
        
      }
      ]
  }
  if(this.props.editOpenModal){
    this.PackageUpdateApi(UpdateApi)   // Update Api Call
   
  }else{
    this.PackageInsertApi(PackageApiData) // Insert Api Call

  }
 this.setState({})
}
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open = () => {
    this.setState({ view: true });
  };
  onclose = () => {
    this.setState({ view: false });
  };
  log = (e) => {
    console.log(e, "uyguy");
  };
  checkValidation = (data) => {
    var Package = this.state.PackageDetails;
    var PackageKeys = Object.keys(Package);
    console.log(PackageKeys);
    for (var i in PackageKeys) {
      var errorcheck = ValidationLibrary.checkValidation(Package[PackageKeys[i]].value, Package[PackageKeys[i]].validation);
      console.log(errorcheck);
      Package[PackageKeys[i]].error = !errorcheck.state;
      Package[PackageKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = PackageKeys.filter((obj) =>
    Package[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.onSubmitData()
   
    
    this.setState({ Package })
 
  }
}
  
  changeDynamic = (data, key) => {
    console.log(this.state.trainingid,"data")
     
    if(key==='category'){
      this.TrainingGetApi(data);
      // this.setState({categoryid:data});
    }    
    if(key==='training' || key==='category'){
      this.setState({
        trainingid:data,
        onchangeid:true
      });
      
    }
    // if(key=="training"){
    //   this.CategoryApi(data)
    // }
    var PackageDetails = this.state.PackageDetails;
    var errorcheck = ValidationLibrary.checkValidation(data, PackageDetails[key].validation);
    PackageDetails[key].value = data;
    PackageDetails[key].error = !errorcheck.state;
    PackageDetails[key].errmsg = errorcheck.msg;
    this.setState({ PackageDetails });   
     this.setState({[key]:data})
    
  //    if (key === "category") {
  //     var Data = [];
  //     this.state.Category.map(val => val.id > 1 && Data.push(val.id))
  //     console.log(this.state.Category, "myData")
  //     // this.setState({Category:Data})
     
  // }
   
//   if (key === "training") {
//     var Data = [];
//     this.state.Training.map(val => val.id > 1 && Data.push(val.id))
//     console.log(this.state.Training, "myData")
//     // this.setState({Category:Data})
   
// }
  this.setState({})
}
componentDidMount(){
  this.CategoryApi()
  this.TrainingGetApi()
   // Assigning Edit Data
   const { EditData,editOpenModal } = this.props;
   console.log("tabaledata",EditData)
  
  this.setState({
    currentCatid:EditData.trcr_tainingcategory_id,
    currentTraid:EditData.trcr_training_id 
  })

  console.log(EditData,"edit")
//   if(editOpenModal===true && new Date (EditData.trcr_package_from) < new Date() && new Date (EditData.trcr_package_to) < new Date())
//  {    
//     notification.warning({
//         message:
//           'Package expired',
//           // placement:"topRight",
//       });
    
//     }else
     if(editOpenModal===true){

        this.state.id=EditData.trainingCenterPackageId
        
       this.state.PackageDetails.category.value=EditData.training_category
       this.state.PackageDetails.training.value=EditData.training
       this.state.PackageDetails.package.value=EditData.trcr_package_name
       this.state.PackageDetails.session.value=EditData.trcr_session
       this.state.PackageDetails.cost.value=EditData.trcr_cost
       this.state.PackageDetails.details.value=EditData.trcr_package_details
       this.state.Active=EditData.is_active
       this.state.reshedule=EditData.trcr_reschedule
       this.state.from_date=EditData.trcr_package_from
       this.state.to_date=EditData.trcr_package_to
      }
    
 
}
  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
   this.state.id=this.props.EditData.trainingCenterPackageId
  var EditData=this.props.EditData
   console.log(this.state.PackageDetails.category.value,"categoryFullres")
   console.log(this.state.categoryFullres,"categoryFullres")
   var training=this.state.categoryFullres
   var category_Id= training && training.trainingCatId && training.trainingCatId.filter((data)=>{
    if(data.trainingCatId===this.state.PackageDetails.category.value){
      return (
        data.trainingCatName
      )
    }
  })
  console.log(category_Id,"divya_trry")
    return (
      <div className="manage_package">
        
         

                <Grid container spacing={3}>
                  <Grid item md={4} sm={4}>
                    <Labelbox
                      className="training_adjust "
                      labelname="Training Category"
                      type="select"
                      dropdown={this.state.Category}
                      valuelabel={'trainingCatName'}
                      valuebind={"trainingCatId"}
                      changeData={(data) => this.changeDynamic(data, 'category')}
                      value={this.state.PackageDetails.category.value}
                      error={this.state.PackageDetails.category.error}
                      errmsg={this.state.PackageDetails.category.errmsg}
                    />
                    </Grid>
                    <Grid item md={4} sm={4}>
                    <Labelbox
                      className="training_adjust "
                      labelname="Training"
                      type="select"
                      dropdown={this.state.Training}
                      valuelabel={"trainingName"}
                      valuebind={"trainingId"}
                      changeData={(data) => this.changeDynamic(data, 'training')}
                      value={this.state.PackageDetails.training.value}
                      error={this.state.PackageDetails.training.error}
                      errmsg={this.state.PackageDetails.training.errmsg}
                    />
                    </Grid>
                    <Grid className="package_nam" item md={4} sm={4}>
                    <Labelbox
                    className="training_adjust "
                    labelname="Package Name"
                    type="text"
                    changeData={(data) => this.changeDynamic(data, 'package')}
                    value={this.state.PackageDetails.package.value}
                    error={this.state.PackageDetails.package.error}
                    errmsg={this.state.PackageDetails.package.errmsg}
                  />
               
                   </Grid>
                   <Grid item md={2} sm={4}>
                   <Labelbox  type="datepicker" labelname="From Date" value={this.state.from_date}
                                            changeData={(date) => this.datepickerChange(date,'from_date')}
                                            minDate={this.state.minDate}
                                            />
                     <div className="validation__error">{this.state.startdateError && this.state.startdateError}</div>                        
                     </Grid>
                     <Grid item md={2} sm={4}>
                     <Labelbox  type="datepicker" labelname="To Date" 
                                            value={this.state.to_date}
                                            changeData={(date) => this.datepickerChange(date,'to_date')}
                                            minDate={this.state.minDate}
                                            />
                        <div className="validation__error--minus errmsg_clr">{this.state.dateError && "Enddate should be greater than startdate"}</div>                      
                     </Grid> 
                   <Grid item md={2} sm={4}>
                     
                      <Labelbox
                        className="training_adjust "
                        labelname="Session"
                        type="number"
                        changeData={(data) => this.changeDynamic(data, 'session')}
                        value={this.state.PackageDetails.session.value}
                        error={this.state.PackageDetails.session.error}
                        errmsg={this.state.PackageDetails.session.errmsg}
                      />
                    </Grid>
                    <Grid item md={2} sm={4}>
                    <Labelbox
                        className="training_adjust "
                        labelname="Cost (KWD)"
                        type="number"
                        changeData={(data) => this.changeDynamic(data, 'cost')}
                        value={this.state.PackageDetails.cost.value}
                        error={this.state.PackageDetails.cost.error}
                        errmsg={this.state.PackageDetails.cost.errmsg}
                      />
                    </Grid>
                    <Grid item md={2} sm={12}>
                      <div className="active_p">Active</div>
                      <div className="ative_check check_box"><Checkbox checked={this.state.Active} onChange={(e) => this.ActiveCheck(e)} /></div>
                    </Grid>
                    <Grid className="package_det" item md={12} sm={12}>
                    <Labelbox
                      className="training_adjust mt-4 "
                      labelname="Package Details"
                      type="textarea"
                      changeData={(data) => this.changeDynamic(data, 'details')}
                      value={this.state.PackageDetails.details.value}
                      error={this.state.PackageDetails.details.error}
                      errmsg={this.state.PackageDetails.details.errmsg}
                    />
                 </Grid>

                 { !this.props.btnProps && EditData.trcr_package_from===null && EditData.trcr_package_to===null?
                    <Grid style={{display:"flex"}} item md={12} sm={12}>
                    <div className="check_box"><Checkbox checked={this.state.reshedule} onChange={(e) => this.Reshedule(e)} /></div>

                      <div className="active_p">Reschedulable</div>
                    </Grid>:null}
                    
                    {/* {this.state.dateRange===false? */}
                    { this.props.btnProps && this.state.onchangereschedule_hide ?
                    <Grid style={{display:"flex"}} item md={12} sm={12}>
                    <div className="check_box"><Checkbox checked={this.state.reshedule} onChange={(e) => this.Reshedule(e)} /></div>

                      <div className="active_p">Reschedulable</div>
                    </Grid>:null}
                 
                <Grid  item md={12} sm={12} className="manage_pack_buttons button_container">
                <Button className="manageCancel" onClick={this.closemodal}>Cancel</Button>
                <Button
                  className="manageSubmit"
                  onClick={this.checkValidation}
                  
                >
                  {
                  this.props.btnProps ? "Submit" : "Update"
                }
                </Button>
                </Grid>
                </Grid>
{/*            
               {this.state.store.map((val,index) => {
                 return(
                         <div className="col-sm-4">
                         <Card className="mt-3 manage_card" variant="outlined">
                         <CloseIcon className="iconclose_adjust" onClick={()=>this.deletecall(this.state.deletevalue)}/>
                       
                               <Grid container spacing={2}>
                                 <Grid item xs={12} md={8}>
                                 
                                    <div className="pac_list"><label className="pre_tra_pac">Training Category</label><label className="pacage_value">{val.trainingCategoryId}</label></div>

            <div className="pac_list"><label className="pre_tra_pac">Training</label> <label className="pacage_value">{val.trainerTrainingId}</label></div>
            <div className="pac_list"><label className="pre_tra_pac">Package</label><label className="pacage_value">{val.packageName}</label></div>
            {val.dateRange===true?<div><div className="pac_list"><label className="pre_tra_pac">From Date</label><label className="pacage_value">{dateformat(val.packageFromDate,"dd mmm yyyy")}</label></div>
            <div className="pac_list"><label className="pre_tra_pac">To Date</label><label className="pacage_value">{dateformat(val.packageToDate,"dd mmm yyyy")}</label></div></div>:""}
            <div className="pac_list"><label className="pre_tra_pac">Session</label><label className="pacage_value">{val.session}</label></div>
            <div className="pac_list"><label className="pre_tra_pac">Cost(KWD)</label><label className="pacage_value">{val.cost}</label></div>
                                   </Grid> 
                                   <Grid item xs={12} md={4}>
                                   <div className="sessionmodal_border">
                                   <p className="sessionmodal_color mt-1 ml-1">
                                    {val.session} Session
                                    
                                   </p>
                                   <div className="active_c">{val.isActive===false ? "Inactive" : "Active"}</div>
                                 </div>
                                   </Grid>  
                               </Grid>
                     
                             <Divider className="dotted_line mt-2" />
                             <div  className="card_outdoor">{val.packageDetails}</div>
                            
                           
                          
                         </Card>
                        </div>
               )})} */}
            </div>
        
    );
  }
}

