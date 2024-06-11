import React from "react";
import { Favorite } from "../types";

interface FavoriteListProps {
  favorites: Favorite[];
}

function FavoriteList({ favorites }: FavoriteListProps) {
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>{fav.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
