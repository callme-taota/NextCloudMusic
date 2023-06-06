import React from 'react'
import './Message.css'
import { Message_State } from '../../function/Pool/Pool';
import { useState, useEffect } from 'react';

export default function Message() {
    const [msgArr,setMsgArr] = useState([]);

    useEffect(() =>{
        Message_State.Subscribe(stmsg);
    },[]);

    const stmsg = (k) => {
        let arr = k.msgArr;
        arr.forEach(obj=>{
            obj.hide = false;
        })
        setMsgArr(arr);
    }    

    return (
        <div className='Message-cont'>
            {
                msgArr.map((msg)=>{
                    return(
                        <div className='Message-single' key={msg.time}>
                            {msg.message}
                        </div>
                    )
                })
            }
        </div>
    )
}
