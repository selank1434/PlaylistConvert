import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlaylistItem, PlaylistItemListResponse, PlaylistListResponse } from './types';


//ok this is going to get the total amount of items 
interface InfoProps {
  playlistItems: PlaylistItemListResponse | undefined;
  setPlaylistsYT: React.Dispatch<React.SetStateAction<PlaylistItemListResponse | undefined>>;
}

const InfoListComponent: React.FC<InfoProps> = ({playlistItems,setPlaylistsYT}) => {
  if (playlistItems === undefined){
    return (<div></div>);
  }
  const handleRemoveItem = (index:number) => {
    const updatedList = [...playlistItems.items];
    updatedList.splice(index, 1);
    setPlaylistsYT({ ...playlistItems, items: updatedList });
  };
  //bruh this is wrong what we want is the 
  const updatedItems = playlistItems.items;
  return (
    <div className="container mt-4">
      <h3>List Group with Close-out Feature</h3>
      <ul className="list-group">
        {updatedItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item.snippet.title}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleRemoveItem(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoListComponent;
