import styled from "styled-components";

const Spinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.25);
  visibility: ${props => props.visible ? "visible" : "hidden"};

  &:after {
    content: "";
    width: 40px;
    height: 40px;
    border: 5px #3f51b5 solid;
    border-bottom: 5px rgba(0,0,0,0) solid;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 1s linear infinite;
  
    @keyframes rotate {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  }
`;


export default Spinner;
