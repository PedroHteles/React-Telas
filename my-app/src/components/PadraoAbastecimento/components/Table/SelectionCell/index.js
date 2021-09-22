import React from "react";
import { Container } from "./styles";

class SelectionCell extends React.PureComponent {
  handleChange = (e) => {
    const { rowData, rowIndex, column } = this.props;
    const { onChange } = column;

    onChange({ selected: e.target.checked, rowData, rowIndex });
  };

  render() {
    return (
      <Container>
        <button className="botao"  onClick={this.handleChange}>Editar</button>
      </Container>
    );
  }
}

export default SelectionCell;
