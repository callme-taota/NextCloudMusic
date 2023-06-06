import React, { Component } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'

import './Result.css'
// import { SuperSearch } from '../../function/api';


export default class Result extends Component {

    async componentDidMount () {
        // let data = await SuperSearch(keyword);
        // this.setState({ data });
    }

    state = {
        data : {},
    }

    render() {
        return (
            <div className='ResultPg'>
                <SearchBar></SearchBar>
                111
            </div>
        )
    }
}
