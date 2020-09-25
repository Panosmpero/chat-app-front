import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Sidebar = ({ onClick, show, logout }) => {
  const { pathname } = useLocation();

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
  background-color: var(--background-dark);
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
      background-color: var(--background-main);
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
