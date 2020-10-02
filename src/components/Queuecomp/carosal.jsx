import React, { Component } from "react";
import Carousel from "react-spring-3d-carousel";
import uuidv4 from "uuid";
import './carosal.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { config } from "react-spring";
import first from '../../images/image1.png'
import second from '../../images/image2.png'
import third from '../../images/image3.png'
import fourth from '../../images/image4.png'
import fivth from '../../images/image6.png'
import sixth from '../../images/image5.png'
import seven from '../../images/9.jpg'
import Crown from '../../images/whitecrown.png'
import Greenwalk from '../../images/greenwalk.png'
import Redwalk from '../../images/redwalk.png'
import Green from '../../images/green.svg'
class ImageCarouselDynamic extends Component{
  constructor(props) {
  super(props);
  this.state={ goToSlide:0,
    // showNavigation: true,
     offsetRadius:6,
     animationConfig:{ tension: 120, friction: 14 }}
}
  onChangeData=(data,key)=>{
    var animationConfig=this.state.animationConfig;
    animationConfig[key]=data;
    this.setState({animationConfig});
  }
  gotoslideleft=(e)=>{

        this.state.goToSlide+1<e?
        this.setState({goToSlide:this.state.goToSlide+1})
        :this.setState({goToSlide:0})
        console.log(e,"e")
        console.log(this.state.goToSlide,"ffffffffffffff")
       }

  gotoslideright=(e)=>{

  this.state.goToSlide-1>-e?
  this.setState({goToSlide:this.state.goToSlide-1})
  :this.setState({goToSlide:0})
  console.log(e,"e")

 }

  render() {

    var statevalue=this.state.goToSlide

    var key1=statevalue===0?
      <div><img className="crown_indicators" src={Crown} style={{width:25,height:25,borderRadius:'50%'}} alt="dd"/>
    <img className="green_indicators" src={Green} style={{width:25,height:25,borderRadius:'50%'}} alt="444"/>
    <img src={first} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" /></div>
  :<div>
  <img src={first} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" />
  <div><img className="red_indicators" src={Redwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="red_indicators"/></div>
   <img className="crown_indicators" src={Crown} style={{width:20,height:20,borderRadius:'50%'}} alt="dd"/> 
  </div>
     var key2=statevalue===1?
      <div>
      <img className="green_indicators" src={Green} style={{width:25,height:25,borderRadius:'50%'}} alt="444"/>
    <img src={second} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" /></div>
  :<div>
  <img src={second} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" />
  <img className="red_indicators" src={Redwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="red_indicators"/>
    <img className="greenwalksignal_indicators" src={Greenwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="second_greensignal"/>
    </div>
     var key3=statevalue===2?
      <div>
      <img className="green_indicators" src={Green} style={{width:25,height:25,borderRadius:'50%'}} alt="444"/>
    <img src={third} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" /></div>
  :<div>
  <img src={third} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" />
  <img className="red_indicators" src={Redwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="red_indicators"/>
    <img className="greenwalksignal_indicators" src={Greenwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="second_greensignal"/>
    </div>
     var key4=statevalue===3?
      <div>
       <img className="green_indicators" src={Green} style={{width:25,height:25,borderRadius:'50%'}} alt="444"/>
    <img src={fourth} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" /></div>
  :<div>
  <img src={fourth} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" />
  <img className="red_indicators" src={Redwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="red_indicators"/>
    <img className="greenwalksignal_indicators" src={Greenwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="second_greensignal"/>
    </div>
    var key5=statevalue===4?
      <div>
      <img className="green_indicators" src={Green} style={{width:25,height:25,borderRadius:'50%'}} alt="444"/>
    <img src={fivth} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" /></div>
  :<div>
  <img src={fivth} className="image" style={{width:200,height:200,borderRadius:'50%',backgroundColor:"#ccc"}} alt="7" />
  <img className="red_indicators" src={Redwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="red_indicators"/>
    <img className="greenwalksignal_indicators" src={Greenwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="second_greensignal"/>
    </div>
     var key6=statevalue===5?
      <div>
       <img className="green_indicators" src={Green} style={{width:25,height:25,borderRadius:'50%'}} alt="444"/>
    <img src={sixth} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" /></div>
  :<div className="last_div">
  <img src={sixth} className="image" style={{width:200,height:200,borderRadius:'50%'}} alt="1" />
  <img className="red_indicators" src={Redwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="red_indicators"/>
    <img className="greenwalksignal_indicators" src={Greenwalk} style={{width:25,height:25,borderRadius:'50%'}} alt="second_greensignal"/>
    </div>
  var states={slides:[
  {
    key: 1,
    content:key1
   
  },
  {
    key:2,
    content: key2
  },
  {
    key:3,
    content: key3
  },
  {
    key:4,
    content: key4
  },
  {
    key:5,
    content: key5
  },
  {
    key:6,
    content: key6
  },
],
}
    console.log('dd',statevalue);
    return (
      <div>
        
      <div className="ImageCarouselDynamic">
      <div className="queuetime"><p>09.50 AM</p></div>
      <div className="imageitem" style={{width:350, height:380,margin:"auto"}}>
        <Carousel
          slides={states.slides}
          goToSlide={this.state.goToSlide}
          // showNavigation={this.state.showNavigation}
           offsetRadius={this.state.offsetRadius}
           animationConfig={this.state.animationConfig}
           // getShortestDirection={()=>alert('')}
          className="dialog"
        />
        <div className="carosal_arrow"><FaChevronLeft className="left_arrow" onClick={(e)=>this.gotoslideright(
        states.slides.length)}/>
      <FaChevronRight className="right_arrow" onClick={(e)=>this.gotoslideleft(
        states.slides.length
        )}/></div>
        </div>
        <Grid container className="queue_detailsintimeimage_container">
        <Grid item xs={12} md={12} className="queue_detailsintimeimage">
  
        <div className="details_queueimage"> 
      
              <div className="prof_img_caro"><img src={sixth} className="imagedetails" style={{width:100,height:100,borderRadius:'50%'}} alt="1" /></div>
              <div className="details_queuediv">
                 <p style={{color:"#333333"}}>Mohamad</p>
                 <p>+999-444-6789</p>
                 <p>27Years,Male</p>
              </div>
              <div className="queuediv_detailsintime">
                 <p className="parient_intime">16-06-2019</p>
                 <p>9.30am</p>
              </div>
              
        </div>
        </Grid>
        </Grid>
        </div> 
        </div> 
    );
  }
}
export default ImageCarouselDynamic; // <input type=
        // 'number' onChange={(e)=>this.setState({goToSlide:-parseInt(e.target.value)})}/>
      // <input type="number" onChange={(e)=>this.onChangeData(e.target.value,'friction')}/>
      // <input type="number" onChange={(e)=>this.onChangeData(e.target.value,'tension')}/>
      // <input type="number" onChange={(e)=>this.onChangeData(e.target.value,'tension')}/>
      // <FaChevronLeft onClick={(e)=>this.setState({goToSlide:this.state.goToSlide-1})}/>
      //     <FaChevronRight onClick={(e)=>this.setState({goToSlide:this.state.goToSlide+1