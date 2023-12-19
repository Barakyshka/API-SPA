import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteError } from "react-router-dom";
import styles from "./Album.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  fetchAlbums,
  fetchAlbumData,
  fetchUserData,
  fetchUsers
} from "/src/components/api";

export default function Album() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAlbumData({ params: { id } });
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id, useRouteError()]);

  if (useRouteError()) {
    return <div>Error: {error ? error.message : "Failed to load data"}</div>;
  }

  if (!data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const { album, photos, user } = data;

  return (
    <div>
      <div className={styles.albumTitle}>{album.title}</div>
      <div>
        Created by:{" "}
        <Link to={`/users/${user.id}`} className={styles.creator}>
          {user.name}
        </Link>{" "}
      </div>

      <div className={styles.photos}>
        {photos.map((photo) => (
          <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
        ))}
      </div>
    </div>
  );
}
