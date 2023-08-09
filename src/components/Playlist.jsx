import React from "react";
import Track from "./Track";

export default function Playlist({playlist,removeTrack}) {
  const tracks = playlist.map((track,i)=><Track key={"t" + i} track={track} action={removeTrack} playlist/>)

  return (
    <div>
      <h2>Tracklist</h2>
      <div className="list">        
        { tracks }
      </div>
    </div>
    )
}
