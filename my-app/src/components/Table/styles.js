import styled from "styled-components";

export const Content = styled.div`
font-family: sans-serif;
display: flex;
flex-direction: column;
height: 500px;
width: 80.5%;
margin-left: auto;
margin-right: auto;
border-radius: 5px;
overflow: hidden;
border: solid 1.8px lightgray;
box-shadow: 5px 5px 10px gray;

  .row-selected {
    background-color: #e3e3e3;
    font-weight: bold;
    transition: 250ms;
  }

  .BaseTable__row {
     .b
     color: black;
     background:#FFFFFFF;
     font-size: 1.5em;
     &:nth-of-type(even) {
      background: #dfdfdf
      ;
    }
  }

  .BaseTable__body {
    &::-webkit-scrollbar{
      display: flex;
    }

    &::-webkit-scrollbar-track {
      background: #FFFFFF;
    }

    &::-webkit-scrollbar-thumb{
      background: #AAAAAA;
    }

  }



  .BaseTable__table-main {
    color: black;
    background-color: green;

    outline: none;
    background: white;

    &::-webkit-scrollbar {
      display: none;
    }
    

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: #d0d3db;
    }
  }

  .BaseTable__header-row {
    background: white;
    text-decoration: none;
  }
  .BaseTable__row.active {
    background: #afafaf;
  }


  .BaseTable__header-cell:hover *:not(span) {
    text-decoration: none;

    &:before,
    &:after {
      text-decoration: none;
    }
  }

  .BaseTable__header-cell-text {
    color: black;
    font-size: 0.9em;
    user-select: none;
    text-decoration: none;
    
  }

  .BaseTable__header {
    width: 100%
    background-color: white;
  }

  .BaseTable__header-cell {
    background-color: white;
    font-family: sans-serif;
    font-size: 120%;

  }

  .BaseTable__sort-indicator {
    font-size: 0;
    position: relative;
    margin: 0 0 0 5px;
    &:before,
    &:after {
      background: #464749;
      content: "";
      display: block;
      height: 2px;
      position: absolute;
      top: 7px;
      width: 6px;
    }
    &:before {
      border-radius: 5px 0 0 5px;
      left: 6px;
      transform: rotate(45deg);
    }
    &:after {
      border-radius: 0 5px 5px 0;
      left: 3px;
      transform: rotate(-45deg);
    }
  }

  .BaseTable__sort-indicator--descending {
    &:before {
      left: 3px;
    }
    &:after {
      left: 6px;
    }
  }

  

  footer {
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: end;
    height: 50px;
    align-items: center;
    padding: 20px;
    font-size: 13px;
    font-style: italic;
    margin-top: 500px;
  }
`;

export const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 16px;
  background: white;
  color: black;
`;

export const Cssselect = styled.div`
width: 100%
display: flex;
flex-direction: row;
justify-content: space-around;

.MuiNativeSelect-select {
  width: 226px;
  height: 36.5px;
  border-bottom: none;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 9px 4px 9px;
  color: #7E7E7E;
}

.MuiNativeSelect-select:hover {
  border: 1px solid black;
}

.MuiNativeSelect-select:focus {
  border: 1px solid blue;
  border-radius: 4px;
}



`;

