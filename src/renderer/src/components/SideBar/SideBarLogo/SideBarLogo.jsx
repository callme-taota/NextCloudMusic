import React, { Component } from 'react'
import { Theme_State } from '../../../function/Pool/Pool' 
import "./SideBarLogo.css"
import { PlaySquareOutlined } from '@ant-design/icons'

export default class SideBarLogo extends Component {
  changeTheme = () => {
    let theme = Theme_State.get();
    let model = theme.model;
    let arr = ['light', 'dark'];
    let flag = arr.indexOf(model);
    if(flag +1 === arr.length){
      flag=0;
    }else{
      flag=flag +1;
    }
    model = arr[flag];
    theme.model = model;
    Theme_State.set(theme);
  }
  render() {
    return (
      <div className='sidebar-logo-c' onClick={this.changeTheme}>
        <div className='sidebar-logo-lable'>
            <div className='sidebar-logo-logo'><PlaySquareOutlined  /></div>
            <div className='sidebar-logo-title'>NextCloudMusic</div>
        </div>
      </div>
    )
  }
}
