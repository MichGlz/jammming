import React, {useEffect, useState} from "react"
import Playlist from "./Playlist"
import Tracklist from "./Tracklist"

function App() {
  const arrTracks = [
    {
      name: 'malo',
      artist: 'julio',
      album: 'lunes'
    },
    {
      name: 'bueno',
      artist: 'junio',
      album: 'martes'
    },
    {
      name: 'mareulo',
      artist: 'februry',
      album: 'viernes'
    }
  ]
  
  const [tracklist,setTracklist]=useState(arrTracks);
  const [playlist, setPlaylist]=useState([]);

  const addTrack = (track)=>{
    //const oldTracklist = [...tracklist];
    const oldPlaylist = [...playlist];
    setTracklist(tracklist.filter((t)=>t!=track))
    setPlaylist([track,...oldPlaylist]);
  }
  const removeTrack = (track) =>{
    const oldTracklist = [...tracklist];
    setPlaylist(playlist.filter((t)=>t!=track))
    setTracklist([track,...oldTracklist]);
  }

  return (
    <div className="app-wraper" >
      <header className="header">
        <h1>jammmmming</h1>
      </header>
      <section className="main-section">
        <div className="lists-wraper">
        <div className="list-container">
          <button>search</button>     
          <Tracklist tracklist={tracklist} addTrack={addTrack}></Tracklist>
        </div> 
        <div className="list-container">
          <button>save to spotify</button>
          <Playlist playlist={playlist} removeTrack={removeTrack}></Playlist>
        </div>
        </div>
      </section>
    </div>
  )
}

export default App
