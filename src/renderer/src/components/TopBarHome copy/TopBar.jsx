import React, { Component } from 'react'
import './TopBar.css'
import { isnull } from '../../function/fn'
export default class TopBar extends Component {

    componentDidMount(){
        if(!isnull(this.props.title)){
            this.setState({title: this.props.title})
        }
    }
    state = {
        title : '',
    }
    render() {
        const { title } = this.state
        return (
            <div className='TopBarHome-cont'>
                <p className='TopBarHome-title'>{title}</p>
            </div>
        )
    }
}
