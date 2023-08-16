import React, {useEffect, useState} from "react"
import { Routes, Route } from "react-router-dom";
import Playlist from "./Playlist"
import Tracklist from "./Tracklist"
import ToastPlaylistSaved from "./ToastPlaylistSaved";
import { getToken, CLIENT_ID } from "../index"

function App() {  
  const [token, setToken]=useState('');
  const [userToken, setUserToken]=useState('');
  const [searchInput, setSearchInput]=useState('');
  const [tracklist,setTracklist]=useState([]);
  const [userId,setUserId]=useState(null);
  const [userName,setUserName]=useState(null);
  
  const [playlist, setPlaylist]=useState([]);
  const [playlistName,setPlaylistName]=useState('');
  const [isPlaylistSaved, setIsPlaylistSaved]=useState(false) 

    
  useEffect(()=>{    
    const urlParams = new URLSearchParams(window.location.search)
    
    if(urlParams.get('code')){
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      const codeVerifier = localStorage.getItem('code_verifier')
      const redirectUri = 'http://localhost:5173/jammming'
      history.pushState({}, null, window.location.href.split('?')[0])

      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,        
      });

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('access_token', data.access_token);
          setUserToken(data.access_token)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  },[])
      
  useEffect(()=>{

    const  getProfile = ()=>{    
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then(data=>{
        console.log(data)
        setUserId(data.id);
        setUserName(data.display_name)
      })
    }
    
    userToken && getProfile()

  },[userToken])     
  

  useEffect(()=>{
    getToken(setToken)
    const id2 = setInterval(() => {
      getToken(setToken);
    }, 3590000);

    return () => {
      clearInterval(id2);
    };
   },[])

  const search = async () =>{
    console.log(userToken)
    const params = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    }

    const artistHref = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=50`,params)
    .then(res => res.json())  
    .then(data=>{
      console.log(data)
      const cleanTracks = data.tracks.items.map(track=>{
        return{
          id: track.id,
          uri: track.uri,
          name: track.name,
          artists: track.artists,
          album: track.album,
        }
      })
      console.log(cleanTracks)
      setTracklist(cleanTracks)
    })
  } 

  const loginSpotify = ()=>{
    
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(CLIENT_ID);  
    url += '&scope=' + encodeURIComponent('user-read-private');  
    url += '&redirect_uri=' + encodeURIComponent('http://localhost:5173/jammming');
    
    window.location= url
  }
  
  const savePlaylist = ()=>{
    const params = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`       
      },
      body:JSON.stringify({
        name: playlistName,
        description: "New playlist description",
        public: true
      })
    }
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, params)
    .then(res => res.json())  
    .then(data=> {
      console.log("PLaylist info", data)
      addTracks(data.id)
    })

    const addTracks = (listID)=>{
      const tracksUris = playlist.map(track=>track.uri)
      const addTrackParams={...params} 
      addTrackParams.body=JSON.stringify({
        uris:tracksUris,
        position:0
      })

      fetch(`https://api.spotify.com/v1/playlists/${listID}/tracks`,addTrackParams)
      .then(res => res.json())  
      .then(data=> {
        console.log("tracks added PLaylist", data)        
        setIsPlaylistSaved(true)
      })
    }

  }

  const resetData = ()=>{
    setSearchInput('')
    setPlaylist([])
    setTracklist([])
    setPlaylistName('')
  }

  const addTrack = (track)=>{
    const oldPlaylist = [...playlist];
    const slectedTrack = tracklist[tracklist.findIndex((t)=>t.uri===track.uri)]
    slectedTrack.selected=true    
    setPlaylist([track,...oldPlaylist]);
  }

  const removeTrack = (track) =>{    
    setPlaylist(playlist.filter((t)=>t.uri!=track.uri))
    const slectedTrack = tracklist[tracklist.findIndex((t)=>t.uri===track.uri)]
    slectedTrack.selected=false
    
  }

  //---------more secure spotify login---
  const generateRandomString = (length=45)=>{
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }
  
  const saveLoging = ()=>{
    const clientId = CLIENT_ID;
    const redirectUri = 'http://localhost:5173/jammming';

    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email playlist-modify-public';      

      localStorage.setItem('code_verifier', codeVerifier);

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
  }
  

  return (
    <div className="app-wraper" >
      <header className="header">
        <h1>Jammmmming! <span>&#129304;</span></h1>
        {userName && <h2>Welcome {userName}!</h2>}
        {isPlaylistSaved&&<ToastPlaylistSaved
          userName={userName}
          playlistName={playlistName}
          noTracks={playlist.length}
          setIsPlaylistSaved={setIsPlaylistSaved}
          resetData={resetData}
         /> }               
      </header>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="toast-wrapper">
                <div className="toast">
                  <h2>First loging to your shopify Account</h2>
                  <div className="flex-center">
                    <input 
                      type="button"
                      onClick={saveLoging}
                      value='&#128073; Login &#128072;'
                    />
                  </div>
                </div>
              </div>
            }
          />  
          <Route
            exact
            path="/jammming"
            element={        
              <section className="main-section">
                <div className="lists-wraper">
                  <div className="list-container">
                  
                    <div className="form-input">  
                      <input 
                        type="serch" 
                        id="searchMusic" 
                        name="searchMusic" 
                        className="search-bar"
                        placeholder="search your music..."
                        onKeyDown={e=>{
                          if(e.key == 'Enter'){
                              search()
                          }
                        }}
                        onChange={e=>setSearchInput(e.target.value)}
                        value={searchInput}
                      />
                      <button 
                        type="button" 
                        className="search-btn" 
                        onClick={search}
                      >
                        <span>&#128270;</span>
                      </button>
                    </div>
                      
                    <Tracklist 
                      tracklist={tracklist} 
                      addTrack={addTrack}
                    />
                  </div> 
                  <div className="list-container">                    
                    <Playlist 
                      playlist={playlist} 
                      removeTrack={removeTrack}
                      setPlaylistName={setPlaylistName}
                      playlistName={playlistName}
                      savePlaylist={savePlaylist}
                    />
                    
                  </div>
                </div>
              </section>
            }
          />        
        </Routes>
      
    </div>    
  )
}

export default App
