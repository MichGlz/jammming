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

  return (
    <section>
      <h1>jammmmming</h1>
      <Playlist></Playlist>
      <Tracklist tracklist={tracklist}></Tracklist>
      <button>save to spotify</button>
      <button>search</button>
    </section>
  )
}

export default App
