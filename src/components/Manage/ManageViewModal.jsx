import React from "react";
import "./ManageViewModal.css";
import Grid from '@material-ui/core/Grid';
import dateformat from 'dateformat';
class ManageViewModal extends React.Component {
  render() {
    console.log(this.props.ViewData,"viewdata")
    var ViewData=this.props.ViewData
    return (
      <React.Fragment>
        <div className="border_dotted"></div>
        <Grid container className="mt-3">
        <Grid item xs={7} md={7}className="modal_view">
          <div className="modal_font">
            <div className="pac_list"><label className="tra_pac">Training Category</label><label className="pac_value">{ViewData.training_category}</label></div>
            <div className="pac_list"><label className="tra_pac">Training</label> <label className="pac_value">{ViewData.training}</label></div>
            <div className="pac_list"><label className="tra_pac">Package</label><label className="pac_value">{ViewData.trcr_package_name}</label></div>
            <div className="pac_list"><label className="tra_pac">From Date</label><label className="pac_value">{ViewData.trcr_package_from===null?"-":dateformat(ViewData.trcr_package_from,"dd mmm yyyy")}</label></div>
            <div className="pac_list"><label className="tra_pac">To Date</label><label className="pac_value">{ViewData.trcr_package_to===null?"-":dateformat(ViewData.trcr_package_to,"dd mmm yyyy")}</label></div>
            <div className="pac_list"><label className="tra_pac">Session</label><label className="pac_value">{ViewData.trcr_session}</label></div>
            <div className="pac_list"><label className="tra_pac">Cost(KWD)</label><label className="pac_value">{ViewData.trcr_cost}</label></div>
          </div>
          </Grid>
          <Grid item xs={5} md={5}>
         
          <div className="session_border">
            <p className="session_color mt-2 ml-1">{ViewData.trcr_session +" Session"}</p>
            <div><p className="active_c mt-2 ml-1">{ViewData.is_active === 0 ? "Inactive" : "Active"}</p></div>
          </div>
         
          </Grid>
        <div className="border_dotted mt-4 w-100 para_font"></div>
        <div className="para_font mt-2">
          {ViewData.trcr_package_details}
        </div>
        </Grid>
      </React.Fragment>
    );
  }
}
export default ManageViewModal;
