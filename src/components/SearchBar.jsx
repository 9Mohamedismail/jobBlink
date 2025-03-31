import styled from "styled-components";

function SearchBar() {
  const Continer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;

  const SearchBar = styled.input`
    border-radius: 8px;
    border: solid;
    padding: 0.5rem;
    width: 37%;
  `;
  return (
    <Continer>
      <SearchBar />
    </Continer>
  );
}

export default SearchBar;
