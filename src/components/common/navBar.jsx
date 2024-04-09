import styles from "../../styles/navBar.module.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { NavContext } from "../../utils/contextProvider";

NameLogo.propTypes = {
  title: PropTypes.string,
};

NavItem.propTypes = {
  label: PropTypes.string,
  pageIndex: PropTypes.number,
};

function NameLogo({ title }) {
  return <h1 className={styles["cv-title"]}>{title}</h1>;
}

function NavItem({ label, pageIndex }) {
  const handleNavClick = useContext(NavContext);
  return (
    <li
      className={styles["nav-item"]}
      onClick={() => handleNavClick(pageIndex)}
    >
      {label}
    </li>
  );
}

function MenuSection() {
  return (
    <ul className={styles["nav-menu-list"]}>
      <NavItem pageIndex={0} label={"Home"} />
      <NavItem pageIndex={1} label={"Login"} />
    </ul>
  );
}

function Menu() {
  return (
    <div className={styles["nav-menu-container"]}>
      <NameLogo title="Blog" />
      <MenuSection />
    </div>
  );
}

export default function NavBar() {
  return (
    <div className={styles["nav-bar"]}>
      <Menu />
    </div>
  );
}
