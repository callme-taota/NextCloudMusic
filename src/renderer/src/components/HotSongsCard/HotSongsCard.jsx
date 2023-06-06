import React, { useEffect, useState } from 'react'
import './HotSongsCard.css'

const HotSongsCard = ({ HotSearchData, search,range }) => {
    const [Data, SetData] = useState([]);
    useEffect(() => {
        let r1 = (range-1)*5;
        let r2 = (range)*5;
        let data = HotSearchData.slice(r1,r2);
        SetData(data);
    }, [HotSearchData, range])
    const handleSearch = (e) => {
        search(e.searchWord);
    }

    return (
        <div>
            {
                Data.map((obj,index)=>{
                    return(
                        <div className='Hotsongs-song' key={obj.searchWord} onClick={handleSearch.bind(this, obj)} >
                            <div className='Hotsongs-left'>
                                <p className='Hotsongs-num'>
                                    {(range-1)*5+index+1}
                                </p>
                            </div>
                            <div className='Hotsongs-right'>
                                <p className='Hotsongs-wd'>{obj.searchWord}</p>
                                <p className='Hotsongs-ct'>{obj.content}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default HotSongsCard;