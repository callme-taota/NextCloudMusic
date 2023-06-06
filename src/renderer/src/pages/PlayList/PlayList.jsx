import React, { Component } from 'react'
import './PlayList.css'
import GridRows from '../../components/GridRows/GridRows'
import GridHead from '../../components/GridRows/GridHead'
import { PlayCircleFilled , MoreOutlined } from '@ant-design/icons'

import { PlayListInfo, PlaylistTrack  } from '../../function/api'
import { TimeFormatter } from '../../function/fn'

import { PlayList_State } from '../../function/Pool/Pool'
export default class PlayList extends Component {

    state = {
        data : {},
        coverUrl : '',
        creator : {},
        songs : [],
        playlistid:'2771939044'
    }

    async componentDidMount(){
        let playlistid;
        let url = window.location.href
        url = url.split('/')
        if(url.length===6) playlistid=url[5]
        let data = await PlayListInfo(playlistid)
        let coverUrl = 'url(' + data.coverImgUrl + ')';
        let creator = data.creator;
        let description = data.description
        if(description) description = description.replace(/\n/g, '<br />')
        this.setState({ data, coverUrl, creator, description, playlistid })
        let songs = await PlaylistTrack(playlistid)
        this.setState({ songs })
        PubSub.subscribe('newPlayList',this.newId);
    }

    sendId(nodeid,node){
        let s = {
            songs:this.state.songs,
            total:this.state.data.trackCount,
            now : nodeid
        }
        PlayList_State.set(s);
    }

    render() {
        const { data, coverUrl, creator, description ,songs } = this.state
        return (
            <div className='PlayListPg'>
                <div className='Playlist-imgcont'>
                    <img src={data.coverImgUrl} alt="" className='Playlist-img'/>
                    <div className='Playlist-imgcover' style={{ backgroundImage: coverUrl }}>
                    </div>
                    <div className='Playlist-name'>{data.name}</div>
                    <div className='Playlist-cre'>
                        <img src={creator.ImgUrl} alt="" className='Playlist-cre-img' />
                        <div className='Playlist-cre-nick'>{creator.nickname}</div>
                        <div className='Playlist-cre-time'>{TimeFormatter(creator.createTime)}创建</div>
                    </div>
                    <div className='Playlist-descr' dangerouslySetInnerHTML={{ __html: description }}>
                    </div>
                </div>
                <div className='Playlist-btn-cont'>
                    <div className='Playlist-btn-imgcover' style={{ backgroundImage: coverUrl }}>
                    </div>
                    <div className='Playlist-btn-play'>
                        <PlayCircleFilled />
                    </div>
                    <div className='Playlist-btn-more'>
                        <MoreOutlined />
                    </div>
                </div>
                <div className='Playlist-list'>
                    <GridHead
                        name='标题'
                        id='#'
                        author='作者'
                        cds='专辑'
                        time='时间'
                    >
                    </GridHead>
                    {
                        songs.map( (song,key) =>
                            <div
                                onClick={this.sendId.bind(this, key)}
                                key={key}
                            >
                                <GridRows
                                    name={song.name}
                                    id={key + 1}
                                    author={song.art}
                                    cds={song.aln}
                                    time={song.time_str}
                                    >
                                </GridRows>
                            </div>
                            )
                    }
                </div>
                <div className='Playlist-under'>

                </div>
            </div>
        )
    }
}
// 8050612544
// https://music.163.com/playlist?id=2771939044
