import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import './DayCheckbox.css'
import CloseIcon from '@material-ui/icons/Close';
import Labelbox from '../../helpers/labelbox/labelbox';
import './ProfileModal.css';
import Button from '@material-ui/core/Button';
import { apiurl_T } from '../../App';
import Axios from 'axios';
import dateFormat from 'dateformat';
import moment from 'moment';
import {notification} from 'antd'

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default class WorkingHours extends React.Component {
  constructor(props) {
    super(props)
    this.state =
    {
      Friday: [], Saturday: [],Sunday:[],Monday:[],Tuesday:[],Wednesday:[],Thursday:[],
      countArray: [], count: 0, addMoreHours: false, checkedA: false, checkedB: false, checkedC: false, checkedD: false, checkedE: false, checkedF: false, checkedG: false,
      time: false, showtimepicker: false, timeout: false, choosetime: false, checkList: [], addMoreHoursList: [],
      "checkedAday": {
        "fromTime": dateFormat(new Date(), "hh:MM TT"),
        "toTime": dateFormat(new Date(), "hh:MM TT")
      },
      "checkedBday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedCday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedDday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedEday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedFday": {
        "fromTime": false,
        "toTime": false
      },
      "checkedGday": {
        "fromTime": false,
        "toTime": false
      },

    };
  }

  handleChange = name => event => {
    console.log([name])
    console.log('sdf', name)
    if (this.state.time === false) (
      this.setState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
        checkedE: true,
        checkedF: true,
        checkedG: true,
        time: true,
      }))

    if (!this.state.time === false) (
      this.setState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        time: false,
      }))
  };
  handleChangebox = name => event => {
    this.state.checkList.unshift(name)
    this.setState({})
    this.setState({ ...this.state, [name]: event.target.checked });
    this.handleChange(this.label);
  };
  timepickershow = () => {
    this.setState({ showtimepicker: !this.state.showtimepicker })
  }
  timepickerclose = () => {
    this.setState({ timeout: !this.state.timeout })
  }

  getTime = (time, label, key) => {
    console.log(time, label, "sdfasdfas")
    if (key === 'from') {
      this.state[label + 'day'].fromTime = time
    } else {
      this.state[label + 'day'].toTime = time
    }
    this.setState({})
  }

  getAllTime = (time, key) => {
    var apiKeys = ["checkedA", "checkedB", "checkedC", "checkedD", "checkedE", "checkedF", "checkedG"];
    for (var i in apiKeys) {
      if (key === "from") {
        this.state[apiKeys[i] + 'day'].fromTime = time
      } else {
        this.state[apiKeys[i] + 'day'].toTime = time
      }
    }
  }
  Notification = (description) => {
 
    notification.success({
        message: 'Success',
        description,
        onClick: () => {
          console.log('Clicked!');
        },
      });
  }
  sendToApi = () => {
    var apiData = {
      "trainingCenterId": '11',
      "wh": []
    }
    var apiKeys = ["checkedA", "checkedB", "checkedC", "checkedD", "checkedE", "checkedF", "checkedG"];
    var days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    for (var i in apiKeys) {
      // console.log(this.state[apiKeys[i]+`${i}`].fromTime,"checkingData")
      if (this.state[apiKeys[i]] === true) {
        apiData.wh.push({
          "weekday": days[i],
          "session": "1",
          "fromtime": this.state[apiKeys[i] + 'day'].fromTime,
          "totime": this.state[apiKeys[i] + 'day'].toTime,
          "active_flag": "1",
          "created_by": "1"
        })
      }
    }
    for (var i in days) {
      if (this.state[days[i]].length > 0) {
        this.state[days[i]].map((val,index) => {
          console.log(this.state[val].fromTime,"checkingData")
          return (
            apiData.wh.push({
              "weekday": days[i],
              "session": `${index+2}`,
              "fromtime": this.state[val].fromTime,
              "totime": this.state[val].toTime,
              "active_flag": "1",
              "created_by": "1"
            })
          )
        })
      }
      this.props.onClose()
    }

    console.log(apiData, "MyApiData")

    // Axios({
    //   method: 'POST',
    //   url: apiurl + 'edithealthcheckupworkinghours',
    //   data: {
    //     ...apiData
    //   }
    // }).then((response) => {
    //   this.props.onClose()
    //   this.props.ProfileGetApi()
    //   console.log(response, "responseCheckProfile")
    // }).catch((error) => {
    //   console.log(error)
    // })
  }

  addHours = (days) => {
    // alert(days)
    var count = this.state.count++;
    // this.setState({
    //   [days]:[]
    // },()=>this.state[days].push("checkedA" + count))
    this.state[days].push("checkedA" + count)
    this.setState({})
    this.setState({
      addMoreHours: true,
      count: this.state.count++,
      ["checkedA" + count]: {
        'fromTime': '',
        'toTime': ''
      }
    })
  }

  getAddMoreTime = (time, label, key) => {
    // this.setState({
    //   [label]:{
    //     'fromTime':'',
    //     'toTime':''
    //   }
    // })
    if (key === "fromTime") {
      this.state[label][key] = time;
      this.setState({})
    } else {
      this.state[label][key] = time;
      this.setState({})
    }
    console.log(time, label, key, "getAddMoreTime")
    this.setState({})
  }

  render() {
    console.log(this.state, "asdfasd")
    const { label, onClose } = this.props;
    var checkbox = (
      <div>
        <div className="label_timepicker_container">
          {
            this.state.showtimepicker == false ?
              <div className="timepicker_container">
                <Labelbox
                  type="timepicker"
                  className="start_time"
                  changeData={(time) => this.getTime(time, this.state.checkList[0], 'from')}
                  changeFormat={'HH:MM'}
                />
                <p className="time-">-</p>
                <Labelbox
                  type="timepicker"
                  changeData={(time) => this.getTime(time, this.state.checkList[0], "to")}
                  changeFormat={'HH:MM'}

                />
                <CloseIcon className="close_days ml-2" onClick={this.timepickershow} />
              </div>
              : ""}
        </div>
        <a className="addmore_hours" onClick={() => this.addHours(this.state.checkList[0])}>Add more hours</a>
      </div>
    )
    var addCheck = (
      <div>
        <div className="label_timepicker_container">
          {
            this.state.showtimepicker == false ?
              <div className="timepicker_container">
                <Labelbox
                  type="timepicker"
                  className="start_time"
                  changeData={(time) => this.getAddMoreTime(time, this.state.countArray[0], 'fromTime')}
                  changeFormat={'HH:MM'}
                />
                <p className="time-">-</p>
                <Labelbox
                  type="timepicker"
                  changeData={(time) => this.getAddMoreTime(time, this.state.countArray[0], "toTime")}
                  changeFormat={'HH:MM'}

                />
                <CloseIcon className="close_days ml-2" onClick={this.timepickershow} />
              </div>
              : ""}
        </div>
        {/* <a className="addmore_hours" onClick={this.addHours}>Add more hours</a> */}
      </div>
    )
    return (
      <div className="workinghours_details">
        <div className="select_timepicker">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.time} onChange={this.handleChange('time')} value="time" />} label="Select All Days"
          />
          {this.state.time == true ?
            <div className="timepicker_container">
              <Labelbox
                type="timepicker"
                className="start_time"
              // changeData={(time) => this.getAllTime(time, 'from')}
              />
              <p className="time-">-</p>
              <Labelbox
                type="timepicker"
              // changeData={(time) => this.getAllTime(time, 'to')}
              />
            </div>
            : ""}
        </div>
        <Divider className="checkbox_divider" />
        <FormGroup col className="form_checkbox">
          <div className="labtime_div">
            <div>
              <FormControlLabel
                control={<Checkbox checked={this.state.checkedA} onChange={this.handleChangebox('checkedA')} value={label} />} label="Friday" />
            </div>
            <p className="lab_time">
              {
                this.state.checkedAday.fromTime === '' ? dateFormat(new Date("1970-01-01T" + this.state.checkedAday.fromTime), "hh:MM TT") : this.state.checkedAday.fromTime
              }
              -
            {
                this.state.checkedAday.toTime === '' ? dateFormat(new Date("1970-01-01T" + this.state.checkedAday.toTime), "hh:MM TT") : this.state.checkedAday.toTime
              }
            </p>
          </div>
          {
            this.state.checkedA == true ?
              <>
                <div className="label_timepicker_container">
                  {
                    this.state.showtimepicker == false ?
                      <div className="timepicker_container">
                        <Labelbox
                          type="timepicker"
                          className="start_time"
                          changeData={(time) => this.getTime(time, this.state.checkList[0], 'from')}
                          changeFormat={'HH:MM'}
                        />
                        <p className="time-">-</p>
                        <Labelbox
                          type="timepicker"
                          changeData={(time) => this.getTime(time, this.state.checkList[0], "to")}
                          changeFormat={'HH:MM'}

                        />
                        <CloseIcon className="close_days ml-2" onClick={this.timepickershow} />
                      </div>
                      :
                      ""}
                </div>
                <a className="addmore_hours" onClick={() => this.addHours("Friday")}>Add more hours</a>
              </>
              :
              ''
          }
          {
            this.state.addMoreHours === true && this.state.Friday.length > 0 ?
              this.state.Friday.map((val) => {
                return (
                  <div className="label_timepicker_container">
                    <div className="timepicker_container">
                      <Labelbox
                        type="timepicker"
                        className="start_time"
                        changeData={(time) => this.getAddMoreTime(time, val, 'fromTime')}
                        changeFormat={'HH:MM'}
                      />
                      <p className="time-">-</p>
                      <Labelbox
                        type="timepicker"
                        changeData={(time) => this.getAddMoreTime(time, val, "toTime")}
                        changeFormat={'HH:MM'}

                      />
                    </div>
                  </div>
                )
              })
              :
              ''
          }


          <div className="labtime_div">
            <div>
              <FormControlLabel
                control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedB} onChange={this.handleChangebox('checkedB')} value="checkedB" />} label="Saturday" />
            </div>
            <p className="lab_time">9.30-12.30</p>

          </div>
          {
            this.state.checkedB == true ?
              <>
                <div className="label_timepicker_container">
                  {
                    this.state.showtimepicker == false ?
                      <div className="timepicker_container">
                        <Labelbox
                          type="timepicker"
                          className="start_time"
                          changeData={(time) => this.getTime(time, this.state.checkList[0], 'from')}
                          changeFormat={'HH:MM'}
                        />
                        <p className="time-">-</p>
                        <Labelbox
                          type="timepicker"
                          changeData={(time) => this.getTime(time, this.state.checkList[0], "to")}
                          changeFormat={'HH:MM'}

                        />
                        <CloseIcon className="close_days ml-2" onClick={this.timepickershow} />
                      </div>
                      :
                      ""}
                </div>
                <a className="addmore_hours" onClick={() => this.addHours('Saturday')}>Add more hours</a>
              </>
              :
              ''
          }
          {
            this.state.addMoreHours === true ?
              this.state.Saturday.map((val) => {
                return (
                  <div className="label_timepicker_container">
                    <div className="timepicker_container">
                      <Labelbox
                        type="timepicker"
                        className="start_time"
                        changeData={(time) => this.getAddMoreTime(time, val, 'fromTime')}
                        changeFormat={'HH:MM'}
                      />
                      <p className="time-">-</p>
                      <Labelbox
                        type="timepicker"
                        changeData={(time) => this.getAddMoreTime(time, val, "toTime")}
                        changeFormat={'HH:MM'}

                      />
                    </div>
                  </div>
                )
              })
              :
              ''
          }

          {/* <div className="labtime_div">
            <div><FormControlLabel
              control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedB} onChange={this.handleChangebox('checkedB')} value="checkedB" />} label="Saturday" />
            </div>
            <p className="lab_time">9.30-12.30</p>

          </div> */}
          {/* {this.state.checkedB == true ? <div>{checkbox}</div> : ""}
          <div className="labtime_div">
            <div><FormControlLabel
              control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedC} onChange={this.handleChangebox('checkedC')} value="checkedC" />} label="Sunday" />
            </div>
            <p className="lab_time">09.30-12.30</p>
          </div>
          {this.state.checkedC == true ? <div>{checkbox}</div> : ""}
          <div className="labtime_div">
            <div><FormControlLabel
              control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedD} onChange={this.handleChangebox('checkedD')} value="checkedD" />} label="Monday" />
            </div>
            <p className="lab_time">09.30-12.30</p>
          </div>
          {this.state.checkedD == true ? <div>{checkbox}</div> : ""}
          <div className="labtime_div">
            <div><FormControlLabel
              control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedE} onChange={this.handleChangebox('checkedE')} value="checkedE" />} label="Tuesday" />
            </div>
            <p className="lab_time">09.30-12.30</p>
          </div>
          {this.state.checkedE == true ? <div>{checkbox}</div> : ""}
          <div className="labtime_div">
            <div><FormControlLabel
              control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedF} onChange={this.handleChangebox('checkedF')} value="checkedF" />} label="Wednesday" />
            </div>
            <p className="lab_time">09.30-12.30</p>
          </div>
          {this.state.checkedF == true ? <div>{checkbox}</div> : ""}
          <div className="labtime_div">
            <div><FormControlLabel
              control={<Checkbox onClick={this.timepickershow} checked={this.state.checkedG} onChange={this.handleChangebox('checkedG')} value="checkedG" />} label="Thursday" />

            </div>
            <p className="lab_time">09.30-12.30</p>
          </div>
          {this.state.checkedG == true ? <div>{checkbox}</div> : ""} */}
        </FormGroup>

        <div className="buttons_container">
          <div>
            <div>
              <Button className="cancel_button" variant="contained" onClick={this.props.onClose}>Cancel</Button>
            </div>
          </div>
          <div>
            <div>
              <Button className="update_button" variant="contained" color="primary" onClick={this.sendToApi}>Update</Button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
