import React , { useState , useEffect } from 'react'
import './MvCard.css'
import { DurationFormatter } from '../../function/fn'
import { PlayCircleOutlined } from '@ant-design/icons';

const MvCard = ({duration,name,imgUrl,playcount}) => {
    const [count,Setcount] = useState("");
    const [dura,Setdura] = useState("");
    const [title,Setname] = useState("");
    useEffect(() =>{
        Setcount(playcount);
        let t = DurationFormatter(duration);
        Setdura(t);
        Setname(name);
    },[playcount,name,duration])
    return(
        <div style={{ position: 'relative' , margin:"0" }} >
            <div className='MV-imgcont'>
                <div className='MV-playcont'>{count}  <PlayCircleOutlined /></div>
                <div className='MV-name'>{title}</div>
                <div className='MV-dura'>{dura}</div>
                <div className='MV-hover'></div>
                <img className='MV-img' src={imgUrl} alt="" />
            </div>
        </div>
    )
}

export default MvCard;