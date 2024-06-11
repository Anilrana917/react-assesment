import React from "react";
import { Photo } from "../types";

interface PhotoItemProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photo: Photo) => void;
}

function PhotoItem({ photo, isFavorite, onToggleFavorite }: PhotoItemProps) {
  return (
    <div>
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <h3>{photo.title}</h3>
      <button onClick={() => onToggleFavorite(photo)}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default PhotoItem;
