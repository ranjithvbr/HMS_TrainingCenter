import React from 'react';
import 'antd/dist/antd.css';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox';
import Button from '@material-ui/core/Button';
import './BasicDetails.css';
import './ProfileModal.css';
import {notification} from 'antd';
import ValidationLibrary from '../../helpers/ValidationLibrary/validationfunction';
import axios from 'axios';
import { apiurl } from '../../App';

export default class BasicDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            basicDetails: {
                // 'name': {
                //     'value': '',
                //     validation: [{ 'name': 'required' }],
                //     error: null,
                //     errmsg: null
                // },
                'address': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'website': {
                    'value': '',
                    validation: [{ 'name': 'required' },{ 'name': 'webUrl' }],
                    error: null,
                    errmsg: null
                },
                'mobile_number': {
                    'value': '',
                    validation: [{ 'name': 'required' },{ 'name': 'mobile' }],
                    error: null,
                    errmsg: null
                },
                'contact_person': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },

                'email': {
                    'value': '',
                    validation: [{ 'name': 'required'},{ 'name': 'email' } ],
                    error: null,
                    errmsg: null
                }
            }
        }
    }

    componentDidMount() {
        this.setProfileData()
    }

    setProfileData = () => {
        this.state.basicDetails.address.value = this.props.ProfileData[0].vendor_address
        this.state.basicDetails.contact_person.value = this.props.ProfileData[0].vendor_contact
        this.state.basicDetails.mobile_number.value = this.props.ProfileData[0].vendor_contact_mobile
        this.state.basicDetails.email.value = this.props.ProfileData[0].vendor_contact_email
        this.state.basicDetails.website.value = this.props.ProfileData[0].vendor_website
        this.setState({})
    }

    checkValidation = () => {
        var basicDetails = this.state.basicDetails;
        var basicDetailsKeys = Object.keys(basicDetails);
        console.log(basicDetailsKeys);
        for (var i in basicDetailsKeys) {
            var errorcheck = ValidationLibrary.checkValidation(basicDetails[basicDetailsKeys[i]].value, basicDetails[basicDetailsKeys[i]].validation);
            console.log(errorcheck);
            basicDetails[basicDetailsKeys[i]].error = !errorcheck.state;
            basicDetails[basicDetailsKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = basicDetailsKeys.filter((obj) =>
            basicDetails[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            this.onSubmitData()
        }
        this.setState({ basicDetails })
    }
    changeDynamic = (data, key) => {
        var basicDetails = this.state.basicDetails;
        var errorcheck = ValidationLibrary.checkValidation(data, basicDetails[key].validation);
        basicDetails[key].value = data;
        basicDetails[key].error = !errorcheck.state;
        basicDetails[key].errmsg = errorcheck.msg;
        this.setState({ basicDetails });
        this.setState({})
    }
    Notification = (description) => {
 
        notification.info({
            // message:"Success",
            description,
            onClick: () => {
              console.log('Clicked!');
            },
          });
      }
    onSubmitData = () => {
        var formData = new FormData()
        if (this.props.imageChanged === true) {

            for (let i in this.props.imageData) {
                formData.append('uploadFile', this.props.imageData[i].originFileObj)
                console.log("formdafdsfsdf", this.props.imageData[i].originFileObj)
            }

        }else{
            formData.append('uploadFile', '')
        }
        formData.set('address', this.state.basicDetails.address.value)
        formData.set('mobile', this.state.basicDetails.mobile_number.value)
        formData.set('email', this.state.basicDetails.email.value)
        formData.set('website', this.state.basicDetails.website.value)
        formData.set('contact', this.state.basicDetails.contact_person.value)
        formData.set('modifiedby', 1)
        formData.set('trainingCenterId', 11)
        axios({
            method: 'POST',
            url: apiurl + 'edittrainingcenterprofile',
            data: formData
        }).then((response) => {
            
            this.Notification("Successfully updated")
            
           
            this.props.ProfileGetApi()
            console.log(response, "responseCheckProfile")
        }).catch((error) => {
            console.log(error)
        })
        this.props.onClose()
    }

    render() {
        return (
            <div className="basic_details_container">
                <Grid container>
                    <Grid item xs={12} md={6} className="basicdetails_container">
                        <div className="basicdetails_firstgrid">
                            <div className="basicdetails_child">
            
                                <Labelbox
                                    type="text"
                                    labelname="Address"
                                    valuelabel={'address'}
                                    changeData={(data) => this.changeDynamic(data, 'address')}
                                    value={this.state.basicDetails.address.value}
                                    error={this.state.basicDetails.address.error}
                                    errmsg={this.state.basicDetails.address.errmsg}
                                />
                                <div className ="contact_align_lab">
                                 <Labelbox
                                    type="text"
                                    labelname="Contact Person"
                                    valuelabel={'contact_person'}
                                    changeData={(data) => this.changeDynamic(data, 'contact_person')}
                                    value={this.state.basicDetails.contact_person.value}
                                    error={this.state.basicDetails.contact_person.error}
                                    errmsg={this.state.basicDetails.contact_person.errmsg}
                                />

                                </div>
                                <div  className ="contact_align_lab">
                                    <Labelbox
                                    type="text"
                                    labelname="Website"
                                    valuelabel={'website'}
                                    changeData={(data) => this.changeDynamic(data, 'website')}
                                    value={this.state.basicDetails.website.value}
                                    error={this.state.basicDetails.website.error}
                                    errmsg={this.state.basicDetails.website.errmsg}
                                   />

                                 </div>
                            
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} className="basicdetails_container">
                        <div className="basicdetails_firstgrid">
                            <div className="basicdetails_child basic_detail_mob">
                                <Labelbox
                                    type="number"
                                    labelname="Mobile Number"
                                    valuelabel={'mobile_number'}
                                    changeData={(data) => this.changeDynamic(data, 'mobile_number')}
                                    value={this.state.basicDetails.mobile_number.value}
                                    error={this.state.basicDetails.mobile_number.error}
                                    errmsg={this.state.basicDetails.mobile_number.errmsg}
                                />
                            <div className ="contact_align_lab">
                                <Labelbox
                                    type="text"
                                    labelname="Email Id"
                                    valuelabel={'email'}
                                    changeData={(data) => this.changeDynamic(data, 'email')}
                                    value={this.state.basicDetails.email.value}
                                    error={this.state.basicDetails.email.error}
                                    errmsg={this.state.basicDetails.email.errmsg}
                                />
                            </div>
                              
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className="buttons_container_lab">
                    <div>
                        <div>
                            <Button className="cancel_button" variant="contained" onClick={this.props.onClose}>Cancel</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Button className="update_button" variant="contained" color="primary" onClick={this.checkValidation}>Update</Button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
