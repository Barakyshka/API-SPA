import React, { useEffect, useState, Suspense } from "react";
import { useLoaderData, Await, Link, useRouteError } from "react-router-dom";
import styles from "./User.module.css";
import { BiPhotoAlbum } from "react-icons/bi";

export const loader = async ({ params: { id } }) => {
  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const albumsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`
    );

    if (!userResponse.ok || !albumsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const user = await userResponse.json();
    const albums = await albumsResponse.json();

    return { user, albums };
  } catch (error) {
    console.error("Error loading user data:", error);
    throw error;
  }
};

export default function User() {
  const { user, albums, error } = useLoaderData(loader);
  const routeError = useRouteError();

  useEffect(() => {
    if (error || routeError) {
      console.error("Error in User component:", error || routeError);
    }
  }, [error, routeError]);

  if (!user || !albums || routeError) {
    return <div>Error: {error?.message || "Failed to load data"}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={{ user, albums }}>
        {({ user, albums }) => (
          <div>
            <div className={styles.userInfo}>
              <div className={styles.name}> {user.name} </div>
              <div> Username: {user.username} </div>
              <Link to={`mailto:${user.email}`}>Email: {user.email}</Link>
              <div> Phone: {user.phone} </div>
              <Link to={user.website}>Site: {user.website}</Link>
            </div>

            <div>
              <h2>Albums</h2>
              <ul className={styles.albumList}>
                {albums.map((album) => (
                  <li key={album.id}>
                    <BiPhotoAlbum size={17} className="icon" />
                    <Link
                      to={`/albums/${album.id}`}
                      className={styles.albumListItem}
                    >
                      {album.title.charAt(0).toUpperCase() +
                        album.title.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
