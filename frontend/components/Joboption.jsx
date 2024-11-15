import React from "react"

const Joboption = (props)=>{
    const jobdata = props.data;
    const date = new Date(jobdata.createdAt).getDate()-new Date().getDate();
    const performtask = ()=>{
        
    }
    return(
        <>
            <div className="jobcomponent">
                <div className="datas">
                    <div className="jobshead" style={{marginTop:'3px'}}>
                        <b>{jobdata.projectdetails.position}</b><br />
                        <span style={{color:'gray',fontSize:'14px'}}>Panchi bhai</span>
                    </div>
                    <div className="jobsdesc" style={{color:'gray',fontSize:'8px',marginTop:'10px'}}>
                        <div className="data1" style={{marginBottom:'3px',fontSize:'7px'}}>
                            <span style={{fontSize:'14px'}}>{jobdata.projectdetails.yearexp}</span>&emsp;| &emsp; <span style={{fontSize:'14px'}}>{jobdata.projectdetails.amounttobepaid}</span>&emsp;| &emsp; <span style={{fontSize:'14px'}}>{jobdata.projectdetails.location}</span>
                            &emsp;| &emsp; <span style={{fontSize:'14px'}}>Barter: {jobdata.projectdetails.bartarsystem}</span>
                        </div>
                        <div className="data2" style={{marginBottom:'3px',fontSize:'1px'}}>
                            <span style={{fontSize:'14px'}}>{jobdata.projectdetails.projectdesc}</span>
                        </div>
                        <div className="data3" style={{marginBottom:'3px',fontSize:'1px'}}>
                            <span style={{fontSize:'13px'}}>Skills: {jobdata.projectdetails.skillsreq.join(', ')}</span>
                        </div>
                    </div>
                    <div className="jobfoot" style={{color:'gray',fontSize:'8px',marginTop:'14px'}}>
                        <span style={{fontSize:'11px'}}>{date}Days ago</span>
                        <button onClick={performtask}>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Joboption;