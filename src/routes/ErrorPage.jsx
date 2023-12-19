import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h2 className={styles.title}>404</h2>
      <p className={styles.message}>Page not found</p>
      <span> Go to page </span>
      <Link to="/Albums" className={styles.link}>
        Albums
      </Link>
    </div>
  );
}
