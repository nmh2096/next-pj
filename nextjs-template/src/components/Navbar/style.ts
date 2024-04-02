import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 30px;
  font-weight: 700;
  box-shadow:  0 3px 3px gray;
  background-color: #00b0ff;
  .left-side {
    display: flex;
    gap: 15px;
    align-items: center;
  }
`;
