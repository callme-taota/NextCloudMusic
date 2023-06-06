import React, { Component } from 'react'
import './SideBarInfo.css'
import SideBarCard from '../SideBarCard/SideBarCard'

export default class SideBarInfo extends Component {
  render() {
    return (
      <div className='SideBarInfo-c'>
        <SideBarCard />
      </div>
    )
  }
}
