import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const UserHeader = ({ onClick, user, pointer }) => {
  return (
    <UserHead>
      <div className={`user-header-wrapper ${pointer ? "pointer" : undefined}`} onClick={onClick}>
        <div className="user-header-icon"></div>
        <Typography component="h1" variant="h5" align="center">
          {user && user.username} <br />
        </Typography>
      </div>
    </UserHead>
  );
};

export default UserHeader;

const UserHead = styled.div`
  font-size: 1.5rem;
  background: inherit;
  display: flex;
  min-width: 0;
  word-break: break-all;

  .user-header-wrapper {
    display: flex;
  }

  .pointer {
    cursor: pointer;
  }

  .user-header-icon {
    min-width: 2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: black;
    // margin: 0;
    margin-right: .5rem;
  }
`;
