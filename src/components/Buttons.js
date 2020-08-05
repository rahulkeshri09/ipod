import React from 'react';
const Buttons =(props) =>{
    return (
        <div>
            <div id="buttons">        {/* all wheel buttons of ipod */}
                <div 
                style={{width:200,height:50,textAlign:"center"}}
                className="btn-icon"
                >                       {/* reverse back button */}
                    <div id="reverse" style={{width:70,height:30,margin:"auto"}}>Menu</div>
                    
                </div>
                            {/* forward button */}
                <img 
                style={{width:50,height:30,marginLeft:-1}}className="btn-icon" 
                src="https://image.flaticon.com/icons/svg/122/122329.svg"
                alt="Back-Forward"
                />
                            {/* back forward button */}
                <img 
                style={{width:50,height:30,transform:"rotate(180deg)",marginLeft:99}} className="btn-icon" 
                src="https://image.flaticon.com/icons/svg/122/122329.svg"
                alt="Forward"
                />
                        {/* play/pause button */}
                <img 
                style={{width:200,height:30,paddingTop:10}}className="btn-icon" 
                src="https://image.flaticon.com/icons/svg/2404/2404569.svg"
                alt="Play-Pause"
                />
            </div>
            {/* Enter button */}
           <div id="mainBtn"></div>
        </div>
    )
}

export default Buttons;