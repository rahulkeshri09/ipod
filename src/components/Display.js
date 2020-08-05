import React from 'react';
import CurrMenu from './CurrMenu'
import IpodNavbar from './IpodNavbar';
import ZingTouch from 'zingtouch';
class Display extends React.Component{
    constructor(){
        super();
        this.state={
                    menu:[],
                    mainMenu:"lock"  //mainMenu show current menu state and it is initially lock
                }
            } 
            menu =() =>{
                return this.state.menu;
            }

            componentDidMount(){
                //all menu events handle by changeCurrMenu() 
                this.changeCurrMenu();
            }

              changeCurrMenu =()=>{
                var {menu}=this.state;
                const btn=document.getElementById('buttons');   //get all button(wheel buttons) of ipod execpt centre button 
                var index=0;
                const st=this;    // using states of current menu inside eventlisteners
                const activeRegion=new ZingTouch.Region(btn);     // get region of wheel to control scroll events in menu
                const enterBtn=document.getElementById('mainBtn');  //get center button of value for enter in specific menu
                const reverse=document.getElementById('reverse');   // get menu button for reverse back from current menu 
                reverse.addEventListener('click',function(){
                    st.reverseMenu(st,menu);              //  reverseMenu(st,menu) function works for reverse back from current menu
                })
                enterBtn.addEventListener('click',function(){
                    st.nextMenu(index,st,menu);           // nextMenu(index,st,menu) function works for entering in specific menu
                });
                activeRegion.bind(btn,'rotate',function(e){
                    st.scroll(e,index);                    //scroll(e,index) function works for scrolling in current menu items
                })
              }


              scroll = (e,index) =>{
                var dis=e.detail.distanceFromLast*10;      // get distance to navigate in menu
                var menuItems=document.getElementsByClassName('menuItems')[0].childNodes;    //get current menu items to navigate
                const curMenu=document.getElementById('currApp');   // get menu to go inside them
                if(menuItems.length<=1){          // if no menu item found or lock in stage then nothing to do
                    return
                }
                if(dis>=0){                        // if dis <0 i.e wheel direction clockwise and navigate from up to down
                    for(var i=0;i<menuItems.length;i++ ){     // get next index of currmenu to navigate to next  
                        if(curMenu===menuItems[i]){
                            index=i+1;
                        }
                    }
                    if(index>=menuItems.length){    // if index no. greater than current menu-items length then index=0
                        index=0
                    }
                    menuItems[index].setAttribute("id","currApp");    // change -
                    curMenu.setAttribute("id"," ");                    // -currmenu or navigate next menu
                    index=0;
                }else{                             // id dis<0 i.e wheel direction anti-clockwise and navigate from down to up
                    for(var j=0;j<menuItems.length;j++ ){     // get previos index of currmenu to navigate to previos
                        if(curMenu===menuItems[j]){
                            index=j-1;
                        }
                    }
                    if(index<0){                         // here we go back last menu items of curr menu-items 
                        index=menuItems.length-1;
                    }
                    menuItems[index].setAttribute("id","currApp");     //change-
                    curMenu.setAttribute("id"," ");                    // -currmenu or navigate previous menu
                    index=0;
                }
             }

             
              nextMenu=(index,st,menu)=>{
                const menuItems=document.getElementsByClassName('menuItems')[0].childNodes;  //get current menu items 
                    for(var i=0;i<menuItems.length;i++){                     // get index of current specific menu to enter that menu 
                        if(menuItems[i].getAttribute("id")==="currApp"){
                            index=i;
                        }
                    }    
                    var curMenu;                                        
                    if (this.state.mainMenu!=="lock"){
                        curMenu=menuItems[index].childNodes[0].innerHTML;       
                    }else{
                        curMenu="lock";
                    }
                    if((curMenu==="Now Playing" || curMenu==="Games") && menuItems.length >1){// entering in specific menu using if elseif conditions 
                        st.setState({                                   // entered new menu items
                            menu:[curMenu],
                            mainMenu:"reverse main"                       
                        })
                        menu=st.state.menu;
                    }else if(curMenu==="Album" || curMenu==="Artist"){
                        st.setState({
                            menu:[curMenu],
                            mainMenu:"reverse music"
                        })
                        menu=st.state.menu;
                    }else if(curMenu==="Music"){
                        document.getElementById('currApp').setAttribute("id","");  //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                              //-current menu have new menu-Items and that current menu is first menu item
                            menu:[ 
                                {application:"All Song",lable:true,id:1},       
                                {application:"Artist",lable:false,id:2},
                                {application:"Album",lable:false,id:3},
                            ],
                            mainMenu:"music"
                        })
                        menu=st.state.menu;                                                                        //set first menu items as current menu-                     
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); // -after enters in specific menu 
                    }else if(curMenu==="All Song"){
                        document.getElementById('currApp').setAttribute("id",""); //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                              //-current menu have new menu-Items and that current menu is first menu item
                            menu:[
                                {application:"Song 1",lable:true,id:1},             
                                {application:"Song 2",lable:false,id:2},           // entered new menu-items
                                {application:"Song 3",lable:false,id:3},
                                {application:"Song 4",lable:false,id:4}
                            ],
                            mainMenu:"all song"
                        })
                        menu=st.state.menu;                                                                       //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); // -after enters in specific menu 
                    }else if(curMenu==="Song 1" || curMenu==="Song 2"|| curMenu==="Song 3" || curMenu==="Song 4"){
                        st.setState({                               // entered new menu-items
                            menu:["Playing "+curMenu],
                            mainMenu:"reverse to all song"
                        })
                        menu=st.state.menu;
                    }else if(curMenu==="Setting"){
                        document.getElementById('currApp').setAttribute("id",""); //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                             //-current menu have new menu-Items and that current menu is first menu item
                            menu:[
                                {application:"Change Theme",lable:true,id:1},
                                {application:"Change WallPaper",lable:false,id:2},      // entered new menu-items
                                {application:"Set Date",lable:false,id:3}
                            ],
                            mainMenu:"setting"
                        })
                        menu=st.state.menu;                                                                        //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); // -after enters in specific menu 
                    }else if(curMenu==="Change Theme"){
                        document.getElementById('currApp').setAttribute("id",""); //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                             //-current menu have new menu-Items and that current menu is first menu item   
                            menu:[
                                {application:"Change navbar colour",lable:true,id:1},
                                {application:"Change font-style",lable:false,id:2},         // entered new menu-items
                                {application:"Change font colour",lable:false,id:3}
                            ],
                            mainMenu:"change theme"
                        })
                        menu=st.state.menu;                                                                         //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); // -after enters in specific menu 
                    }else if(curMenu==="Change navbar colour"){
                        document.getElementById('currApp').setAttribute("id","");  //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                              //-current menu have new menu-Items and that current menu is first menu item 
                            menu:[
                                {application:"Blue",lable:true,id:1},
                                {application:"Grey",lable:false,id:2},
                                {application:"White",lable:false,id:3},             // entered new menu-items
                                {application:"Red",lable:false,id:4},
                                {application:"Yellow",lable:false,id:5}
                            ],
                            mainMenu:"change navbar color"
                        })                                                                                            //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after enters in specific menu
                    }else if(curMenu==="Change font-style"){
                        document.getElementById('currApp').setAttribute("id","");  //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                              //-current menu have new menu-Items and that current menu is first menu item
                            menu:[
                                {application:"Normal",lable:true,id:1},
                                {application:"Italic",lable:false,id:2},     // entered new menu-items
                                {application:"Awsome",lable:false,id:3}
                            ],
                            mainMenu:"change theme"
                        })                                                                                             //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");   // -after enters in specific menu
                    }else if(curMenu==="Blue"){
                        document.getElementById('navbar').style.backgroundColor="blue";   //set blue colour to the navbar  
                    }else if(curMenu==="Grey"){
                        document.getElementById('navbar').style.backgroundColor="lightgrey";   //set lightgrey colour to the navbar
                    }else if(curMenu==="White"){
                        document.getElementById('navbar').style.backgroundColor="white";      //set white colour to the navbar
                    }else if(curMenu==="Red"){
                        document.getElementById('navbar').style.backgroundColor="red";       ////set red colour to the navbar
                    }else if(curMenu==="Yellow"){
                        document.getElementById('navbar').style.backgroundColor="yellow";    //set yellow colour to the navbar
                    }else if(curMenu==="Italic"){
                        document.getElementById('display').style.fontStyle="italic";          //set the font as italic
                    }else if(curMenu==="Normal"){
                        document.getElementById('display').style.fontStyle="Normal";         //set the font as normal
                    }else if(curMenu==="Awsome"){
                        document.getElementById('display').style.fontFamily="Impact, Charcoal, sans-serif"; //set font as bold text sans-serif
                    }else if(curMenu==="Change WallPaper"){
                        document.getElementById('currApp').setAttribute("id","");   //remove current menu bcz it enters in specific menu and that-
                        st.setState({                                               //-current menu have new menu-Items and that current menu is first menu item
                            menu:[
                                {application:"Grey background",lable:false,id:1},
                                {application:"White background",lable:false,id:2},
                                {application:"Red background",lable:false,id:3},        // entered new menu-items
                                {application:"Yellow background",lable:false,id:4}
                            ],
                            mainMenu:"change wallpaper"
                        })                                                                                           //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); // -after enters in specific menu
                    }else if(curMenu==="Grey background"){              
                        document.getElementById('display').style.backgroundColor="Grey";  //set background color as grey
                    }else if(curMenu==="White background"){
                        document.getElementById('display').style.backgroundColor="white";   //set background color as white
                    }else if(curMenu==="Red background"){
                        document.getElementById('display').style.backgroundColor="red";    //set background color as red
                    }else if(curMenu==="Yellow background"){
                        document.getElementById('display').style.backgroundColor="yellow";   //set background color as yellow
                    }else if(curMenu==="Set Date"){
                        st.setState({                           // entered new menu-items
                            menu:["Automatically Set"],
                            mainMenu:"return to setting"
                        })
                        menu=st.state.menu;
                    }else if(curMenu==="Change font colour"){
                        st.setState({                                   // entered new menu-items
                            menu:["change font colour"],
                            mainMenu:"return to setting"
                        })
                        menu=st.state.menu;
                    }else if(curMenu==="lock"){
                        document.getElementsByClassName('menuItems')[0].style.visibility="visible";
                        document.getElementById('display').style.backgroundImage="url()";
                        st.setState({                                           // entered new menu-items
                            menu:[
                                {application:"Now Playing",lable:true,id:1},
                                {application:"Music",lable:false,id:2},
                                {application:"Games",lable:false,id:3},
                                {application:"Setting",lable:false,id:4}
                            ],
                            mainMenu:"main"
                        })
                        menu=st.state.menu;                                                                          //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); // -after enters in specific menu
                    }
              }


              reverseMenu=(st,menu)=>{
                  const currView=st.state.mainMenu;     //get the current menu 
                    if(currView==="main" || currView==="reverse main" || currView==="music" || currView==="setting"){  //reverse back main menu
                        st.setState({
                            menu:[
                                {application:"Now Playing",lable:true,id:1},
                                {application:"Music",lable:false,id:2},
                                {application:"Games",lable:false,id:3},
                                {application:"Setting",lable:false,id:4}
                            ],
                            mainMenu:"main"
                        })
                        menu=st.state.menu;
                        document.getElementById('currApp').setAttribute("id","");   
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp"); //set first menu items as current menu-
                                                                                                                    // -after reverse from specific menu
                    }else if(currView==="reverse music"){   //reverse back music menu
                        st.setState({
                            menu:[
                                {application:"All Song",lable:true,id:1},
                                {application:"Artist",lable:false,id:2},
                                {application:"Album",lable:false,id:3},
                            ],
                            mainMenu:"music"
                        })
                        menu=st.state.menu;                                                                         //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }else if(currView==="all song"){      //reverse back music menu
                        document.getElementById('currApp').setAttribute("id","");
                        st.setState({
                            menu:[
                                {application:"All Song",lable:true,id:1},
                                {application:"Artist",lable:false,id:2},
                                {application:"Album",lable:false,id:3},
                            ],
                            mainMenu:"music"
                        })
                        menu=st.state.menu;                                                                           //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }
                    else if(currView==="reverse to all song"){    //reverse back all song menu
                        st.setState({
                            menu:[
                                {application:"Song 1",lable:true,id:1},
                                {application:"Song 2",lable:false,id:2},
                                {application:"Song 3",lable:false,id:3},
                                {application:"Song 4",lable:false,id:4}
                            ],
                            mainMenu:"all song"
                        })
                        menu=st.state.menu;                                                                         //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }else if(currView==="return to setting"){   //reverse back setting menu
                        st.setState({
                            menu:[
                                {application:"Change Theme",lable:true,id:1},
                                {application:"Change WallPaper",lable:false,id:2},
                                {application:"Set Date",lable:false,id:3}
                            ],
                            mainMenu:"setting"
                        })
                        menu=st.state.menu;                                                                          //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }
                    else if(currView==="change theme" || currView==="change wallpaper"){  //reverse back setting menu
                        document.getElementById('currApp').setAttribute("id","");
                        st.setState({
                            menu:[
                                {application:"Change Theme",lable:true,id:1},
                                {application:"Change WallPaper",lable:false,id:2},
                                {application:"Set Date",lable:false,id:3}
                            ],
                            mainMenu:"setting"
                        })
                        menu=st.state.menu;                                                                         //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }else if(currView==="change navbar color"){              //reverse back change theme menu
                        document.getElementById('currApp').setAttribute("id","");
                        st.setState({
                            menu:[
                                {application:"Change navbar colour",lable:true,id:1},
                                {application:"Change font-style",lable:false,id:2},
                                {application:"Change font colour",lable:false,id:3}
                            ],
                            mainMenu:"change theme"
                        })
                        menu=st.state.menu;                                                                         //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }else{              //reverse back main menu
                        document.getElementById('currApp').setAttribute("id","");
                        st.setState({
                            menu:[
                                {application:"Now Playing",lable:true,id:1},
                                {application:"Music",lable:false,id:2},
                                {application:"Games",lable:false,id:3},
                                {application:"Setting",lable:false,id:4}
                            ],
                            mainMenu:"main"
                        })
                        menu=st.state.menu;                                                                          //set first menu items as current menu-
                        document.getElementsByClassName("menuItems")[0].childNodes[0].setAttribute("id","currApp");  // -after reverse from specific menu
                    }
              }
    render(){
    return (
            <div id="display" className="lock">    {/* display of ipod */}
                <IpodNavbar />                      {/* navbar of ipod */}
                <CurrMenu menu={this.menu()}/>      {/* showing the current menu */}
            </div>
        )
    }
}

export default Display;