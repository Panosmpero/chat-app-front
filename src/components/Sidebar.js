import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginTop: "auto",
    alignSelf: "flex-end",
    minWidth: 120,
  },
  select: {
    backgroundColor: "var(--background-main)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--background-side)"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--red-text)"
    },
  },
  label: {
    color: "var(--white-text)"
  },
}));

const Sidebar = ({ onClick, show, logout }) => {
  const [theme, setTheme] = useState("bercord");
  const { pathname } = useLocation();
  const classes = useStyles();

  // clicking outside of sidebar -> hides it
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.closest(".sidebar-wrapper")) return;
      onClick(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  // when clicking sidebar link -> hide sidebar
  useEffect(() => {
    onClick(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // change theme
  useEffect(() => {
    document.documentElement.style.setProperty("--background-wrapper", theme === "bercord" ? "rgb(0, 0, 0)" : "rgb(66, 66, 66)");
    document.documentElement.style.setProperty("--background-dark", theme === "bercord" ? "#1b0056f3" : "#232323");
    document.documentElement.style.setProperty("--background-side", theme === "bercord" ? "rgb(198, 240, 243)" : "rgb(72, 72, 72)");
    document.documentElement.style.setProperty("--background-main", theme === "bercord" ? "#ffffff" : "rgb(113, 113, 113)");
    document.documentElement.style.setProperty("--red-text", theme === "bercord" ? "#f50057" : "#f50057");
    document.documentElement.style.setProperty("--white-text", theme === "bercord" ? "rgb(0, 0, 0)" : "rgba(255, 255, 255, 0.762)");
  }, [theme])

  return (
    <SidebarContainer show={show}>
      <SidebarWrapper show={show} className="sidebar-wrapper">
        <i
          style={{ fontSize: "4rem" }}
          className="fas fa-times"
          onClick={() => onClick(false)}
        ></i>
        <div className="sidebar-list">
          <div className="sidebar-icon"></div>
          <h1>Panos Beros</h1>
          <div style={{ marginBottom: "2rem", maxWidth: "100%" }}>
            berpanos@hotmail.com
          </div>
          <button>Change Username</button>
          <button>Change Password</button>
          <button onClick={() => logout()}>Logout</button>
          <FormControl notched="false" variant="outlined" className={classes.formControl}  >
            <InputLabel className={classes.label} id="theme-select-label">Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              id="theme-select"
              label="Theme"
              className={classes.select}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <MenuItem value="bercord">Bercord</MenuItem>
              <MenuItem value="discord">Discord</MenuItem>
            </Select>
          </FormControl>
        </div>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  pointer-events: none;
  transition: 0.3s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const SidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(15% + 14rem);
  background-color: var(--background-side);
  color: var(--white-text);
  z-index: 1001;
  pointer-events: all;
  transition: 0.3s ease;
  transform: translateX(${(props) => (props.show ? 0 : -100)}%);

  i {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    transform: translate(-20%, 5%);
    cursor: pointer;

    &:hover {
      color: var(--red-text);
    }
  }

  .sidebar-list {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    width: 100%;
    height: 100%;
    word-wrap: break-word;

    h1 {
      margin-top: 1rem;
      word-wrap: break-word;
      max-width: 100%;
    }

    .sidebar-icon {
      width: 5rem;
      height: 5rem;
      background-color: black;
      border-radius: 50%;
    }

    button {
      margin: 1rem 0;
      font-size: 1.5rem;
      border-radius: 10px;
      background-color: inherit;
      color: inherit;
      transition: all 0.3s ease;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -5%;
        height: 0.25rem;
        width: 0;
        background-color: var(--white-text);
        transition: all 0.3s ease;
      }

      &:hover {
        &::after {
          left: 0;
          right: 0;
          width: 100%;
        }
      }
    }
  }
`;

export default Sidebar;
