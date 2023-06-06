import React, { Component } from 'react'
import './SideBarCard.css'
import img from '../../../img/martin_garrix_pressure.jpg'
import { PlayCircleFilled, StepBackwardOutlined, StepForwardOutlined, SoundOutlined, RetweetOutlined , PauseCircleFilled } from '@ant-design/icons'
import { SendMessage } from '../../../function/fn'
import { PlayList_State } from '../../../function/Pool/Pool'

import { GetSongUrl } from '../../../function/api'
import ArtistsLink from '../../Artists_Link/ArtistsLink'


export default class SideBarCard extends Component {

    async componentDidMount() {
        PlayList_State.Subscribe(this.SubS);
        window.addEventListener('keydown',this.onKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e) => {
        if(e.keyCode === 32){
            let isplaying = this.state.isplaying;
            this.play(!isplaying);
        }
    }

    GetMusic = async ( ) => {
        let data = PlayList_State.get();
        let now = data.now;
        let song = data.songs[now];
        let id = song.id;
        let songUrl = await GetSongUrl(id);
        let name =song.name;
        let artists = song.art;
        let imgUrl = song.picUrl; 
        this.setState({ name , artists , imgUrl , songUrl })
    }

    state = {
        percentage:0,
        name: '',
        artists: [],
        isplaying: false,
        totaltime: '',
        nowtime : '00:00',
        imgUrl: img,
        songs:{},
    }

    SubS =async (data) => {
        await this.GetMusic();
        setTimeout(() => {
            this.play(true);
        }, 800);
    }

    SettotalTime = () => {
        if(this.Audioref.duration){
            let tt = this.Audioref.duration
            let ttm = Math.floor( tt / 60 )
            let tts = Math.floor( tt - 60* ttm)
            if(ttm<10) ttm ='0' + ttm;
            if(tts<10) tts ='0' + tts;
            let totaltime = ttm + ':' + tts;
            this.setState({ totaltime })
        }
    }

    SetcurrentTime = () => {
        let tt = this.Audioref.currentTime
        let ttt = this.Audioref.duration
        let percentage = (tt /ttt) * 100;
        let ttm = Math.floor( tt / 60 )
        let tts = Math.floor( tt - 60* ttm )
        if (ttm < 10) ttm = '0' + ttm;
        if (tts < 10) tts = '0' + tts;
        let nowtime = ttm + ':' + tts
        this.setState({ nowtime, percentage })
        if(percentage===100){
            this.next();
        }
    }

    next = async () => {
        let data = PlayList_State.get();
        if(data.now ===  data.total -1){
            data.now = 0;
        }else{
            data.now = data.now + 1 ;
        }
        PlayList_State.set(data);
        setTimeout(() => {
            this.play(true);
        }, 800);
    }

    pre = async () => {
        let data = PlayList_State.get();
        if(data.now === 0){
            data.now = data.total -1;
        }else{
            data.now = data.now - 1 ;
        }
        PlayList_State.set(data);
        setTimeout(() => {
            this.play(true);
        }, 800);
    }

    play = (flag) => {
        if(flag===true){
            this.SettotalTime();     
            this.setState({isplaying: true});
            this.Audioref.play()
            this.Audioref.ontimeupdate = ()=> {
                this.SetcurrentTime();
            }
        }else{
            this.SettotalTime();
            this.setState({isplaying: false});
            this.Audioref.pause()
            this.Audioref.ontimeupdate = ()=> {
                this.SetcurrentTime();
            }
        }
        
    }

    handleClick = (e) => {
        this.setState({ isdrag : e})
    }

    repeat = () => {
        SendMessage('还没开发');
    }

    drag = (e) => {
        if(this.state.isdrag){
            let per = ((e.clientX-34)/212)*100;
            let tt = this.Audioref.duration;
            this.Audioref.currentTime = (per/100)*tt;
            this.setState({percentage : per});
        }
    }

    render() {
        const {percentage , imgUrl , name , artists , isplaying , totaltime ,nowtime,songUrl} = this.state
        let strpercentage = percentage + '%'
        return (
            <div className='Side-Card'>
                <img src={imgUrl} className='Side-Card-Img' alt=''></img>
                <div className='Side-Card-title-c'>
                    <p className='Side-Card-title'>{name}</p>
                </div>
                <div className='Side-Card-author-c'>
                    <p className='Side-Card-author'><ArtistsLink art={artists}></ArtistsLink></p>
                </div>
                <div className='Side-Card-time-c' 
                    onMouseDown={()=>this.handleClick(true)} 
                    onMouseMove={e=>this.drag(e)} 
                    onMouseUp={() => this.handleClick(false)}
                    onMouseLeave={() => this.handleClick(false)}>
                    <div className='Side-Card-time-m' style={{ width: strpercentage }} >
                    </div>
                </div>
                <div className='Side-Card-time-s'>
                    <div className='Side-Card-time-s-left'>{nowtime}</div>
                    <div className='Side-Card-time-s-right'>{totaltime}</div>
                </div>
                <div className='Side-Card-btns'>
                    <span onClick={this.repeat}>
                        <RetweetOutlined className='Side-Card-btns-more' />
                    </span>
                    <span className='Side-card-btns-sep'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span onClick={this.pre}>
                        <StepBackwardOutlined className='Side-Card-btns-actions'/>
                    </span>
                    <span className='Side-card-btns-sep'>&nbsp;&nbsp;&nbsp;</span>
                    <span onClick={() => this.play(!isplaying)}>
                        {
                            isplaying ?
                                <PauseCircleFilled className='Side-Card-btns-play' /> :
                                <PlayCircleFilled className='Side-Card-btns-play' />
                        }
                    </span>
                    <span className='Side-card-btns-sep'>&nbsp;&nbsp;&nbsp;</span>
                    <span  onClick={this.next}>
                        <StepForwardOutlined className='Side-Card-btns-actions' />
                    </span>
                    <span className='Side-card-btns-sep'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <SoundOutlined className='Side-Card-btns-more' />
                </div>
                <audio ref={audio => this.Audioref = audio} src={songUrl}></audio>
            </div>
        )
    }
}
