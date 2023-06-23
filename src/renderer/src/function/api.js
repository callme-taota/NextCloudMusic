/* eslint-disable prettier/prettier */
/*



*/
import axios from 'axios';
import { isnull } from './fn';

/**
 * 核心 推送异步数据 返回promise对象，需要使用then进行读取
 * @param {string} apiaddr
 * @returns {object} data
 */
export const AxiosPost = async (apiaddr) => {
    let posturl = "http://localhost:4000" + apiaddr ;
    let data;
    await axios.post(posturl).then(
        response => {
            data = response.data;
        },
        error => {console.error(error);}
    )
    return data;
}

/**
 * 推荐歌单
 * @param {number} limit
 * @returns {object} data
 */
export const Personalized = async (limit) => {
    let data;
    let url = '/personalized'
    if (!isnull(limit)){
        url = url + '?limit=' + limit
        await AxiosPost(url).then(res => {
            data = res;
        })
    }else{
        await AxiosPost(url).then(res => {
            data = res;
        })
    }
    return data.result;
}

/**
 * 推荐艺人
 * @param {number} limit
 * @param {number} offset
 * @returns {object} artists
 */
export const TopArtists = async (limit,offset) => {
    let data;
    let url = '/top/artists'
    let delimit = 30
    let deoffset = 0
    if (!isnull(limit)) delimit = limit;
    if (!isnull(offset)) deoffset = offset;
    url = url + '?offset=' + deoffset + '&limit=' + delimit
    await AxiosPost(url).then(res => {
        data = res;
    })
    return data.artists;
}

/**
 * 新专速递
 * @returns {object} NewAlbum
 */
export const NewAlbum = async () => {
    let data;
    let url = '/album/newest'
    await AxiosPost(url).then(res => {
        data = res;
    })
    let xdata = [];
    for(let i = 0;i<5;i++){
        xdata.push(data.albums[i]);
    }
    return xdata;
}

/**
 * 榜单
 * @returns {object} TopList
 */
export const TopList = async () => {
    let data;
    let url = '/toplist'
    await AxiosPost(url).then(res => {
        data = res;
    })
    return data.list;
}

/**
 * 热搜列表
 * @returns {object} HotSongs
 */
export const HotSongs = async () => {
    let data;
    let url = '/search/hot/detail'
    await AxiosPost(url).then(res => {
        data = res;
    });
    return data.data;
}

/**
 * 搜索
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {string} keyword
 * @param {number} type
 * @param {number} limit
 * @param {number} offset
 * @param {boolean} more
 * @returns {object} SearchResult
 */
export const Search = async (keyword,type,limit,offset,more) => {
    let data;
    let url;
    if(more === true){
        url = '/cloudsearch';
    }else{
        url = '/search';
    }
    let delimit = 30;
    let deoffset = 0;
    let detype = 1;
    let dekeyword = ' ';
    if (!isnull(limit)) delimit = limit;
    if (!isnull(offset)) deoffset = offset;
    if (!isnull(type)) detype = type;
    if (!isnull(keyword)) dekeyword = keyword;
    url = url + '?offset=' + deoffset + '&limit=' + delimit + '&type=' + detype;
    url = url + '&keywords=' + dekeyword;
    await AxiosPost(url).then(res => {
        data = res;
    })
    return data;
}

/**
 * 超级搜索
 * @param {string} keyword
 * @returns {object}
 */
export const SuperSearch = async (keyword) => {
    let music_res = await Search(keyword,1,10,0,true);
    if(music_res.code===200){
        music_res = music_res.result.songs;
        music_res = SingleSongEasy(music_res);
    }
    let album_res = await Search(keyword,10,10,0,true);
    if(album_res.code === 200){
        if(album_res.result.albumCount===0){
            album_res = [];
        }else{
            album_res = album_res.result.albums;
        }
    }
    let player_res = await Search(keyword,100,10,0,true);
    if(player_res.code === 200){
        if(player_res.result.artistCount===0){
            player_res = [];
        }else{
            player_res = player_res.result.artists;
        }
    }
    let playlist_res = await Search(keyword,1000,10,0,true);
    if(playlist_res.code === 200){
        playlist_res = playlist_res.result.playlists;
    }
    let user_res = await Search(keyword,1002,10,0,false);
    if(user_res.code === 200){
        user_res = user_res.result.userprofiles;
    }
    let obj = {
        music_res,
        album_res,
        player_res,
        playlist_res,
        user_res,
    }
    return obj;
}

/**
 * 歌单歌曲
 * @param {number} id
 * @param {number} slimit
 * @param {number} soffset
 * @returns {object}
 */
export const PlaylistTrack = async (id,slimit,soffset) => {
    let data;
    let offset = 0;
    // let limit = 100;
    let url = '/playlist/track/all?'
    if(!isnull(id)) url += 'id=' +id;
    if(!isnull(slimit)){
        url += '&limit=' + slimit;
    }else{
        // url += '&limit=' + limit;
    }
    if(!isnull(soffset)){
        url += '&offset=' + soffset;
    }else{
        url += '&offset=' + offset;
    }
    await AxiosPost(url).then(res => {
        data = res
    });
    let songs = data.songs;
    let songx = SingleSongEasy(songs);
    return songx;
}

/**
 * 单曲信息
 * @param {object} SingleSongObject
 * @returns {object}
 */
export const SingleSong = async (objx) => {
    let name = objx.name;
    let id = objx.id;
    let picUrl = objx.al.picUrl;
    picUrl = picUrl + '?param=512y512'
    let art = objx.ar;
    let art_str = '';
    for(let i = 0; i < art.length; i++){
        let name = art[i].name;
        art_str = art_str + name + '/';
    }
    art_str = art_str.slice(0,art_str.length-1)
    let songUrl = await GetSongUrl(id);
    let SongObj = {
        id,
        name,
        picUrl,
        art_str,
        songUrl,
    }
    return SongObj;
}

/**
 * 单曲信息 2
 * @param {object} SongObject
 * @returns
 */
export const SingleSongEasy = (objs) => {
    let data = [];
    for(let i = 0; i < objs.length; i++){
        let name = objs[i].name;
        let id = objs[i].id;
        let picUrl = objs[i].al.picUrl;
        let aln = objs[i].al.name
        picUrl = picUrl + '?param=512y512'
        let art = objs[i].ar;
        let art_str = '';
        for (let i = 0; i < art.length; i++) {
            let name = art[i].name;
            art_str = art_str + name + '/';
        }
        art_str = art_str.slice(0, art_str.length - 1)
        let time = objs[i].dt
        let mm = Math.floor(Math.floor(time/1000)/60)
        if(mm < 10) mm = '0' + mm
        let ss = Math.floor(Math.floor(time - mm*60000)/1000)
        if (ss < 10) ss = '0' + ss
        let time_str = mm + ':' + ss
        let SongObj = {
            id,
            name,
            picUrl,
            art_str,
            aln,
            time_str,
            art
        }
        data.push(SongObj)
    }
    return data;
}

/**
 * 播放地址
 * @param {number} Songid
 * @returns {string} songurl
 */
export const GetSongUrl = async (id) => {
    let data ;
    let url = '/song/url'
    url += '?id=' + id
    await AxiosPost(url).then(res =>{
        data = res;
    })
    let songurl = data.data[0].url
    return songurl;
}

/**
 * 歌单信息
 * @param {number} id
 * @returns
 */
export const PlayListInfo = async (id) => {
    let data;
    let url = '/playlist/detail?id='
    url += id
    await AxiosPost(url).then(res =>{
        data = res}
    );
    let ZipData = {
        id : data.playlist.id,
        name : data.playlist.name,
        description : data.playlist.description,
        tags : data.playlist.tags,
        trackCount : data.playlist.trackCount,
        subscribedCount : data.playlist.subscribedCount,
        playCount : data.playlist.playCount,
        shareCount : data.playlist.shareCount,
        commentCount : data.playlist.commentCount,
        commentThreadId : data.playlist.commentThreadId,
        coverImgUrl: data.playlist.coverImgUrl + '?param=512y512',
        creator: {
            createTime : data.playlist.createTime,
            ImgUrl: data.playlist.creator.avatarUrl + '?param=512y512',
            nickname: data.playlist.creator.nickname,
        }
    }
    return ZipData;
}

/**
 * 专辑信息
 * @param {number} id
 * @returns {object} AlbumObject
 */
export const AlbumInfo = async (id) => {
    let data;
    let url = '/album?id='
    url += id
    await AxiosPost(url).then(res =>{
        data = res}
    );
    let songs = SingleSongEasy(data.songs);
    let ZipData = {
        id : data.album.id,
        name : data.album.name,
        description : data.album.description,
        tags : data.album.tags,
        trackCount : data.album.size,
        // subscribedCount : data.album.subscribedCount,
        // playCount : data.playlist.playCount,
        // shareCount : data.playlist.shareCount,
        // commentCount : data.playlist.commentCount,
        // commentThreadId : data.playlist.commentThreadId,
        coverImgUrl: data.album.picUrl + '?param=512y512',
        creator:{
            createtime:data.album.publishTime,
            ImgUrl:data.album.artists[0].img1v1Url + '?param=512y512',
            nickname:data.album.artists[0].name
        },
        songs : songs
    }
    return ZipData;
}

/**
 * 歌手信息 50songs
 * @param {number} id
 * @returns
 */
export const Aritsts = async (id) => {
    let data;
    let url ='/artists?id='
    url += id;
    await AxiosPost(url).then(res => {
        data = res;
    });
    let songs = SingleSongEasy(data.hotSongs)
    let artists = {
        ImgUrl : data.artist.img1v1Url + '?param=512y512',
        name : data.artist.name,
        trans  : data.artist.trans,
        musicSize : data.artist.musicSize,
        albumSize : data.artist.albumSize,
        mvSize : data.artist.mvSize,
        followed : data.artist.followed,
        discription : data.artist.briefDesc,
        id : data.artist.id,
        songs
    }
    return artists;
}

/**
 * 获取歌手MV
 * @param {number} id
 * @returns
 */
export const AritstsMV = async (id) => {
    let data;
    let url = '/artist/mv?id='
    url += id;
    await AxiosPost(url).then(res =>{
        data = res;
    });
    return data;
}

/**
 * 获取歌手歌单
 * @param {number} id
 * @param {number} limit
 * @param {number} offset
 * @returns
 */
export const AritstsAl = async (id,limit,offset) => {
    let data;
    let url = '/artist/album?id=' + id;
    let delimit = 30
    let deoffset = 0
    if (!isnull(limit)) delimit = limit;
    if (!isnull(offset)) deoffset = offset;
    url = url + '&offset=' + deoffset + '&limit=' + delimit
    await AxiosPost(url).then(res => {
        data = res;
    })
    return data;
}

/**
 * 获取歌手个人详情信息
 * @param {number} id
 * @returns
 */
export const AritstsDetail = async (id) => {
    let data;
    let url = '/artist/detail?id=' + id;
    await AxiosPost(url).then(res => {
        data  = res;
    });
    if(data.code===200) data=data.data;
    return data;
}

//用户登陆部分

/**
 * 登陆检测
 * @returns {object} state,profile,flag
 */
export const LoginStatus = async () => {
    let data;
    let url = '/login/status'
    await AxiosPost(url).then(res => {
        data = res;
    });
    if(data.data.code===200) data=data.data;
    let st = data.account.status;
    let pf = data.profile;
    let flag = false;
    if(pf !== null) flag = true;
    return {st,pf,flag};
}

/**
 * 获取登陆二维码
 * @returns {object} qrimg,key
 */
export const Login_qr = async () => {
    let keydata;
    let timestamp = new Date().getTime();
    let keyurl = '/login/qr/key?timestamp=' + timestamp;
    await AxiosPost(keyurl).then(res => {
        keydata = res ;
    })
    let key;
    if(keydata.code === 200){
        key = keydata.data.unikey;
    }else{
        return {"error":"error can not get qrkey"}
    }
    let qrdata;
    let qrurl =  '/login/qr/create?key=' + key + '&qrimg=true&timestamp=' + timestamp;
    await AxiosPost(qrurl).then(res => {
        qrdata = res;
    })
    let qrimg='';
    if(qrdata.code === 200) qrimg = qrdata.data.qrimg;
    return {qrimg,key};
}

/**
 * 二维码扫码状态读取
 * 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 * @param {number} key
 * @returns {object} data
 */
export const Login_qr_check = async (key) => {
    let data ;
    let timestamp = new Date().getTime();
    let url = '/login/qr/check?key=' + key + '&timestamp=' + timestamp;
    await AxiosPost(url).then(res => {
        data = res;
    })
    return data;
}
