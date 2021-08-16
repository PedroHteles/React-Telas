import styled from "styled-components";

export const Content = styled.div`
  flex: 1 1 auto;
  height: 500px;

  .row-selected {
    background-color: #e3e3e3;
    font-weight: bold;
    transition: 250ms;
  }

  .BaseTable__row {
    /* color: #9ca2b3; */
  }

  .BaseTable__table-main {
    outline: none;

    &::-webkit-scrollbar {
      width: 5px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: #d0d3db;
    }
  }

  .BaseTable__header-row {
    background: #fff;
  }

  .BaseTable__header-cell:hover *:not(span) {
    color: #6899f8;

    &:before,
    &:after {
      background: #6899f8;
    }
  }

  .BaseTable__header-cell-text {
    color: #464749;
    font-size: 0.9em;
    user-select: none;

    &:hover {
      color: #6899f8;
    }
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
`;
