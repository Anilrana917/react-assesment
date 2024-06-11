import React, { useEffect, useRef, useCallback } from "react";
import PhotoItem from "../components/PhotoItem";
import BackButton from "../components/BackButton";
import { Photo } from "../types";
import debounce from "lodash.debounce";

interface ListProps {
  favorites: Photo[];
  toggleFavorite: (photo: Photo) => void;
  photos: Photo[];
  loadMorePhotos: () => void;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}

const List: React.FC<ListProps> = ({
  favorites,
  toggleFavorite,
  photos,
  loadMorePhotos,
  scrollPosition,
  setScrollPosition,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    debounce(() => {
      setScrollPosition(window.scrollY);
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1
      ) {
        loadMorePhotos();
      }
    }, 200),
    [setScrollPosition, loadMorePhotos]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); 
    };
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div ref={listRef}>
      <div
        className='list-head'
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <h1>List</h1>
        <BackButton />
      </div>
      <div className='card-list'>
        {photos.map((photo) => (
          <PhotoItem
            key={photo.id}
            photo={photo}
            isFavorite={favorites.some((fav) => fav.id === photo.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
