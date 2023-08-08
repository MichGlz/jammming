import React from 'react'

export default function Track({track}) {
  return (
    <tr>
        <td>{track.name}</td>
        <td>{track.artist}</td>
        <td>{track.album}</td>
        <td><button>&#x1F449;</button></td>
        
    </tr>
  )
}
