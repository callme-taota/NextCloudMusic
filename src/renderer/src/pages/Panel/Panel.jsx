import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../Home/Home'
import Search from '../Search/Search';
import Logout from '../Login/Logout';
import Setting from '../Setting/Setting';
import List from '../List/List';
import PlayList from '../PlayList/PlayList';
import Album from '../Album/Album'
import Result from '../Search/Result';
import Player from '../Player/Player';
import User from '../User/User';

import './Panel.css'


export default class Panel extends Component {
  render() {
    return (
      <div className='LayoutPanel'>
        <Routes>
          <Route path="/" element={<Home /> } exact></Route>
          <Route path="/Home" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/List" element={<List />} />
          <Route path="/PlayList/:playlistid" element={<PlayList />} />
          <Route path="/Album/:albumid" element={<Album />} />
          <Route path="/Result" element={<Result />} />
          <Route path='/Player/:playerid' element={<Player />}></Route>
          <Route path='/User/:userid' element={<User />}></Route>
        </Routes>
      </div>
    )
  }
}
