import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import BaseTable, {
  AutoResizer,
  normalizeColumns,
  Column,
  callOrReturn
} from "react-base-table";
import "react-base-table/styles.css";

import { Content, Empty } from "./styles";

import SelectionCell from "../SelectionCell";

const Table = ({
  data,
  children,
  rowKey,
  headerHeight,
  rowHeight,
  onColumnSort,
  onClickRow,
  rowClassName,
  columns,
  selectable,
  onRowSelect,
  onSelectedRowsChange,
  selectionColumnProps
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = ({ rowData, rowIndex }) => {
    if (selectedRowKeys === undefined) {
      setSelectedRowKeys(selectedRowKeys);
    }

    onRowSelect({ rowData, rowIndex });
    onSelectedRowsChange(selectedRowKeys);
  };

  /** aplica o efeito de seleção nas linhas */
  const selectedRowCurrent = ({ rowData, rowIndex }) => {
    console.log(rowClassName);
    const rowClass = rowClassName
      ? callOrReturn(rowClassName, { rowData, rowIndex })
      : "";
    const key = rowData[rowKey];
    return [rowClass, selectedRowKeys.includes(key) && "row-selected"]
      .filter(Boolean)
      .concat(" ");
  };

  let _columns = columns || normalizeColumns(children);

  if (selectable) {
    const selectionColumn = {
      width: 40,
      flexShrink: 0,
      resizable: false,
      frozen: Column.FrozenDirection.LEFT,
      rowKey,
      align: "right",
      cellRenderer: SelectionCell,
      ...selectionColumnProps,
      key: "__selection__",
      selectedRowKeys,
      onChange: handleSelectChange
    };
    _columns = [selectionColumn, ..._columns];
  }
  return (
    <Content>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            data={data}
            width={width}
            height={height}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            rowClassName={selectedRowCurrent}
            rowKey={rowKey}
            onColumnSort={onColumnSort}
            emptyRenderer={<Empty>Sem informações no momento</Empty>}
            columns={_columns}
            rowEventHandlers={{
              onClick: onClickRow
            }}
          >
            {children}
          </BaseTable>
        )}
      </AutoResizer>
      <footer>
        {selectedRowKeys.length
          ? `${selectedRowKeys.length} pokemons selecionados`
          : ""}
      </footer>
    </Content>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  rowKey: PropTypes.string,
  sortBy: PropTypes.object,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  onColumnSort: PropTypes.func,
  onClickRow: PropTypes.func,
  onDoubleClickRow: PropTypes.func,
  rowClassName: PropTypes.func
};

Table.defaultProps = {
  sortBy: {}
};

export default memo(Table);
