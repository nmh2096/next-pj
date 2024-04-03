import styled from "styled-components";

export const NoteListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap:15px ;

  .sigle-card {
    width: 24%;
    box-shadow: 0 3px 3px gray;
    border-radius: 8px;
    padding: 10px;
    background-color: white;
    .header {
      padding-bottom: 5px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid red;
      .pointer {
        margin: 2px
      }
    }
    .body {
      padding: 10px 0 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .badge {
        font-size: 15px;
        background-color: red;
        padding: 2px 5px;
        border-radius: 10px;
        color: white;
      }
    }
  }
  .btn-add {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 0;
    width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
  }
`