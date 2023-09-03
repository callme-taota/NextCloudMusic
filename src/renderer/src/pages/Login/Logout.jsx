import React , { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Logout.css'

import { LoginStatus } from '../../function/api'

export default function Logout() {

  const navigate = useNavigate();
  const [LoginState,setLoginState] = useState(false);

  useEffect(() =>{
    CheckLogin();
  })

  const CheckLogin = async () => {
    let { st,pf,flag } = await LoginStatus();
    if(flag){
      setLoginState(true);

    }else{
      setLoginState(false);
      setTimeout(() => {
        navigate('/home')
      }, 3000);
    }
  }

  return (
    <div className='Logout-pg'>
      <div className='Logout-text'>{LoginState ? "确认登出":"已登出"}</div>

    </div>
  )
}
