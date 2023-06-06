import React, { Component } from 'react'
import './ShowRoutePath.css' 
import { RightOutlined } from '@ant-design/icons'
import { isnull } from '../../function/fn'
export default class ShowRoutePath extends Component {
    componentDidMount() {
        if (!isnull(this.props.title)) {
            this.setState({ title: this.props.title })
        }
    }
    state = {
        title: ' ',
    }
    render() {
        const { title } = this.state
        return (
            <div className='Showrp-cont'>
                <p className='Showrp-h'>{title}</p>
                <RightOutlined className='Showrp-wd' />
            </div>
        )
    }
}
