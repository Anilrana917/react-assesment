import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import { Photo } from "./types";
import "./styles/App.css";

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<Photo[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleFavorite = (photo: Photo) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === photo.id)
        ? prevFavorites.filter((fav) => fav.id !== photo.id)
        : [...prevFavorites, photo]
    );
  };

  const loadPhotos = async (page: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
    );
    const newPhotos: Photo[] = await response.json();
    setPhotos((prevPhotos) => {
      const newUniquePhotos = newPhotos.filter(
        (newPhoto) => !prevPhotos.some((photo) => photo.id === newPhoto.id)
      );
      return [...prevPhotos, ...newUniquePhotos];
    });
  };

  useEffect(() => {
    loadPhotos(page);
  }, [page]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard favorites={favorites} />} />
        <Route
          path='/list'
          element={
            <List
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              photos={photos}
              loadMorePhotos={() => setPage((prevPage) => prevPage + 1)}
              scrollPosition={scrollPosition}
              setScrollPosition={setScrollPosition}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
