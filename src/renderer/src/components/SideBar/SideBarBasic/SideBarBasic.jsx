import React, { Component } from 'react'
import SideBarMenu from '../SideBarMenu/SideBarMenu'
import SideBarLogo from '../SideBarLogo/SideBarLogo'
import SideBarInfo from '../SideBarInfo/SideBarInfo'
import './SideBarBasic.css'

export default class SideBarBasic extends Component {
    render() {
        return (
            <div className='SideBar'>
                <SideBarLogo />
                <SideBarMenu />
                <SideBarInfo />
            </div>
        )
    }
}
