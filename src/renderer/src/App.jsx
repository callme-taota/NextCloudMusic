/* eslint-disable prettier/prettier */
import './App.css';
import SideBarBasic from './components/SideBar/SideBarBasic/SideBarBasic';
import Panel from './pages/Panel/Panel';
import { useEffect,useState } from 'react';
import { Theme_light,Theme_dark } from './theme/theme';
import { Theme_setter } from './function/fn';
import { Theme_State } from './function/Pool/Pool';
import Message from './components/Message/Message';

function App() {

  const [model,setmodel] = useState('light');

  useEffect(()=>{
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)');
    console.log(prefersColorScheme);
    Theme_setter();
    let Theme = Theme_State.get();
    let md = Theme.model;
    setmodel(md);
    Theme_State.Subscribe(()=>{
      let Theme = Theme_State.get();
      let md = Theme.model;
      setmodel(md);
    })
  },[])

  return (
    <>
      <div className='app-bar'>

      </div>
      <div className='app-main'>
        <Message></Message>
        {
          // eslint-disable-next-line react/jsx-pascal-case
          model==='light' ? <Theme_light /> : <Theme_dark />
        }
        <SideBarBasic></SideBarBasic>
        <Panel></Panel>
      </div>
    </>
  );
}

export default App;
