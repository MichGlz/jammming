import React, { useState } from "react";
import Track from "./Track";
import { useEffect } from "react";
import EmojiPicker from 'emoji-picker-react';


export default function Playlist({playlist, removeTrack, setPlaylistName, playlistName, savePlaylist}) {
  
  const [isEditMode, setIsEditMode]=useState(true)
  const [listName, setListName]=useState('')
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false)
  const tracks = playlist.map((track,i)=><Track key={"t" + i} track={track} action={removeTrack} playlist/>)

  useEffect(()=>{
    setListName('')
    setIsEditMode(true)
    if(playlistName){
      setListName(playlistName)
      setIsEditMode(false)      
    }

  },[playlistName]);

  const handleClick = () =>{
    if(!isEditMode){
      setIsEditMode(true)
      return
    }
    setIsEditMode(false)
    setPlaylistName(listName)
    setIsEmojiPickerVisible(false)
    
  }
  const handleChange = (e) =>{
    setListName(e.target.value)
  }
  const addEmoji = (e)=>{
    setListName(listName + e.emoji)
  }

  return (
    <div>
        {!isEditMode?<div className="form-input">
        <input 
          type="button"
          name="save-list"
          onClick={savePlaylist}
          value='Save your list &#128190;'
          disabled={playlist.length<1 || !playlistName}
        />
        </div>:      
        <div className="form-input">           
          <input 
            type="text" 
            id="plName" 
            name="plName" 
            onChange={handleChange} 
            disabled={!isEditMode}
            value={listName}
            placeholder="your playlist name..."
          />
          <button type="button"
            className="emoji-btn" 
            onClick={(e)=>setIsEmojiPickerVisible(!isEmojiPickerVisible)}
          >            
            <span className="emoji-icon">&#9786;</span>            
          </button>
          <button type="button" onClick={handleClick} disabled={!listName}>
            <span className="tick">&#10004;</span>
          </button>          
          {isEmojiPickerVisible && <div className="emoji-picker-wrapper">
          <div className="form-input">
            <button
              className="emoji-btn" 
              onClick={(e)=>setIsEmojiPickerVisible(!isEmojiPickerVisible)}
            >
              <span className="close-icon">&#10007;</span>
            </button>  
          </div>
            <EmojiPicker
              onEmojiClick={addEmoji}
            />  
          </div>}                   
        </div>}

      <h2>Playlist{listName&&': ' + listName + ' '}{!isEditMode&&<button className="edit-btn" type="button" onClick={handleClick}><span className="edit">&#9997;</span></button>}</h2>        
      
      <div className="list">        
        { tracks }
      </div>      
    </div>
    )
}
