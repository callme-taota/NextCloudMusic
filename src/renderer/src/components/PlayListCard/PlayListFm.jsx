import React, { Component } from 'react'
import './PlayListCard.css'
import { isnull, SuperClass, PageScroll } from '../../function/fn'
import img from '../../img/vicetone.jpg'

export default class PlayListFm extends Component {

    state={
        imgUrl: img,
        strurl: 'url(' + img + ')',
    }
    render() {
        const {  imgUrl, strurl } = this.state
        return (
            <div style={{ position: 'relative' }}>
                <div className={SuperClass('playlistcard-img-cont', 'playlistcard-img-cont2', true)} >
                    <img src={imgUrl}
                        alt="" className={SuperClass('playlistcard-imgs', 'playlistcard-imgs-ani', true)} />
                    <div style={{ backgroundImage: strurl }} className='playlistcard-img-blur'></div>
                </div>
                <div className='playlistcard-daily'>
                    <div className='playlistcard-daily-cont'>
                        <p className='playlistcard-daily-title'>私 人</p>
                        <p className='playlistcard-daily-title'>F&nbsp;&nbsp;&nbsp;M</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}
