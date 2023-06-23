import React, { useState, useEffect } from 'react'
import './PlayListCard.css'
import { isnull, SuperClass } from '../../function/fn'
import img from '../../img/vicetone.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js'

export default function SuperPlayListCard({ model, title, id, imgUrl }) {
  const [Model, setModel] = useState('basic')
  const [Models] = useState(['basic', 'long', 'player', 'fm', 'album', 'user'])
  const [ModelId, setModelid] = useState(1)
  const [Title, setTitle] = useState('专辑/歌手名字')
  const [Imgurl, setImgUrl] = useState(img)
  const [strurl, setStrurl] = useState('url(' + img + ')')
  const [Id, setId] = useState('')

  const navigate = useNavigate()

  const goPlayer = (e) => {
    e.preventDefault()
    navigate('/player/' + Id)
    PubSub.publish('newPlayer', Id)
  }

  const goPlaylist = (e) => {
    e.preventDefault()
    navigate('/PlayList/' + Id)
    PubSub.publish('newPlayList', Id)
  }

  const goAlbum = (e) => {
    e.preventDefault()
    navigate('/album/' + Id)
  }

  const goUser = (e) => {
    e.preventDefault()
    navigate('/User/' + Id)
    PubSub.publish('newUser', Id)
  }

  useEffect(() => {
    if (!isnull(model)) {
      let models = Models
      setModel(model)
      let modelid =
        models.findIndex((item) => {
          return item === model
        }) + 1
      setModelid(modelid);
    }
    if (!isnull(title)) {
      setTitle(title)
    }
    if (!isnull(id)) {
      setId(id)
    }
    if (!isnull(imgUrl)) {
      let url = imgUrl + '?param=512y512'
      let strurl = 'url(' + url + ')'
      setImgUrl(url)
      setStrurl(strurl)
    }
  }, [])

  const RanderBasic = () => {
    return (
      <div style={{ position: 'relative' }} id={id} onClick={goPlaylist.bind(this)}>
        <div className='playlistcard-img-cont' >
          <img src={Imgurl} alt="" className='playlistcard-imgs' />
          <div style={{ backgroundImage: strurl }} className="playlistcard-img-blur"></div>
        </div>
        <div>
          <p className='playlistcard-wd'>{Title}</p>
        </div>
      </div>
    )
  }

  const RanderAlbum = () => {
    return (
      <div style={{ position: 'relative' }}>
        <Link to={'/album/' + Id}>
          <div className='playlistcard-img-cont'>
            <img src={Imgurl} alt="" className='playlistcard-imgs' />
            <div style={{ backgroundImage: strurl }} className='playlistcard-img-blur'></div>
          </div>
          <div>
            <p className='playlistcard-wd'>{Title}</p>
          </div>
        </Link>
      </div>
    )
  }

  const RanderFM = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div className='playlistcard-img-cont playlistcard-img-cont2' >
          <img src={Imgurl} alt="" className='playlistcard-imgs playlistcard-imgs-ani' />
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

  const RanderLong = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div className='playlistcard-img-cont playlistcard-img-cont2' >
          <img src={Imgurl} alt="" className='playlistcard-imgs playlistcard-imgs-ani' />
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

  const RanderPlayer = () => {
    return (
      <div style={{ position: 'relative' }}>
        <div className="playlistcard-img-cont playlistcard-img-cont3" id={id} onClick={goPlayer.bind(this)}>
          <img src={Imgurl} alt="" className='playlistcard-imgs' style={{ borderRadius: '50%' }} />
          <div style={{ backgroundImage: strurl }} className='playlistcard-img-blur playlistcard-img-blur-round'></div>
        </div>
        <div>
          <p className='playlistcard-wd playlistcard-wd-ct'>{Title}</p>
        </div>
      </div>
    )
  }

  const RanderUser = () => {
    return (
      <div style={{ position: 'relative' }}>
        <Link to={'/player/' + Id}>
          <div className='playlistcard-img-cont playlistcard-img-cont3' id={id} onClick={goUser.bind(this)} >
            <img src={Imgurl} alt="" className='playlistcard-imgs' style={{ borderRadius: '50%' }} />
            <div style={{ backgroundImage: strurl }} className='playlistcard-img-blur playlistcard-img-blur-round'></div>
          </div>
          <div>
            <p className='playlistcard-wd playlistcard-wd-ct'>{Title}</p>
          </div>
        </Link>
      </div>
    )
  }

  const setrander = (Id) => {
    switch (Id) {
      case 1:
        return React.createElement(RanderBasic)
      case 2:
        return React.createElement(RanderLong)
      case 3:
        return React.createElement(RanderPlayer)
      case 4:
        return React.createElement(RanderFM)
      case 5:
        return React.createElement(RanderAlbum)
      case 6:
        return React.createElement(RanderUser)
      default:
        return React.createElement(RanderBasic)
    }
  }

  // eslint-disable-next-line prettier/prettier
  return(
    <div style={{ textDecoration: 'none' }} >
      {
        setrander(ModelId)
      }
    </div>
  )

}
