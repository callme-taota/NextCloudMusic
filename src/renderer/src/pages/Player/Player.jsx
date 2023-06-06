import React, { Component } from 'react'
import { Aritsts, AritstsMV , AritstsAl, AritstsDetail } from '../../function/api';
import PanelCard  from '../../components/PanelCard/PanelCard'
import GridHead  from '../../components/GridRows/GridHead'
import GridRows  from '../../components/GridRows/GridRows'
import MvCard from '../../components/MVCard/MvCard';
import SuperPlayListCard from '../../components/PlayListCard/PlayListCardSuper'
import { EllipsisOutlined,CheckOutlined } from '@ant-design/icons'
import { PlayList_State } from '../../function/Pool/Pool';
import PubSub from 'pubsub-js';
import "./Player.css"

export default class Player extends Component {
    async componentDidMount(){
        let playerid;
        let url = window.location.href
        url = url.split('/')
        if(url.length===6) playerid=url[5];
        if(playerid!==undefined){
            let playerData = await Aritsts(playerid);
            let followed = false;
            if(playerData.followed){
                followed = playerData.followed;
            }
            let hotsongs = playerData.songs;
            let mv = await AritstsMV(playerid);
            if(mv.code===200){
                mv=mv.mvs;
            }
            let allimit = 10;
            let al = await AritstsAl(playerid,allimit);
            if(al.code===200){
                al=al.hotAlbums;
            }
            let detail = await AritstsDetail(playerid);
            this.setState({playerData,hotSongs : hotsongs ,mv ,al,playerid,allimit ,detail ,followed});
        }
        PubSub.subscribe('newPlayer',this.newId);
    }
    state = {
        playerData : {},
        hotSongs : [],
        ShowMore : false,
        mv : [],
        al: [],
        detail:{},
        coverImg: '',
    }
    newId = async (_,id) => {
        let playerid=id;
        if(playerid!==undefined){
            let playerData = await Aritsts(playerid);
            let followed = false;
            if(playerData.followed){
                followed = playerData.followed;
            }
            let hotsongs = playerData.songs;
            let mv = await AritstsMV(playerid);
            if(mv.code===200){
                mv=mv.mvs;
            }
            let allimit = 10;
            let al = await AritstsAl(playerid,allimit);
            if(al.code===200){
                al=al.hotAlbums;
            }
            let detail = await AritstsDetail(playerid);
            this.setState({playerData,hotSongs : hotsongs ,mv ,al,playerid,allimit ,detail ,followed});
        }
    }
    sendSong = (id) => {
        let list = PlayList_State.get();
        let arr = list.songs;
        let now = list.now;
        let total = list.total;
        if(arr.length=== 0) {
            now = 0;
            total = 1;
            arr = [this.state.hotSongs[id]];
        }else{
            let flag = 0;
            let ff = this.state.hotSongs[id].id;
            for(let i=0; i<arr.length; i++){
                if(arr[i].id === ff) {
                    flag = 1;
                }
            }
            if(flag===0){
                total = total + 1;
                list.now = list.now + 1;
                now = now + 1;
                let song = [this.state.hotSongs[id]];
                arr.splice(now,0,...song)
            }
        }
        let s = {
            songs : arr,
            total: total,
            now : now,
        }
        PlayList_State.set(s);
    }
    ShowMore = () => {
        let f = this.state.ShowMore;
        f=!f;
        this.setState({ShowMore : f});
    }
    follow = () => {
        let f = this.state.followed;
        f = !f;
        this.setState({followed : f});
    }
    moreal = async () => {
        let allimit = this.state.allimit;
        let al = await AritstsAl(this.state.playerid,10,allimit);
        if(al.code===200){
            al=al.hotAlbums;
        }
        allimit += 10;
        let oldal = this.state.al;
        al = [...oldal,...al];
        this.setState({al,allimit});
    }
    render() {
        const { hotSongs , ShowMore , mv ,al ,playerData,followed } = this.state;
        return (
            <div className='PlayerPg'>
                <div className='PlayerPg-header' >
                    <div className='PlayerPg-hd-name'>
                        {playerData.name}
                        <div className='PlayerPg-hd-foll' onClick={this.follow}>
                            {
                                followed ? <CheckOutlined />:"关注"
                            }
                        </div>
                    </div>
                    <div className='PlayerPg-hd-trans'>
                        {playerData.trans}
                    </div>
                    <div className='PlayerPg-hd-info'>
                        单曲数:{playerData.musicSize} &nbsp;
                        专辑数:{playerData.albumSize} &nbsp;
                        视频数:{playerData.mvSize}
                    </div>
                    <div className='PlayerPg-pt-ct'>
                        <img className='PlayerPg-pt' src={playerData.ImgUrl ? playerData.ImgUrl+'param=512y512':''} alt="" />
                    </div>
                </div>
                <PanelCard top={true} title="歌曲" columns='1'>
                    <div>
                    <GridHead></GridHead>
                    {
                        // eslint-disable-next-line array-callback-return
                        hotSongs.map((song,key) =>{
                            if(key<10 && !ShowMore ){
                                return(
                                    <div
                                    key={key}
                                    onClick={this.sendSong.bind(this,key)}
                                    >
                                        <GridRows
                                            name={song.name}
                                            id={key + 1}
                                            author={song.art}
                                            cds={song.aln}
                                            time={song.time_str}>
                                        </GridRows>
                                    </div>
                                )
                            }else if(ShowMore){
                                return(
                                    <div
                                    key={key}
                                    onClick={this.sendSong.bind(this,key)}
                                    >
                                        <GridRows
                                            name={song.name}
                                            id={key + 1}
                                            author={song.art}
                                            cds={song.aln}
                                            time={song.time_str}>
                                        </GridRows>
                                    </div>
                                )
                            }

                        })
                    }
                    <div className='PlayerPg-showmore'>
                        <EllipsisOutlined className='PlayerPg-showmore-btn' onClick={this.ShowMore} />
                    </div>
                    </div>
                </PanelCard>
                <PanelCard  morebtn={true} ClickEvent={this.moreal} title='专辑' columns='5'>
                    {
                        al.map(album=>{
                            return(
                                <SuperPlayListCard title={album.name} imgUrl={album.blurPicUrl} key={album.id} id={album.id} model='album'/>
                            )
                        })
                    }
                </PanelCard>
                <PanelCard title='MV' columns='3'>
                    {
                        // eslint-disable-next-line array-callback-return
                        mv.map((m,i)=>{
                            if(i<9){
                                return(
                                    <MvCard key={m.id} duration={m.duration} name={m.name} imgUrl={m.imgurl16v9} playcount={m.playCount}>
                                    </MvCard>
                                )
                            }
                        })
                    }
                </PanelCard>

            </div>
        )
    }
}
