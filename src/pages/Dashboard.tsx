import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../types";

interface DashboardProps {
  favorites: Photo[];
}

const Dashboard: React.FC<DashboardProps> = ({ favorites }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to='/list'>
        <button>Go to List</button>
      </Link>
      <ul className='favorite-list'>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <img src={fav.thumbnailUrl} alt={fav.title} />
            <p>{fav.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
