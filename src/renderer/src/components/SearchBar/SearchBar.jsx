import React, {  useEffect  , useState  } from 'react'
import { SpaceKeyListener } from '../../function/Pool/Pool';
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

    const setFocus = (f) => {
      let obj = {'Listening' : !f};
      SpaceKeyListener.set(obj);
    }

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
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder='搜索'/>
            <button className='search-action' onClick={Handlesearch}></button>
        </div>
    )
}

export default SearchBar;
