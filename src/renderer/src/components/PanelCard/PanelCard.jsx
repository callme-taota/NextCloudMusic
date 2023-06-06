import React, { Component } from 'react'
import './PanelCard.css'
import { isnull, SuperClass } from '../../function/fn';
import { EllipsisOutlined } from '@ant-design/icons'
export default class PanelCard extends Component {
    componentDidMount () {
        if (!isnull(this.props.title)){
            this.setState({title: this.props.title});
        }
        if (!isnull(this.props.columns)){
            this.setState({columns: this.props.columns});
        }
        if(!isnull(this.props.top)){
            this.setState({top: this.props.top});
        }
        if(!isnull(this.props.morebtn)){
            this.setState({morebtn: this.props.morebtn});
        }
    }
    state = {
        title : 'For You',
        top:false,
        columns:5,
        morebtn : false
    }
    letMore = () => {
        if(typeof this.props.ClickEvent === 'function'){
            this.props.ClickEvent();
        }
    }
    render() {
        const {title,columns,top,morebtn} = this.state;
        return (
            <div className={SuperClass('PanelCard-cont','PanelCard-top',top)}>
                <div className='PanelCard-bg'>
                   <p className='PanelCard-title'>{title}</p>
                    <div className={SuperClass('PanelCard-grid', 'PanelCard-grid', true, columns)}>
                        {this.props.children}
                    </div>
                    {
                        morebtn ? (
                            <div className='PanelCard-showmore'>
                                <EllipsisOutlined className='PanelCard-showmore-btn' onClick={this.letMore} />
                            </div>
                        ):''
                    }
                </div>
            </div>
        )
    }
}
