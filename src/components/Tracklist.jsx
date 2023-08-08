import React from "react";
import Track from "./Track";


export default function Tracklist({tracklist}) {

  console.log(tracklist);

  const tracks = tracklist.map((track,i)=><Track key={"t" + i} track={track}/>)

  return (
    <div>
      <h2>Tracklist</h2>
      <table>
        <tr>
          <th>name</th>
          <th>artist</th>
          <th>album</th>
          <th>&#x2795;</th>
        </tr>
        { tracks }
      </table>
    </div>
    )
}
