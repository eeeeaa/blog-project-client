import styles from "../../styles/common/navbar.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

NameLogo.propTypes = {
  title: PropTypes.string,
};

NavItem.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};

function NameLogo({ title }) {
  return <h1 className={styles["cv-title"]}>{title}</h1>;
}

function NavItem({ url, label }) {
  return (
    <Link to={url} className={styles["nav-item"]}>
      <li>{label}</li>
    </Link>
  );
}

function MenuSection() {
  return (
    <ul className={styles["nav-menu-list"]}>
      <NavItem url="/" label={"Home"} />
      <NavItem url="/login" label={"Login"} />
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

export default function Navbar() {
  return (
    <div className={styles["nav-bar"]}>
      <Menu />
    </div>
  );
}
