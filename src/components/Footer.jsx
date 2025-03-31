import styled from "styled-components";

function Footer() {
  const Continer = styled.div`
    border: solid;
    display: flex;
    justify-content: space-between;
  `;
  return (
    <Continer>
      <h1> Save </h1>
      <h1> List </h1>
      <h1> About </h1>
    </Continer>
  );
}

export default Footer;
