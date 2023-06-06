import { React } from 'react'
import './ArtistsLink.css'
import { useNavigate } from 'react-router-dom';
import PubSub from 'pubsub-js';

export default function ArtistsLink({ art }) {

    const navigate = useNavigate();

    const goAl = (e) => {
        e.stopPropagation();
        navigate('/player/'+e.target.id);
        PubSub.publish('newPlayer', e.target.id);
    }

    return (
        <span>
            {
                art.map((a, index) => {
                    const isLastElement = index === art.length - 1;
                  
                    return (
                      <>
                        <span onClick={goAl.bind(this)} id={a.id} className='ArLink-name'>{a.name}</span>
                        {!isLastElement && <span>/</span>}
                      </>
                    );
                  })              
            }
        </span>
    )
}
