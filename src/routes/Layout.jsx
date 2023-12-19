import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";

const navigationLinks = [
  { to: "/albums", text: "Albums" },
  { to: "/", text: "Users" }
];

const Layout = () => {
  const renderNavLink = ({ to, text }) => (
    <NavLink
      key={to}
      to={to}
      end={to === "/albums"}
      className={({ isActive }) =>
        isActive ? styles.linkActive : styles.linkNotActive
      }
    >
      {text}
    </NavLink>
  );

  return (
    <div>
      <header className={styles.header}>
        {navigationLinks.map(renderNavLink)}
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <hr className={styles.hr} />
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>Created by: Garkusha Evgenii</div>
        <div className={styles.footerRight}>BSU: 2023</div>
      </footer>
    </div>
  );
};

export default Layout;
