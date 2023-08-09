import React from "react";
import Track from "./Track";


export default function Tracklist({tracklist, addTrack}) {

  const tracks = tracklist.map((track,i)=><Track key={"t" + i} track={track} action={addTrack} />)

  return (
    <div>
      <h2>Tracklist</h2>
      <div className="list">        
        { tracks }
      </div>
    </div>
    )
}
