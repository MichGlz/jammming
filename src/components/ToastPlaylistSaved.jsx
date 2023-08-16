import React, {useEffect} from 'react'


export default function ToastPlaylistSaved({userName, playlistName, noTracks, setIsPlaylistSaved,resetData}) {
  
  useEffect(()=>{
    setTimeout(() => {
        resetData()
        setIsPlaylistSaved(false)
    }, 4000);
  },[])  

  return (
    <div className="toast-wrapper">
        <div className='toast'>
            <h2>Hi {userName}!</h2>
            <h3>Your playlis: {playlistName}</h3>
            <p>With {noTracks} tracks, is now saved in your Spotify account</p>
        </div>
    </div>
  )
}
