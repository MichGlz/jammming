import React from 'react'

export default function Track({track, action, playlist }) {
  const id = track.name.split(" ")[0].toLowerCase();

  const handleClick = (e) =>{
    action(track)
  }

  return (
    <div className={playlist ? 'track playlist': 'track'}>
        <div className="info">
          <h3>{track.name}</h3>
          <p className='artist'>{track.artist}</p>
          <p className='album'>{track.album}</p>
        </div>
        <button id={id} onClick={handleClick} className='add-track'>{!playlist?<span>&#x1F449;</span>:<span>&#x1F448;</span>}</button>        
    </div>
  )
}
