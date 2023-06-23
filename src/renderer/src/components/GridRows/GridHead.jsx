import React, { Component } from 'react'

import './GridRows.css'

export default class GridHead extends Component {

    componentDidMount(){
        if(this.props.name){
            this.setState({name : this.props.name})
        }
        if(this.props.author){
            this.setState({ author: this.props.author })
        }
        if(this.props.cds){
            this.setState({ cds: this.props.cds })
        }
        if(this.props.id){
            this.setState({ id: this.props.id })
        }
        if(this.props.time){
            this.setState({ time: this.props.time })
        }
    }


    state = {
        name : '标题',
        author : '作者',
        cds : '专辑',
        id :'#',
        time : '时间'
    }


    render() {

        const { name, author, cds, id,time } = this.state

        return (
            <div className='GridHead'>
                <div className='Gridrows-tx Gridrows-tx-id'>{id}</div>
                <div className='Gridrows-tx Gridrows-tx-name'>{name}</div>
                <div className='Gridrows-tx Gridrows-tx-aut'>{author}</div>
                <div className='Gridrows-tx Gridrows-cds'>{cds}</div>
                <div className='Gridrows-time'>{time}</div>
            </div>
        )
    }
}
