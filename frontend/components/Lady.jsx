import React from "react";
import "../src/Lady.css";
// import img from "../../Images/person-with-headset-transformed.webp"
export default function Lady()
{
    return(
        <section className="LandingPage_Comp_Success" style={{border:'0px'}}>
            <div className="LandingPage_Comp_Success_div">
                <div className="LandingPage_Success_Left">
                    <div className="LandingPage_Success_left" style={{overflow:'hidden'}}>
                        <h1 className="LandingPage_left_heading">Why businesses turn to Upwork</h1>
                        <div className="LandingPage_left_div_Container">
                            <div className="LandingPage_left_div_comp">
                                <div className="LandingPage_left_div">
                                    <h1 className="LandingPage_left_div_heading">Proof of quality</h1>
                                    <p className="LandingPage_left_div_para">Check any pro’s work samples, client reviews, and identity verification.</p>
                                </div>
                                <div className="LandingPage_left_div">
                                    <h1 className="LandingPage_left_div_heading">No cost until you hire</h1>
                                    <p className="LandingPage_left_div_para">Interview potential fits for your job, negotiate rates, and only pay for work you approve.</p>
                                </div>
                                <div className="LandingPage_left_div">
                                    <h1 className="LandingPage_left_div_heading">Safe and secure</h1>
                                    <p className="LandingPage_left_div_para">Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="LandingPage_img" >
                    <img src="https://res.cloudinary.com/dyerj85ll/image/upload/v1732472461/girl_ao6z1g.png"/>
                </div>
                <div className="LandingPage_Success_Right">
                    <div className="LandingPage_Success_right">
                        <div className="LandingPage_right_heading">
                            <h1 className="LandingPage_Success_heading">We're the world's work marketplace</h1>
                        </div>
                        <div className="LandingPage_right_div_Container">
                            <div className="LandingPage_right_comp">
                                <div className="LandingPage_right_div">
                                    <h1 className="LandingPage_right_div_heading">4.9/5</h1>
                                    <p className="LandingPage_right_para" style={{color:'yellow'}}>Clients rate professionals on Barter4Skills</p>
                                </div>
                                <div className="LandingPage_right_div">
                                    <h1 className="LandingPage_right_div_heading LandingPage_award">Award winner</h1>
                                    <p className="LandingPage_right_para" style={{color:'yellow'}}>G2's 2021 Best Software Awards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}