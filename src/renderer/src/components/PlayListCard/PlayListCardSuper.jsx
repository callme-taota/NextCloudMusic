import React, { Component } from 'react'
import './PlayListCard.css'
import { isnull, SuperClass } from '../../function/fn'
import img from '../../img/vicetone.jpg'
import { Link } from 'react-router-dom'


export default class SuperPlayListCard extends Component {

    state = {
        model: 'basic',
        models: ['basic', 'long', 'player','fm','album'],
        modelid: 1,
        title: '专辑/歌手名字',
        imgUrl: img,
        strurl: 'url(' + img + ')',
        ishover:false,
        id: ''
    }

    componentDidMount() {
        if (!isnull(this.props.model)) {
            let models = this.state.models
            this.setState({ model: this.props.model })
            let modelid = models.findIndex(item => {
                return item === this.props.model
            }) + 1
            this.setState({ modelid })
        }
        if (!isnull(this.props.title)) {
            this.setState({ title: this.props.title })
        }
        if (!isnull(this.props.id)) {
            this.setState({ id: this.props.id })
        }
        if (!isnull(this.props.imgUrl)) {
            let imgUrl = this.props.imgUrl + '?param=512y512'
            let strurl = 'url(' + imgUrl + ')'
            this.setState({ imgUrl, strurl })
        }
    }


    handleMouse = (f) => {
        return() => {
            this.setState({ ishover: f })
        }
    }


    RanderBasic = () => {
        const { title, imgUrl, strurl, ishover, id } = this.state
        return(
            <div style={{ position: 'relative' }}>
                <Link to={'/PlayList/' + id}>
                    <div className='playlistcard-img-cont'>
                        <img src={imgUrl} alt="" className='playlistcard-imgs' />
                        <div style={{ backgroundImage: strurl }} className={SuperClass('playlistcard-img-blur','playlistcard-img-blur-hover',ishover)}></div>
                    </div>
                    <div>
                        <p className='playlistcard-wd'>{title}</p>
                    </div>
                </Link>
            </div>
        )
    }

    RanderAlbum = () => {
        const { title, imgUrl, strurl, ishover, id } = this.state
        return(
            <div style={{ position: 'relative' }}>
                <Link to={'/album/' + id}>
                    <div className='playlistcard-img-cont'>
                        <img src={imgUrl} alt="" className='playlistcard-imgs' />
                        <div style={{ backgroundImage: strurl }} className={SuperClass('playlistcard-img-blur','playlistcard-img-blur-hover',ishover)}></div>
                    </div>
                    <div>
                        <p className='playlistcard-wd'>{title}</p>
                    </div>
                </Link>
            </div>
        )
    }

    RanderFM = () => {
        const { imgUrl } = this.state
        return (
            <div style={{ position: 'relative' }}>
                <div className='playlistcard-img-cont playlistcard-img-cont2' >
                    <img src={imgUrl} alt="" className='playlistcard-imgs playlistcard-imgs-ani'/>
                </div>
                <div className='playlistcard-daily'>
                    <div className='playlistcard-daily-cont'>
                        <p className='playlistcard-daily-title'>私 人</p>
                        <p className='playlistcard-daily-title'>F&nbsp;&nbsp;&nbsp;M</p>
                    </div>
                </div>
            </div>
        )
    }

    RanderLong = () => {
        const { imgUrl } = this.state
        return (
            <div style={{ position: 'relative' }}>
                <div className='playlistcard-img-cont playlistcard-img-cont2' >
                    <img src={imgUrl} alt="" className='playlistcard-imgs playlistcard-imgs-ani'/>
                </div>
                <div className='playlistcard-daily'>
                    <div className='playlistcard-daily-cont'>
                        <p className='playlistcard-daily-title'>每 日</p>
                        <p className='playlistcard-daily-title'>推 荐</p>
                    </div>
                </div>
            </div>
        )
    }

    RanderPlayer = () => {
        const { imgUrl, strurl, title, ishover, id } = this.state
        return (
            <div style={{ position: 'relative' }}>
                <Link to={'/player/' + id}>
                    <div className='playlistcard-img-cont playlistcard-img-cont3' >
                        <img src={imgUrl} alt="" className='playlistcard-imgs' style={{ borderRadius: '50%'}} />
                        <div style={{ backgroundImage: strurl }} className={SuperClass('playlistcard-img-blur playlistcard-img-blur-round','playlistcard-img-blur-hover',ishover)}></div>
                    </div>
                    <div>
                        <p className='playlistcard-wd playlistcard-wd-ct'>{title}</p>
                    </div>
                </Link>
            </div>
        )
    }

    RanderUser = () => {
        const { imgUrl, strurl, title, ishover, id } = this.state
        return (
            <div style={{ position: 'relative' }}>
                <Link to={'/player/' + id}>
                    <div className='playlistcard-img-cont playlistcard-img-cont3' >
                        <img src={imgUrl} alt="" className='playlistcard-imgs' style={{ borderRadius: '50%'}} />
                        <div style={{ backgroundImage: strurl }} className={SuperClass('playlistcard-img-blur playlistcard-img-blur-round','playlistcard-img-blur-hover',ishover)}></div>
                    </div>
                    <div>
                        <p className='playlistcard-wd playlistcard-wd-ct'>{title}</p>
                    </div>
                </Link>
            </div>
        )
    }

    setrander(id){
        switch(id){
            case 1:
                return React.createElement(this.RanderBasic);
            case 2:
                return React.createElement(this.RanderLong);
            case 3:
                return React.createElement(this.RanderPlayer);
            case 4:
                return React.createElement(this.RanderFM);
            case 5:
                return React.createElement(this.RanderAlbum);
            default:
                return React.createElement(this.RanderBasic);
        }
    }

    render() {
        const { modelid } = this.state 
        return (
            
            <div style={{textDecoration : 'none' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                
                    {
                        this.setrander(modelid)
                    }
            </div>
        )
    }
}
