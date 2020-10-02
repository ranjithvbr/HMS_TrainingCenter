import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import avatar from '../../Images/avatar.jpg'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './ProfileLogout.css';
// import Profilepage from "../LabProfile/Profilepage";

export default class ProfileLogout extends React.Component{
 constructor(props)
 {
     super(props)
     this.state={logout:false}
 }
 logoutOpen=()=>{
    this.setState({logout:true})
    
  }
  logoutClose=()=>
  {
    this.props.onClose(false);
  }
  viewmodalOpen = () => {
    this.setState({ viewmodal: true });
  };

  logoutClick = () => {
    window.localStorage.clear();
    window.location.assign('/?/trainingcenter')
    this.props.onClose()
  }
 render()
 {
  const { classes, theme, children } = this.props;
     return(
         <div>
             <div className="avatar_div"><Paper className="avatar_container">
             <div  className="profile_logout_container">
               <img className="profile_logout_image" src={avatar}  />
             </div>
             {this.state.logout === true && (
                  <div>
                    <ProfileLogout
                      open={this.state.logout}
                      onClose={this.logoutClose}
                    />
                  </div>
                )}
             <div className="profile_logout_container"><div>
               <h6 className="name_head" onClick={this.viewmodalOpen}>Abdul Rahman</h6>
             <p className = "profile_name"onClick={this.viewmodalOpen}>Abdul@gmail.com</p>
             </div>
            
             </div>
             <Divider/>
             <div className="profile_logout_butt"><p className = "profile_name"onClick={this.viewmodalOpen}>Profile</p>
                <Button className="logout_butt"  onClick={this.logoutClick}>Logout</Button>
             </div>
             <Divider/>
             <div className="profile_logout_privacy "><p>Privacy Policy Terms of Service</p></div>
           </Paper>
           </div>
           <div>
              {children}
                {/* <Profilepage
                  open={this.state.viewmodal}
                  onClose={this.viewmodalClose}
                /> */}
            </div>
         </div>
     )
 }
}