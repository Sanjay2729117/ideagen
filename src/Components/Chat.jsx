import React from 'react'

const Chat = (props) => {
    console.log(props)
  return (
    <div className='ml'>
    <div  className='name' style={{color:`${props.color}`}}>User</div>
   <div className='box' style={{ borderLeft: `1.7px solid ${props.color}`}}>
  <div className='box1'>
 {props.name}
 </div>
 </div>
 </div>
  )
}

export default Chat
