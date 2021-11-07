import "./sidebar.scss";
import { Link } from "react-router-dom";

const SideBar = ({ isSidebarOpen, setSidebarOpen }) => {
  const sideBarMenuLis = [
    {
      className: "sideBarMenuLis",
      href: "/dashboard",
      text: "Dashboard"
    },
    {
      className: "sideBarMenuLis",
      href: "/payments",
      text: "Payments"
    },
    // {
    //   className: "sideBarMenuLis",
    //   href: "#invoices",
    //   text: "Invoices"
    // },
    // {
    //   className: "sideBarMenuLis",
    //   href: "/pay-notifs",
    //   text: "Instant Pay Notifications"
    // },
    {
      className: "sideBarMenuLis",
      href: "/",
      text: "Store Settings"
    }
    // {
    //   className: "sideBarMenuLis",
    //   href: "#accountSettings",
    //   text: "Account Settings"
    // },
    // {
    //   className: "sideBarMenuLis",
    //   href: "#affiliateProgram",
    //   text: "Affiliate Program"
    // },
    // {
    //   className: "sideBarMenuLis",
    //   href: "#cryptoToFiat",
    //   text: "Crypto To Fiat"
    // },
    // {
    //   className: "sideBarMenuLis",
    //   href: "#coinSettings",
    //   text: "Coin Settings"
    // }
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
