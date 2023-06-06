import React, { Component } from 'react'
import './SideBarBtn.css'
import * as Icon from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default class SideBarBtn extends Component {

    componentDidMount() {
        if (this.props.btnindex) {
            this.setState({ btnindex: this.props.btnindex })
        }
        if (this.props.children) {
            this.setState({ text: this.props.children })
        }
        if (this.props.icon) {
            this.setState({ icon: this.props.icon })
        }
        if (this.props.isfocus) {
            this.setState({ isfocus: this.props.isfocus })
        }
        if (this.props.sep) {
            this.setState({ sep: this.props.sep })
        }
        if (this.props.to) {
            this.setState({ to: this.props.to })
        }
    }

    static getDerivedStateFromProps(props) {
        return { isfocus: props.isfocus };
    }

    handelClick = () => {
        let isfocus=this.state.isfocus
        this.setState({isfocus :!isfocus})
        if(isfocus===false) 
            this.props.hanldefocus(this.state.btnindex)
    }

    state = {
        btnindex: '1',
        isfocus: false,
        icon: 'HomeOutlined',
        text: '',
        sep: false,
        to:null,
    }

    rendericon = (name) => {
        return React.createElement(Icon[name])
    }

    render() {
        const { isfocus, text, icon, sep ,to} = this.state
        return (
            <Link to={"/"+to} className='too'>
                <div className={isfocus ? "Side-Btn-Acitive" : "Side-Btn"} onClick={this.handelClick.bind(this)}>
                    <span className='sidebtn-icon'>
                        {this.rendericon(icon)}
                        <span className={sep ? 'sidebtn-sep' : ''}></span>
                    </span>
                    <span className='sidebtn-wd'>{text}</span>
                </div>
            </Link>
        )
    }
}
