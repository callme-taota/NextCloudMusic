import React, { Component } from 'react'
import ArtistsLink from '../Artists_Link/ArtistsLink'
import './GridRows.css'

export default class GridRows extends Component {

    state = {
        name : '',
        author : '',
        cds : '',
        id : '1',
        time : ''
    }
    
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

    

    render() {

        const { name, author, cds, id,time } = this.props

        return (
            <div className='GridRows'>
                <div className='Gridrows-tx Gridrows-tx-id'>{id}</div>
                <div className='Gridrows-tx Gridrows-tx-name'>{name}</div>
                <div className='Gridrows-tx Gridrows-tx-aut'><ArtistsLink art={author}></ArtistsLink></div>
                <div className='Gridrows-tx Gridrows-cds'>{cds}</div>
                <div className='Gridrows-time'>{time}</div>
            </div>
        )
    }
}
