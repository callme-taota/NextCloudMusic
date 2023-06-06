import React from 'react'
import './UserCard.css'
import Img from '../../img/vicetone.jpg'

export default function UserCard({userName='请登录'}) {
    return (
        <div className='UserCard-cont'>
            <img src={Img} className='UserCard-headport' alt="" />
            <div className='UserCard-info'>
                <p className='UserCard-username'>{userName}</p>
                <div className='UserCard-level'>
                    Lv7
                </div>
            </div>
            
        </div>
    )
}
