import React from 'react'

const Chat = (props) => {

  return (
    
    <div className='ml'>
    <div  className='name' style={{color:`${props.color}`}}>{props.color=="#d24a60"?"User":props.typed}</div>
   <div className='box' style={{ borderLeft: `1.7px solid ${props.color}`}}>
  <div className='box1'>
 {props.name}
 </div>
 </div>
 </div>
 
)
}

export default Chat
