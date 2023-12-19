import React from "react";
import {
  useNavigate,
  useLoaderData,
  Link,
  useRouteError
} from "react-router-dom";
import styles from "./Users.module.css";

export const loader = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();

    return { users };
  } catch (error) {
    console.error("Error loading users data:", error);
    throw error;
  }
};

const Users = () => {
  const navigate = useNavigate();
  const { users } = useLoaderData();
  const routeError = useRouteError();

  if (routeError) {
    return <div>Error: {routeError.message}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <Link
          className={styles.usersList}
          key={user.id}
          to={`/users/${user.id}`}
        >
          <div className={styles.user}>{user.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Users;
