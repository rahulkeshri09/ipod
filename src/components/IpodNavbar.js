import React from 'react';
const IpodNavbar =(propd) =>{
    return (
        //navbar of ipod
        <div style={styles.navbar} id ="navbar">
            <div>Ipod</div>
                <div>
                    {/* headfoone icon */}
                    <img
                        style={{height:20,width:20}}                                                 
                        src="https://image.flaticon.com/icons/svg/3225/3225461.svg"
                        alt="play"
                    />
                </div>
                <div style={{display:"flex"}}>   
                    {/* Showing current date  */}  
                    <div style={{margin:-2,marginRight:10}}>                                    
                        {new Date().getHours()}:{new Date().getMinutes()}
                    </div>
                    {/* battery image */}
                    <div>
                        <img 
                        style={{height:20,width:20}}                                                    
                        src="https://image.flaticon.com/icons/svg/3103/3103460.svg"
                        alt="battery"
                        />
                    </div>
                </div>
            </div>
    )
}
// navbar style
const styles={
    navbar:{
        height:20,
        width:"100%",
        backgroundColor:"white",
        display:"flex",
        justifyContent:"space-between",
        borderBottom:"1px solid grey"
    }
}
export default IpodNavbar;