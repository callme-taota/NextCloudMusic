import React, { Component } from 'react'
import './PlayListCard.css'
import { isnull, SuperClass ,PageScroll} from '../../function/fn'
import img from '../../img/vicetone.jpg'
import svg from '../../img/play.svg'

export default class PlayListCard extends Component {

    state = {
        model:'basic',
        models: ['basic', 'long','player'],
        modelid : 1,
        title:'专辑/歌手名字',
        imgUrl:img,
        strurl:'url('+img+')',
        ishover:false,
        shadowopacity: 0,
    }

    componentDidMount() {
        if(!isnull(this.props.model)){
            let models = this.state.models
            this.setState({model: this.props.model})
            let modelid = models.findIndex(item => {
                return item === this.props.model
            }) + 1
            this.setState({modelid})
        }
        if(!isnull(this.props.title)){
            this.setState({title:this.props.title})
        }
        if(!isnull(this.props.imgUrl)){
            let imgUrl = this.props.imgUrl + '?param=512y512'
            let strurl = 'url(' + imgUrl + ')'
            this.setState({ imgUrl, strurl })
        }
    }

    onMouse  = (e) => {
        this.setState({ ishover: true })
        setTimeout(() => {
            this.setState({shadowopacity:1})
        },6);
    }
    MouseOut = (e) => {
        this.setState({ shadowopacity: 0 })
        setTimeout(() => {
            this.setState({ ishover: false })
        },500);
    }

    render() {
        const { modelid, title, imgUrl, strurl, ishover, shadowopacity } = this.state

        return (
            <div style={{ position: 'relative' }} onMouseEnter={this.onMouse} onMouseLeave={this.MouseOut.bind(this)}>
                <div className={SuperClass('playlistcard-img-cont', 'playlistcard-img-cont', true, modelid)} >
                    <img src={imgUrl} style={{ borderRadius : modelid === 3 ? '50%' : ''}}
                     alt=""className={SuperClass('playlistcard-imgs','playlistcard-imgs-ani',modelid === 2 ? true : false)}  />
                    <div style={{ backgroundImage: strurl, display: ishover ? '' : 'none', opacity: shadowopacity }} className={SuperClass('playlistcard-img-blur', 'playlistcard-img-blur-round', modelid === 3 ? true : false)}></div>
                </div>
                {
                    modelid === 2 ?
                        <div className='playlistcard-daily'>
                            <div className='playlistcard-daily-cont'>
                                <p className='playlistcard-daily-title'>每 日</p>
                                <p className='playlistcard-daily-title'>推 荐</p>
                            </div>
                       </div> :
                        <div>
                            <p className={SuperClass('playlistcard-wd','playlistcard-wd-ct',modelid === 3 ? true : false)}>{title}</p>
                        </div>
                }
                <div className='playlistcard-playbtn'>
                </div>
            </div>
        )
    }
}
