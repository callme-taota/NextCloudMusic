import React, { Component } from 'react'
import './List.css'
import { TopList } from '../../function/api'
import PanelCard from '../../components/PanelCard/PanelCard'
import SuperPlayListCard from '../../components/PlayListCard/PlayListCardSuper'
import ShowRoutePath from '../../components/ShowRoutePath/ShowRoutePath'
import TopBar from '../../components/TopBarHome copy/TopBar'
import UserCard from '../../components/UserCard/UserCard'
export default class List extends Component {

    state = {
        data : [],
        UserCardOpacity : 1,
        TopBarOpacity   : 0,
        offcialList : [],
        globalList : [],
    }

    async componentDidMount() {
        let data;
        data = await TopList();
        setTimeout(() => {
            let offcialList = data.slice(0,4)
            let globalList = data.slice(4)
            this.setState({data , offcialList , globalList});
        });
        window.addEventListener('scroll', this.handleScroll, true)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = (event) => {
        let pos = event.target.scrollTop
        let DebounceOpacity = 1;
        if (pos < 125) {
            let UserCardOpacity = (125 - pos) / 125
            if (UserCardOpacity < DebounceOpacity - 0.15) {
                DebounceOpacity = UserCardOpacity
            }
        }
        if (pos > 125) {
            DebounceOpacity = 0;
        }
        this.setState({ TopBarOpacity: 1 - DebounceOpacity })
        this.setState({ UserCardOpacity: DebounceOpacity })

    }

    render() {
        const { offcialList, globalList } = this.state
        return (
            <div className='ListPg'>
                <ShowRoutePath title='排行榜' />
                <div style={{ opacity: this.state.UserCardOpacity, transition: '0.03s', display: this.state.UserCardOpacity === 0 ? 'none' : 'block' }}>
                    <UserCard />
                </div>
                <div style={{ opacity: this.state.TopBarOpacity, transition: '0.03s', display: this.state.TopBarOpacity === 0 ? 'none' : 'block' }}>
                    <TopBar title='排行榜' />
                </div>
                <PanelCard top={true} title='官方榜' columns='4'>
                    {
                        offcialList.map( obj => 
                            <SuperPlayListCard title={obj.name} imgUrl={obj.coverImgUrl} id={obj.id} key={obj.id}></SuperPlayListCard>
                            )   
                    }
                </PanelCard>
                <PanelCard title='全球榜'>
                    {
                        globalList.map(obj =>
                            <SuperPlayListCard title={obj.name} imgUrl={obj.coverImgUrl} id={obj.id} key={obj.id}></SuperPlayListCard>
                        )
                    }
                </PanelCard>
                <PanelCard title=' ' />
            </div>
        )
    }
}
