import React from "react";
import { Link, useLoaderData, useRouteError } from "react-router-dom";
import styles from "./Albums.module.css";
import { BiPhotoAlbum } from "react-icons/bi";

export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }
  const albums = await response.json();
  return { albums };
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const AlbumsItem = ({ album }) => (
  <div key={album.id} className={styles.albumItem}>
    <BiPhotoAlbum size={17} className="icon" />
    <Link to={`/albums/${album.id}`} className={styles.link}>
      <span className={styles.title}>{capitalizeFirstLetter(album.title)}</span>
    </Link>
  </div>
);

const Albums = () => {
  const { albums } = useLoaderData();
  const routeError = useRouteError();

  if (routeError) {
    return <div>Error: {routeError.message}</div>;
  }

  return (
    <div className={styles.container}>
      {albums.map((album) => (
        <AlbumsItem key={album.id} album={album} />
      ))}
    </div>
  );
};

export default Albums;
