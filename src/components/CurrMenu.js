import React from 'react';
class CurrMenu extends React.Component{
    render(){
        const menu=this.props.menu;
        return(
            // showing current menu-items
            <div className="menuItems">
                     
                {menu.length!==1 && menu.map((task) => {   // if menu items exists (menu-items length more than 1)
                       return (
                                <div key={task.id}>
                                    {task.lable && <div id="currApp">{task.application}</div>}
                                    {!task.lable && <div>{task.application}</div>}
                                </div>
                                ) 
                })}
                {/* if any app iz runnig (dummy) */}
                {menu.length===1 && <div style={styles}>{menu[0]}</div>}   
            </div>
        )
    }
}
// style of runnig application(dummy)
const styles={
  fontSize:30,
  backgroundColor:"lightblue",
  textAlign:"center",
  color:"green",
  height:200,
  width:"100%"

}
export default CurrMenu;