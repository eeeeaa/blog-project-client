import styles from "../../styles/common/navbar.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppContext } from "../../utils/contextProvider";
import { useContext } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { SlHome } from "react-icons/sl";

NameLogo.propTypes = {
  title: PropTypes.string,
};

NavItem.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};

UserProfile.propTypes = {
  username: PropTypes.string,
};

function NameLogo({ title }) {
  const { userProfile } = useContext(AppContext);
  return (
    <div className={styles["blog-logo-layout"]}>
      <h1 className={styles["blog-title"]}>{title}</h1>
      <UserProfile username={userProfile.username} />
    </div>
  );
}

function NavItem({ url, label, icon = null }) {
  return (
    <Link to={url} className={styles["nav-item"]}>
      <li className={styles["nav-item"]}>
        {icon}
        {label}
      </li>
    </Link>
  );
}

function UserProfile({ username }) {
  if (!username)
    return <div className={styles["user-profile"]}>not logged in</div>;
  return <div className={styles["user-profile"]}>user: {username}</div>;
}

function MenuSection() {
  const { userProfile } = useContext(AppContext);
  return (
    <ul className={styles["nav-menu-list"]}>
      <NavItem url="/" label={"Home"} icon={<SlHome />} />
      <NavItem url="/login" label={"Login"} icon={<MdOutlineLogin />} />
      {userProfile.username !== undefined ? (
        <>
          <NavItem url="/post/create" label={"Create Post"} />
        </>
      ) : (
        <div />
      )}
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
