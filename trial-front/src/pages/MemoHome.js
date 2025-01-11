import React, {useState, useEffect} from "react";
import TabHeader from "../templates/TabHeader";
import "./styles/memo-main.css";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box,
  Button
} from "@mui/material";

// Memo {
//   id: number;
//   title : string;
//   target_date : Date;
//   created_date : Date;
//   completed_date : Date;
//   persistence : string;
//   status : string;
// }

const openData = [
    {  id:1, title: "Ops Alerts", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Weekly", status: "Open" },
    {  id:2,title: "Canon", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Daily", status: "Open"  },
    {  id:3,title: "Ops Alerts", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Monthly", status: "Open"  },
    {  id:4,title: "Canon", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Quarterly", status: "Open"  },
    {  id:5,title: "Ops Alerts", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Yearly", status: "Open"  },
    {  id:6,title: "Canon", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Fortnightly", status: "Open"  },
    {  id:7,title: "Ops Alerts", target_date: "2022-12-12", created_date: "2022-12-12", persistence: "Half Yearly", status: "Open"  },
];

const completedData = [
    {  id:9,title: "Ops Alerts",  target_date: "2022-12-12", created_date: "2022-12-12", completed_date: "2022-12-12", persistence: "Fortnightly", status: "Completed" },
    {  id:10,title: "Canon",  target_date: "2022-12-12", created_date: "2022-12-12", completed_date: "2022-12-12", persistence: "Monthly", status: "Completed" },
    {  id:8,title: "Ops Alerts", target_date: "2022-12-12", created_date: "2022-12-12", completed_date: "2022-12-12", persistence: "Quarterly", status: "Completed" },
];

const StatusButtons = ({ state, toggleState, search, setSearch }) => (
  <div className="memo-header">
    <input
      className="memo-search"
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <div className="memo-status-buttons">
      <button
        onClick={() => toggleState(false)}
        disabled={!state}
        className={state ? "status-button active-button" : "status-button inactive-button"}
      >
        Open
      </button>
      <button
        onClick={() => toggleState(true)}
        disabled={state}
        className={!state ? "status-button active-button" : "status-button inactive-button"}
      >
        Completed
      </button>
    </div>
  </div>
);

const DataTable = ({ data, search, hiddenColumns, selectedRows, onRowClick, sortColumn, onSortColumn }) => (
  <TableContainer component={Paper}>
    <Table className="memo-table">
      <TableHead className="memo-table-header">
        <TableRow>
          <TableCell onClick={() => onSortColumn("title")}>
            Title {sortColumn.key === "title" && (sortColumn.order === "asc" ? "↑" : sortColumn.order === "desc" ? "↓" : "")}
          </TableCell>
          <TableCell onClick={() => onSortColumn("target_date")}>
            Target Date {sortColumn.key === "target_date" && (sortColumn.order === "asc" ? "↑" : sortColumn.order === "desc" ? "↓" : "")}
          </TableCell>
          <TableCell onClick={() => onSortColumn("created_date")}>
            Created Date {sortColumn.key === "created_date" && (sortColumn.order === "asc" ? "↑" : sortColumn.order === "desc" ? "↓" : "")}
          </TableCell>
          <TableCell onClick={() => onSortColumn("persistence")}>
            Persistence {sortColumn.key === "persistence" && (sortColumn.order === "asc" ? "↑" : sortColumn.order === "desc" ? "↓" : "")}
          </TableCell>
          {!hiddenColumns.includes("completed") && (
            <TableCell onClick={() => onSortColumn("completed_date")}>
              Completed Date {sortColumn.key === "completed_date" && (sortColumn.order === "asc" ? "↑" : sortColumn.order === "desc" ? "↓" : "")}
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))
          .map((row) => (
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

const EditBlock = ({
  row,
  onAction,
  actionText,
  editableRow,
  setEditableRow,
  showSave,
  updateAction,
  handleInputChange,
  handleDateChange,
  persistenceOptions,
}) => {
  useEffect(() => {
    setEditableRow(row);
  }, [row]);

  return (
    <Box className="edit-view-container">
      <TableContainer component={Paper}>
        <Table className="edit-table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Target Date</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Persistence</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <input
                  type="text"
                  value={editableRow.title}
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </TableCell>
              <TableCell>
                <input
                  type="date"
                  value={editableRow.target_date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </TableCell>
              <TableCell>{editableRow.created_date}</TableCell>
              <TableCell>
                <select
                  value={editableRow.persistence}
                  onChange={(e) => handleInputChange(e, "persistence")}
                >
                  {persistenceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <button
                  className="status-button active-button"
                  onClick={onAction}
                >
                  {actionText}
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {showSave && (
        <button className="save-button" onClick={updateAction}>
          Save
        </button>
      )}
    </Box>
  );
};

const MemoHome = ({ tabTitle }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState(openData);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [actionText, setActionText] = useState("Complete");
  const [editableRow, setEditableRow] = useState({});
  const [showSave, setShowSave] = useState(false);
  const [sortColumn, setSortColumn] = useState({ key: "", order: "" }); // Holds the sorting state

  const persistenceOptions = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"];

  const toggleState = (isCompleted) => {
    setState(isCompleted);
    setData(isCompleted ? completedData : openData);
    setSelectedRows([]);
    setActionText(isCompleted ? "Reopen" : "Complete");
    setSortColumn({ key: "", order: "" });
  };

  const handleRowClick = (row) => {
    let currentSelected = selectedRows.some((selected) => selected.id === row.id);
    if (currentSelected) {
      setSelectedRows([]);
      setEditableRow({});
      return;
    }
    setSelectedRows([row]);
    setEditableRow(row);
  };

  const onSortColumn = (key) => {
    let newOrder = "asc";
    if (sortColumn.key === key) {
      if (sortColumn.order === "asc") newOrder = "desc";
      else if (sortColumn.order === "desc") newOrder = "";
    }

    setSortColumn({ key, order: newOrder });

    if (newOrder === "") {
      setData(state ? completedData : openData); // Reset to original order
    } else {
      const sortedData = [...data].sort((a, b) => {
        if (a[key] < b[key]) return newOrder === "asc" ? -1 : 1;
        if (a[key] > b[key]) return newOrder === "asc" ? 1 : -1;
        return 0;
      });
      setData(sortedData);
    }
  };

  const handleInputChange = (e, field) => {
    const updatedRow = { ...editableRow, [field]: e.target.value };
    setEditableRow(updatedRow);
    setShowSave(JSON.stringify(updatedRow) !== JSON.stringify(selectedRows[0]));
  };

  const handleDateChange = (e) => {
    const updatedDate = e.target.value;
    handleInputChange(e, "target_date");
  };

  const updateAction = () => {
    const updatedData = data.map((row) =>
      row.id === editableRow.id ? editableRow : row
    );
    setData(updatedData);
    setShowSave(false);
  };

  const handleAction = () => {
    console.log(editableRow, actionText);
  };

  return (
    <div>
      <TabHeader tabTitle={tabTitle} />
      <div className="memo-container">
        <StatusButtons
          state={state}
          toggleState={toggleState}
          search={search}
          setSearch={setSearch}
        />
        <DataTable
          data={data}
          search={search}
          hiddenColumns={state ? [] : ["completed"]}
          selectedRows={selectedRows}
          onRowClick={handleRowClick}
          sortColumn={sortColumn}
          onSortColumn={onSortColumn}
        />
      </div>
      {selectedRows.length > 0 && (
        <EditBlock
          row={selectedRows[0]}
          onAction={handleAction}
          actionText={actionText}
          editableRow={editableRow}
          setEditableRow={setEditableRow}
          showSave={showSave}
          updateAction={updateAction}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          persistenceOptions={persistenceOptions}
        />
      )}
    </div>
  );
};

export default MemoHome;