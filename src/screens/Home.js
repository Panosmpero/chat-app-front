import React, { useEffect, useState } from "react";
import styled from "styled-components";

const delay = 0.5;

const Home = (props) => {
  const [welcome, setWelcome] = useState(false);
  const [redirect, setRedirect] = useState("");

  // start animation
  useEffect(() => {
    setWelcome(true);
  }, []);

  const handleClick = (e) => {
    // store value
    const value = e.target.value;

    // reverse animation trigger
    setWelcome(false);

    // hero image width 50%
    setTimeout(() => {
      setRedirect(value);
    }, delay * 5000);

    // redirect
    setTimeout(() => {
      props.history.push(`/${value}`);
    }, delay * 6000);
  };

  return (
    <Hero redirect={redirect}>
      <Container welcome={welcome}>
        <HeadersContainer welcome={welcome}>
          <h1>
            Bercord
            <div className="underline"></div>
          </h1>
          <h2>Connect Smart</h2>
        </HeadersContainer>
        <ButtonsContainer>
          <ButtonContainer>
            <Button
              left
              welcome={welcome}
              value="register"
              onClick={handleClick}
            >
              Register
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              right
              welcome={welcome}
              value="signin"
              onClick={handleClick}
            >
              Sign In
            </Button>
          </ButtonContainer>
        </ButtonsContainer>
      </Container>
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

  @media only screen and (max-width: 600px) {
    background-image: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Architects Daughter", cursive;
  text-align: center;
  padding: 1rem;
  width: auto;
  min-height: 50%;
  border-radius: 10px;
  background-color: rgb(192, 235, 251);
  box-shadow: 0 0 10px 1px black;
  transition: all 0.5s ease-out;
  transition-delay: ${(props) => (props.welcome ? 0 : delay * 4)}s;
  opacity: ${(props) => (props.welcome ? 1 : 0)};
`;

const HeadersContainer = styled.div`
  color: blue;
  font-size: 2rem;

  h1 {
    margin-bottom: 2rem;
    opacity: ${(props) => (props.welcome ? 1 : 0)};
    transition: 0.5s ease-out;
    transition-delay: ${(props) => (props.welcome ? delay * 1 : delay * 0)}s;
  }

  h2 {
    opacity: ${(props) => (props.welcome ? 1 : 0)};
    transition: 0.5s ease-out;
    transition-delay: ${(props) => (props.welcome ? delay * 2 : delay * 1)}s;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
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
  transition-delay: ${(props) =>
    props.left
      ? props.welcome
        ? delay * 3
        : delay * 2
      : props.welcome
      ? delay * 4
      : delay * 3}s, 0s;
  border-top-${(props) => (props.left ? "left" : "right")}-radius: 3rem;
  border-bottom-${(props) => (props.left ? "left" : "right")}-radius: 3rem;
  transform: translateX(${(props) => (props.left ? 110 : -110)}%);  
  ${(props) => props.welcome && "transform: translateX(0%);"}
  &:hover {
    background-color: rgb(81, 75, 255);
  }
`;
