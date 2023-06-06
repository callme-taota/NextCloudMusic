import React, {  useEffect  , useState  } from 'react'

import './SearchBar.css'


const SearchBar = ({search}) => {
    const [kw,setkw] = useState('');
    useEffect(() => {
        document.addEventListener('keydown',handleKeyDown);
    })

    useEffect(()=>{
        return()=>{
            document.removeEventListener('keydown',handleKeyDown);
        }
    })

    const handleChange = (e) => {
        let k = e.target.value;
        setkw(k);
    }

    const Handlesearch = ( ) => {
        let keyword = kw;
        search(keyword)

    }

    const handleKeyDown = ( e ) => {
        if(e.keyCode ===13){
            Handlesearch();
        }
    }

    return (
        <div className='search-input-cont'>
            <input type="text" className='search-input'
            onKeyDown={(e)=>handleKeyDown(e)}
            value={kw}
            onChange={(e) => handleChange(e)}
            placeholder='搜索'/>
            <button className='search-action' onClick={Handlesearch}></button>
        </div>
    )
}

export default SearchBar;