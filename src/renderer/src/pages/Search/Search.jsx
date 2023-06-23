import React, { Component } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import PanelCard from '../../components/PanelCard/PanelCard'
import SuperPlayListCard from '../../components/PlayListCard/PlayListCardSuper'
import HotSongsCard from '../../components/HotSongsCard/HotSongsCard'
import GridHead from '../../components/GridRows/GridHead'
import GridRows from '../../components/GridRows/GridRows'
import './Search.css'
import { Personalized, TopArtists, NewAlbum, HotSongs } from '../../function/api'
import { SuperSearch } from '../../function/api'
import { PlayList_State } from '../../function/Pool/Pool'
export default class Search extends Component {

    state = {
        UserCardOpacity: 1,
        TopBarOpacity: 0,
        Personalizeddata: [],
        TopArtistsdata: [],
        NewAlbumdata: [],
        Hotdata : [],
        keyWord : "",
        searching : false,
        resultData : {},
        musicRes : [],
        albumRes : [],
        playerRes : [],
        playlistRes : [],
        userRes : [],
    }

    async componentDidMount() {
        let Personalizeddata;
        let TopArtistsdata;
        let NewAlbumdata;
        let Hotdata;
        Hotdata = await HotSongs();
        Personalizeddata = await Personalized(5);
        TopArtistsdata = await TopArtists(6);
        NewAlbumdata = await NewAlbum();
        setTimeout(() => {
            this.setState({ Personalizeddata, TopArtistsdata, NewAlbumdata, Hotdata });
        });
    }

    handleKeyword = async (e) => {
        this.setState({keyWord : e , searching : true});
        if(e===''){
            this.setState({searching : false});
        }else{
            let res = await SuperSearch(e);
            let m = res.music_res;
            let a = res.album_res;
            let pa = res.player_res;
            let pl = res.playlist_res;
            let us = res.user_res;
            this.setState({resultData : res , musicRes : m , albumRes : a , playerRes : pa , playlistRes : pl , userRes : us });
        }
    }

    sendSong = (id,node) =>{
        let list = PlayList_State.get();
        let arr = list.songs;
        let now = list.now;
        let total = list.total;
        if(arr.length=== 0) {
            now = 0;
            total = 1;
            arr = [this.state.musicRes[id]];
        }else{
            total = total + 1;
            list.now = list.now + 1;
            now = now + 1;
            let song = [this.state.musicRes[id]];
            arr.splice(now,0,...song)
        }
        let s = {
            songs : arr,
            total: total,
            now : now,
        }
        PlayList_State.set(s);
    }

    randerSug = () => {
        const { Personalizeddata, TopArtistsdata, NewAlbumdata, Hotdata } = this.state
        return (
            <div >
                <PanelCard top={true} title='热搜' columns='4'>
                    <HotSongsCard  search={(e)=>this.handleKeyword(e)} HotSearchData={Hotdata} range='1'></HotSongsCard>
                    <HotSongsCard  search={(e)=>this.handleKeyword(e)} HotSearchData={Hotdata} range='2'></HotSongsCard>
                    <HotSongsCard  search={(e)=>this.handleKeyword(e)} HotSearchData={Hotdata} range='3'></HotSongsCard>
                    <HotSongsCard  search={(e)=>this.handleKeyword(e)} HotSearchData={Hotdata} range='4'></HotSongsCard>
                </PanelCard>
                <PanelCard top={false} title='推荐歌单' columns='5'>
                    {
                        Personalizeddata.map((playlist) =>
                            <SuperPlayListCard title={playlist.name} imgUrl={playlist.picUrl} key={playlist.id} id={playlist.id}/>
                        )
                    }
                </PanelCard>
                <PanelCard top={false} title='推荐艺人' columns='6'>
                    {
                        TopArtistsdata.map((artists) =>
                            <SuperPlayListCard title={artists.name} imgUrl={artists.img1v1Url} model='player' key={artists.id} id={artists.id} />
                        )
                    }
                </PanelCard>
                <PanelCard top={false} title='新专速递' columns='5' >
                    {
                        NewAlbumdata.map((album) =>
                            <SuperPlayListCard title={album.name} imgUrl={album.blurPicUrl} key={album.id} id={album.id} model='album'/>
                        )
                    }
                </PanelCard>
                <PanelCard title=' '  />
            </div>
        )
    }

    renderRes = () => {
        const { musicRes ,albumRes , playerRes ,playlistRes , userRes } = this.state;
        return(
            <div style={{display : "contents"}}>
                <PanelCard top={true} title="歌曲" columns='1'>
                    <div>
                    <GridHead></GridHead>
                    {
                        musicRes.map((song,key) =>(
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
                        ))
                    }
                    </div>
                </PanelCard>
                <PanelCard title="专辑" columns='5'>
                    {
                        albumRes.map((album) =>
                            <SuperPlayListCard title={album.name} imgUrl={album.blurPicUrl} key={album.id} id={album.id} model='album'/>
                        )
                    }
                </PanelCard>
                <PanelCard title="艺人" columns='5'>
                    {
                        playerRes.map((artists) =>
                            <SuperPlayListCard title={artists.name} imgUrl={artists.img1v1Url} model='player' key={artists.id} id={artists.id} />
                        )
                    }
                </PanelCard>
                <PanelCard title="歌单" columns='5'>
                    {
                        playlistRes.map((playlist) =>
                            <SuperPlayListCard title={playlist.name} imgUrl={playlist.coverImgUrl} key={playlist.id} id={playlist.id}/>
                        )
                    }
                </PanelCard>
                <PanelCard title="用户" columns='5'>
                    {
                        userRes.map((user) =>
                            <SuperPlayListCard title={user.nickname} imgUrl={user.avatarUrl} model='user' key={user.userId} id={user.userId} />
                        )
                    }
                </PanelCard>
            </div>
        )
    }

    setRender = () => {
        let f = this.state.searching;
        if(f){
            return React.createElement(this.renderRes);
        }else{
            return React.createElement(this.randerSug);
        }
    }


    render() {
        return(
            <div className='SearchPg'>
                <SearchBar search={(e)=>this.handleKeyword(e)}></SearchBar>
                {
                    this.setRender()
                }
            </div>
        )
    }

}
