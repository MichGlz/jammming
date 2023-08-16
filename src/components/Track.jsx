import React from 'react'

export default function Track({track, action, playlist }) {
  //const id = track.name.split(" ")[0].toLowerCase();

  const handleClick = (e) =>{
    action(track)
  }

  const class1=playlist?'playlist':''
  const class2=track.selected?'selected':''

   

  return (
    <div className={`track ${class1} ${class2}`}>
        <div className="info">
          <h3>{track.name}</h3>
          <p>
            {track.artists.map((art, i)=><span key={art.id} className='artist'>{i>0&&', '}{art.name}</span>).slice(0,5)} / <span className='album'>{track.album.name}</span>
          </p>
        </div>
        <button onClick={handleClick} className='add-track'>{!playlist?!track.selected?<span>&#x1F449;</span>:<span>&#128076;</span>:<span>&#x1F448;</span>}</button>        
    </div>
  )
}
