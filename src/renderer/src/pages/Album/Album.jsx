import React, { Component } from 'react'
import './Album.css'
import GridRows from '../../components/GridRows/GridRows'
import GridHead from '../../components/GridRows/GridHead'
import { PlayCircleFilled , MoreOutlined } from '@ant-design/icons'

import { AlbumInfo  } from '../../function/api'
import { TimeFormatter } from '../../function/fn'

import { PlayList_State } from '../../function/Pool/Pool'
export default class Album extends Component {

    state = {
        data : {},
        coverUrl : '',
        creator : {},
        songs : [],
        playlistid:'2771939044'
    }

    async componentDidMount(){
        let playlistid='2771939044';
        let url = window.location.href
        url = url.split('/')
        if(url.length===5) playlistid=url[4]
        let data = await AlbumInfo(playlistid)
        let coverUrl = 'url(' + data.coverImgUrl + ')';
        let creator = data.creator;
        let description = data.description
        if(description) description = description.replace(/\n/g, '<br />')
        this.setState({ data, coverUrl, creator, description, playlistid , songs : data.songs })
    }

    updatestate = ( ) => {
        PlayList_State.get()
    }

    
    sendId(nodeid,node){
        let s = {
            songs : this.state.songs,
            total : this.state.data.trackCount,
            now : nodeid
        }
        PlayList_State.set(s);
        //let playlistid = this.state.playlistid;
        //let data = this.state.data;
        //console.log('sendId 被调用了', nodeid ,data)
        //PubSub.publish('OnLoadMusic', { playlistid ,songid : nodeid , listcount : data.trackCount} )
    }

    render() {
        const { data, coverUrl, creator, description ,songs } = this.state
        return (
            <div className='AlbumPg'>
                <div className='Album-imgcont'>
                    <img src={data.coverImgUrl} alt="" className='Album-img'/>
                    <div className='Album-imgcover' style={{ backgroundImage: coverUrl }}>
                    </div>
                    <div className='Album-name'>{data.name}</div>
                    <div className='Album-cre'>
                        <img src={creator.ImgUrl} alt="" className='Album-cre-img' />
                        <div className='Album-cre-nick'>{creator.nickname}</div>
                        <div className='Album-cre-time'>{TimeFormatter(creator.createTime)}创建</div>
                    </div>
                    <div className='Album-descr' dangerouslySetInnerHTML={{ __html: description }}>
                    </div>
                </div>
                <div className='Album-btn-cont'>
                    <div className='Album-btn-imgcover' style={{ backgroundImage: coverUrl }}>
                    </div>
                    <div className='Album-btn-play'>
                        <PlayCircleFilled />
                    </div>
                    <div className='Album-btn-more'>
                        <MoreOutlined />
                    </div>
                </div>
                <div className='Album-list'>
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
            </div>
        )
    }
}
// 8050612544
// https://music.163.com/playlist?id=2771939044