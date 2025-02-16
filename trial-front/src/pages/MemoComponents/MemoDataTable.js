import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


const MemoDataTable = ({ data, search, hiddenColumns, selectedRows, onRowClick, sortColumn, onSortColumn }) => {
  const renderSortIndicator = (columnKey) => {
    if (sortColumn.key === columnKey) {
      return sortColumn.order === "asc" ? "↑" : sortColumn.order === "desc" ? "↓" : "";
    }
    return "";
  };

  const filterData = data.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <TableContainer component={Paper}>
      <Table className="memo-table">
        <TableHead className="memo-table-header">
          <TableRow>
            {["title", "target_date", "created_date", "persistence"].map((column) => (
              <TableCell key={column} onClick={() => onSortColumn(column)}>
                {column} {renderSortIndicator(column)}
              </TableCell>
            ))}
            {!hiddenColumns.includes("completed") && (
              <TableCell onClick={() => onSortColumn("completed_date")}>
                Completed Date {renderSortIndicator("completed_date")}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filterData.map((row) => (
            <TableRow
              key={row.id}
              hover
              onClick={() => onRowClick(row)}
              className={selectedRows.some((selected) => selected.id === row.id) ? "memo-table-row-selected" : ""}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.target_date}</TableCell>
              <TableCell>{row.created_date}</TableCell>
              <TableCell>{row.persistence}</TableCell>
              {!hiddenColumns.includes("completed") && <TableCell>{row.completed_date}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MemoDataTable;