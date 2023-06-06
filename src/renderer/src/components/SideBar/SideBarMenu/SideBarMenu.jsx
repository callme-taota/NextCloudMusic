import React, { Component } from 'react'
import SideBarBtn from '../SideBarBtn/SideBarBtn'
import './SideBarMenu.css'

export default class SideBarMenu extends Component {

    state = {
        data:[
            {
                title:'主菜单',
                child:[
                    {
                        btnindex:'1',
                        isfocus:false,
                        icon:'HomeOutlined',
                        text:'主页',
                        sep:true,
                        to:'home',
                    },
                    {
                        btnindex:'2',
                        isfocus:false,
                        icon:'BulbOutlined',
                        text:'发现',
                        sep:false,
                        to:'search',
                    },
                    {
                        btnindex:'3',
                        isfocus:false,
                        icon:'BarChartOutlined',
                        text:'榜单',
                        sep:false,
                        to:'list'
                    }
                ],
            },
            {
                title:'通用',
                child:[
                    {
                        btnindex:'4',
                        isfocus:false,
                        icon:'SettingOutlined',
                        text:'设置',
                        sep:false,
                        to:'setting',
                    },
                    {
                        btnindex:'5',
                        isfocus:false,
                        icon:'LogoutOutlined',
                        text:'登出',
                        sep:false,
                        to:'logout'
                    }
                ],
            },
        ],
        to :{
            'home': '1',
            'search': '2',
            'list': '3',
            'setting': '4',
            'logout': '5'
        }
    }

    componentDidMount(){
        let url = window.location.href
        let arr = url.split('/')
        let to = this.state.to;
        let btnindex = to[arr[3]]
        this.changefocus(btnindex)
    }

    changefocus=(btnindex)=>{
        let data  = this.state.data
        for(let i=0; i<data.length;i++){
            for(let j=0;j<data[i].child.length;j++){
                if(btnindex ===data[i].child[j].btnindex){
                    data[i].child[j].isfocus=!data[i].child[j].isfocus
                }else{
                    data[i].child[j].isfocus=false
                }
            }
        }
        this.setState({data})
    }

    render() {
        const {data} = this.state
        return (
            <div>
            {
                data.map((item)=>{return(
                    <div key={item.title}>
                        <div className='sidebarm-title'>{item.title}</div>
                        {item.child.map((btn)=>{return(
                            <div key={btn.btnindex}>
                                <SideBarBtn       
                                    to={btn.to}                     
                                    btnindex={btn.btnindex}
                                    isfocus={btn.isfocus}
                                    icon={btn.icon}
                                    hanldefocus={this.changefocus}
                                    sep={btn.sep}
                                >{btn.text}</SideBarBtn>
                                <div className='sidebarm-blankholder'></div>
                            </div>
                        )})}
                    </div>
                )})
            }
            </div>
        )
    }
}
