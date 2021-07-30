import React, { useState, useEffect, memo } from "react";


import { Table, Column } from "./Table";
import api from './services/api';

import pokedex from "./pokedex";
import columnDefinition from "./column-definition";
import createPokedex from "./utils/create-pokedex";

const TableBase = () => {
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);

  useEffect( () =>{
    async function getcda(){
      const  res = await api.get('cdas');
      setData(res.data)
    }

    getcda()
  }, [])


  const [sortBy, setSortBy] = useState({ key: "id", order: "asc" });

  const [selectedRow, setSelectedRow] = useState(null);

  const dataTable = createPokedex(pokedex);

  const handleOnClickRow = (setSelectedRow) => ({ rowKey }) => {
    setSelectedRow(rowKey);

    // console.log(rowKey);
  };

  // const addClassNameRow = selectedRow => ({ rowData }) => {
  //   const { id } = rowData;
  //   const hasEqualRow = selectedRow === id;
  //   return hasEqualRow && "active";
  // };

  /** * ====== SORT  ====== */

  const handleOnColumnSort = (content, setContent, setSortBy) => ({
    key,
    order
  }) => {
    const dataSorted = [...content].sort((a, b) =>
      order === "asc" ? a[key] - b[key] : b[key] - a[key]
    );

    setSortBy({ key, order });
    setContent([...dataSorted]);
  };

  /** * ====== FIM SORT  ====== */

  /** ==== CAMPO DE BUSCA================== */

  // const searchProvider = e => {
  //   let newList = [];

  //   if (e.target.value !== "") {
  //     newList = content.filter(item => {
  //       const lc = item.name.toLowerCase();
  //       console.log(item.name);
  //       const filter = e.target.value.toLowerCase();

  //       return lc.includes(filter);
  //     });
  //   } else {
  //     newList = [];
  //   }
  //   setSearchResults(newList);
  // };
  /** === FIM CAMPO DE BUSCA================== */

  useEffect(() => {
    // setData(dataTable);
    setContent(data);
  }, []);

  const onRowSelect = (row) => {
    console.log(row);
  };

  const onSelectedRowsChange = (rows) => {
    //console.log(rows, "teste");
  };
  const alterData = content;
  return (
    <>
      {/* <HeaderTable>
        <InputSearch searchProvider={searchProvider} />
      </HeaderTable> */}
      <Table
        data={alterData}
        rowKey="id"
        headerHeight={30}
        rowHeight={30}
        sortBy={sortBy}
        onColumnSort={handleOnColumnSort(content, setContent, setSortBy)}
        onClickRow={handleOnClickRow(setSelectedRow)}
        // rowClassName={addClassNameRow(selectedRow)}

        // columns={columns}
        onRowSelect={onRowSelect}
        onSelectedRowsChange={onSelectedRowsChange}
        selectable
      >
        {columnDefinition.map(({ dataKey, ...restProps }) => (
          <Column key={dataKey} dataKey={dataKey} {...restProps} />
        ))}
      </Table>
    </>
  );
};

export default memo(TableBase);
