import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Home = (props) => {
  const [welcome, setWelcome] = useState(false);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setWelcome(true);
  }, []);

  const handleClick = (e) => {
    const value = e.target.value;
    setWelcome(false);
    setTimeout(() => {
      setRedirect(value);
    }, 2000);
    setTimeout(() => {
      props.history.push(`/${value}`);
    }, 2500);
  };

  return (
    <Hero redirect={redirect}>
      <HeadersContainer welcome={welcome}>
        <h1>Bercord</h1>
        <h2>Connect Smart</h2>
      </HeadersContainer>
      <ButtonsContainer>
        <ButtonContainer>
          <Button left welcome={welcome} value="register" onClick={handleClick}>
            Register
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button right welcome={welcome} value="signin" onClick={handleClick}>
            Sign In
          </Button>
        </ButtonContainer>
      </ButtonsContainer>
    </Hero>
  );
};

export default Home;

const Hero = styled.div`
  height: 100vh;
  width: ${(props) =>
    props.redirect === "signin" || props.redirect === "register" ? 50 : 100}%;
  transform: translateX(
    ${(props) => (props.redirect === "register" ? 100 : 0)}%
  );
  background-image: url("/img/daniel-korpai-r73OFSry5AI-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: all 0.5s ease-out;
  display: grid;
  place-items: center;
`;

const HeadersContainer = styled.div`
  color: blue;
  text-align: center;
  font-size: 2rem;

  h1 {
    margin-bottom: 2rem;
    opacity: ${(props) => (props.welcome ? 1 : 0)};
    transition: 0.5s ease-out;
  }

  h2 {
    opacity: ${(props) => (props.welcome ? 1 : 0)};
    transition: 0.5s ease-out;
    transition-delay: 0.5s;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  overflow: hidden;
`;
const Button = styled.button`
  background-color: blue;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  transition-property: transform, background-color;
  transition-duration: 0.5s, 0.5s;
  animation-timing-function: ease-out, ease-in;
  transition-delay: ${(props) => (props.left ? 1 : 1.5)}s, 0s;
  border-top-${(props) => (props.left ? "left" : "right")}-radius: 3rem;
  border-bottom-${(props) => (props.left ? "left" : "right")}-radius: 3rem;
  transform: translateX(${(props) => (props.left ? 100 : -100)}%);  
  ${(props) => props.welcome && "transform: translateX(0%);"}
  &:hover {
    background-color: rgb(81, 75, 255);
  }


`;
