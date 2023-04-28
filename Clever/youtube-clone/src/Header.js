import React from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Avatar from "@mui/material/Avatar";
import SearchIcon from '@mui/icons-material/Search';

function HEader() {
  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon />
        <img
          className="header__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="logo"
        />
      </div>
      <div className="header__input">
        <input placeholder="Search" type="text" />
        <SearchIcon className="header__inputButton"/>
      </div>
      <div className="header__icons">
        <VideoCameraBackIcon className="header__icon" />
        <AppsIcon className="header__icon"/>
        <NotificationsActiveIcon className="header__icon"/>
        <Avatar className="header__icon"
          img
          src="https://media.licdn.com/dms/image/C5603AQGH6mf4xYhg6w/profile-displayphoto-shrink_800_800/0/1650564424142?e=2147483647&v=beta&t=3CgQZaNz6qACdAzIpCwdEZjGZ7xnxwcYF70GDw6aKa4"
        />
      </div>
    </div>
  );
}

export default HEader;
