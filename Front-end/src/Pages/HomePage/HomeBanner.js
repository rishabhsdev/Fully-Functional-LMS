import React,{Component} from "react";
import {Link} from 'react-router-dom';
import './CSS/HomeBanner.css';
import Url from '../../ApiServices/BackendUrl';

class HomepageBanner extends Component{

    render(){
        let text=null;
        let Banner=null;

        if(this.props.img === 'all'){
             text = ( <p className="Banner-text">Best place to <br/>learn new things</p> );
             Banner=( <div className="BannerSection">

             <img className="BannerImage" 
             src={Url +"images/"+ "GreenBanner.png"} alt="banner1"/>

            </div>);
            }

        if(this.props.img !== 'all'){
            text = <p className="Banner-text">Learn {this.props.img}</p>;
            Banner=( <div className="BannerSection">

                     <img className="BannerImage" 
                     src={Url +"images/"+ "GreenBanner.png"} alt="banner1"/>

                    </div>);
        }

        if(this.props.img === null){
            
            text = (
                    
                    <div className="Teacher-banner">
            
                        <p className="Teacher-text">Share Your Knowlegde 
                        <br/>with the whole World!</p> 

                       <Link to="teacher"> <button className="createCourse">
                            Create New Course</button></Link>
                        
                    </div>
            );
        }

    

    return(
        <>
           
           {Banner}
            {text}

        </>
     


    );
  }
}

export default HomepageBanner;
