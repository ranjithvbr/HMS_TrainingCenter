/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './UploadInstruction.css'
import Green from '../../Images/green.svg'

export default class UploadMedia extends Component {
    constructor(props)
    {
        super(props)
        this.state={name:""}
    }
    render() {
        return (
            <div>
               <div className="green_upload_container"><img src={Green} className="green_uploadint"/><span className="upload_ins">Please Upload Image in JPG or PNG format</span></div>
               <div className="green_upload_container"><img src={Green} className="green_uploadint"/><span  className="upload_ins">For Image,Image Size Should be 1080px by 566px</span></div>
               <div className="green_upload_container"><img src={Green} className="green_uploadint"/><span  className="upload_ins">For Video, Video Size Should be less than 10 MB</span></div>
            </div>
        )
    }
}
