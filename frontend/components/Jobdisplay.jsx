import React from "react";
import Joboption from "./Joboption";

const Jobdisplay = ({projectdata,filtercount,worker})=>{
    const jobsdata = projectdata.length===0?[]:projectdata;
    return(
        <>
            <div style={{textAlign:'center',marginBottom:'10px'}}>
                {projectdata.length===0 && <span style={{color:'red', fontSize:'13px'}}>0 job results found...</span>}
                {filtercount>0 && <span style={{color:'red', fontSize:'13px'}}>{filtercount} job results found...</span>}<br/>
            </div>
            <div className="jobs">
                {jobsdata.length>0 && jobsdata.map((data,index)=>(
                    <Joboption data={data} key={index} worker={worker}/>
                ))}
            </div>
        </>
    )
}

export default Jobdisplay;