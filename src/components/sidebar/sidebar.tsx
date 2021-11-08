import "./sidebar.scss";
import { Link } from "react-router-dom";

const SideBar = ({ isSidebarOpen, setSidebarOpen }) => {
  const sideBarMenuLis = [
    {
      className: "sideBarMenuLis",
      href: "/registration",
      text: "Registration",
      key: 0
    },
    {
      className: "sideBarMenuLis",
      href: "/",
      text: "Home - Send a Payment",
      key: 1
    },
    {
      className: "sideBarMenuLis",
      href: "/payments",
      text: "Payments",
      key: 2
    },
    {
      className: "sideBarMenuLis",
      href: "/store-settings",
      text: "Store Settings",
      key: 3
    }
  ];

  return (
    <div className={"menu " + (isSidebarOpen && "active")}>
      <ul>
        {sideBarMenuLis.map((li) => {
          return (
            <li className={li.className}>
              <Link to={li.href}>{li.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
