import React, { useEffect, useState } from 'react'
import './Home.css'
import UserCard from '../../components/UserCard/UserCard'
import ShowRoutePath from '../../components/ShowRoutePath/ShowRoutePath'
import PanelCard from '../../components/PanelCard/PanelCard'
import TopBarHome from '../../components/TopBarHome/TopBarHome'
import SuperPlayListCard from '../../components/PlayListCard/PlayListCardSuper'

import { LoginStatus, Login_qr ,Login_qr_check } from '../../function/api'

let CheckQRkey

export default function Home() {
  const [UserCardOpacity, setUserCardOpacity] = useState(1)
  const [TopBarOpacity, setTopBarOpacity] = useState(0)
  const [LgStatus , setLoginStatus] = useState(false)
  const [UserProfile , setUserProfile] = useState({})
  const [QRsrc, setQRsrc] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    const fetch = async () => {
      const { st, pf, flag } = await LoginStatus()
      if (flag === 0 || st < 0) {
        setLoginStatus(false)
        const { qrimg, key } = await Login_qr()
        setQRsrc(qrimg)
        CheckQRkey = key
      } else {
        setLoginStatus(true)
        setUserProfile(pf)
      }
    }
    fetch()
    const checkLog = async () => {
      let data = await Login_qr_check(CheckQRkey)
      if (data.code === 800) {

      }
      if (data.code === 803) {
        setLoginStatus(true)
        const { pf } = await LoginStatus()
        setUserProfile(pf)
      }
    }

    let LoginInterval = setInterval(() => {
      checkLog()
    }, 1000)

    return (()=>{
      window.removeEventListener('scroll', handleScroll)
      clearInterval(LoginInterval)
    })
  }, [])

  const handleScroll = (event) => {
    let pos = event.target.scrollTop
    let DebounceOpacity = 1;
    if (pos < 125) {
      let UserCardOpacity = (125 - pos) / 125
      if (UserCardOpacity < DebounceOpacity - 0.15) {
        DebounceOpacity = UserCardOpacity
      }
    }
    if (pos > 124) {
      DebounceOpacity = 0;
    }
    setTopBarOpacity(1 - DebounceOpacity);
    setUserCardOpacity(DebounceOpacity);
  }

  const renderBeforeLogin = () => {
    return (
      <div className='Home-bf'>
        <div className='Home-bf-title'>
          二维码登陆
        </div>
        <div className='Home-bf-qr-cont'>
          <img src={QRsrc} alt="" className='Home-bf-qr' />
        </div>
        <div className='Home-bf-bo'>
          目前仅支持二维码登陆<br />验证码以及账号密码登陆模式无法绕过验证
        </div>
      </div>
    )
  }

  const renderLogin = () => {
    return (
      <>
        <ShowRoutePath title='主页' />
        <div style={{ opacity: UserCardOpacity, transition: '0.03s', display: UserCardOpacity === 0 ? 'none' : 'block' }}>
          <UserCard />
        </div>
        <div style={{ opacity: TopBarOpacity, transition: '0.03s', display: TopBarOpacity === 0 ? 'none' : 'block' }}>
          <TopBarHome />
        </div>
        <PanelCard top={true} title='For You' columns='2'>
          <SuperPlayListCard model='long'></SuperPlayListCard>
          <SuperPlayListCard model='fm' />
        </PanelCard>
      </>
    )
  }

  const setRender = () => {
    if(LoginStatus === true){
      return React.createElement(renderLogin);
    }else{
      return React.createElement(renderBeforeLogin);
    }
  }


  return (
    <div className='HomePg'>
      {
        setRender()
      }
    </div>
  )
}
