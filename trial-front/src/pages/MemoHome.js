import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Loader from "../templates/Loader";
import TabHeader from "../templates/TabHeader";
import * as approute from "../routes/routes";
import "./styles/memo-main.css";

const StatusButtons = ({ state, toggleState, search, setSearch, handleNewAction }) => (
  <div className="memo-header">
    {/* Search Input */}
    <input
      className="memo-search"
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* Add Button - Only visible when state is false */}
    {!state && (
      <div className="memo-create-button">
        <button className="status-button inactive-button" onClick={handleNewAction}>
          ADD
        </button>
      </div>
    )}

    {/* Status Buttons - Open / Completed */}
    <div className="memo-status-buttons">
      <button
        onClick={() => toggleState(false)}
        disabled={!state}
        className={`status-button ${state ? "inactive-button" : "active-button"}`}
      >
        Open
      </button>
      <button
        onClick={() => toggleState(true)}
        disabled={state}
        className={`status-button ${!state ? "inactive-button" : "active-button"}`}
      >
        Completed
      </button>
    </div>
  </div>
);

const DataTable = ({ data, search, hiddenColumns, selectedRows, onRowClick, sortColumn, onSortColumn }) => {
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
                {capitalizeFirstLetter(column)} {renderSortIndicator(column)}
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

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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
  deleteAction
}) => {
  useEffect(() => {
    setEditableRow(row);
  }, [row, setEditableRow]);

  const renderPersistenceOptions = () => (
    persistenceOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))
  );

  const renderEditableRow = () => (
    <>
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
            {renderPersistenceOptions()}
          </select>
        </TableCell>
        <TableCell>
          <button className="status-button active-button" onClick={onAction}>
            {actionText}
          </button>
        </TableCell>
      </TableRow>
    </>
  );

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
          <TableBody>{renderEditableRow()}</TableBody>
        </Table>
      </TableContainer>
      {showSave && (
        <button className="save-button" onClick={updateAction}>
          Save
        </button>
      )}
      <button className="delete-button" onClick={deleteAction}>
        Delete
      </button>
    </Box>
  );
};

const CreateBlock = ({ persistenceOptions, handleCreateMemo, handleNewMemo, handleCancel }) => {
  
  const renderPersistenceOptions = () => (
    persistenceOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))
  );

  const handleInputChange = (field) => (e) => handleCreateMemo(e, field);

  return (
    <div className="edit-view-container">
      <Box>
        <TableContainer component={Paper}>
          <Table className="create-table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Target Date</TableCell>
                <TableCell>Persistence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={handleInputChange("title")}
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="date"
                    placeholder={new Date().toISOString().split("T")[0]}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange("target_date")}
                  />
                </TableCell>
                <TableCell>
                  <select onChange={handleInputChange("persistence")}>
                    {renderPersistenceOptions()}
                  </select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <button onClick={handleNewMemo}>Create</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

const MemoHome = ({ tabTitle }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [actionText, setActionText] = useState("Complete");
  const [editableRow, setEditableRow] = useState({});
  const [showSave, setShowSave] = useState(false);
  const [sortColumn, setSortColumn] = useState({ key: "", order: "" });
  const [displayCreate, setDisplayCreate] = useState(false);
  const [createdMemo, setCreatedMemo] = useState({});
  const [loaderState, setLoaderState] = useState(false);
  const persistenceOptions = ["Daily", "Weekly", "Biweekly", "Monthly", "Quarterly"];

  const toggleState = (isCompleted) => {
    setState(isCompleted);
    setSelectedRows([]);
    setActionText(isCompleted ? "Reopen" : "Complete");
    setSortColumn({ key: "", order: "" });
    setDisplayCreate(false);
  };

  const handleRowClick = (row) => {
    const currentSelected = selectedRows.some((selected) => selected.id === row.id);
    if (currentSelected) {
      setSelectedRows([]);
      setEditableRow({});
    } else {
      setSelectedRows([row]);
      setEditableRow(row);
    }
  };

  const onSortColumn = (key) => {
    const newOrder = sortColumn.key === key && sortColumn.order === "asc" ? "desc" : sortColumn.order === "desc" ? "" : "asc";
    setSortColumn({ key, order: newOrder });
    if (!newOrder) {
      setData(data);
    } else {
      setData(sortData(data, key, newOrder));
    }
  };

  const sortData = (data, key, order) => {
    return [...data].sort((a, b) => (a[key] < b[key] ? (order === "asc" ? -1 : 1) : a[key] > b[key] ? (order === "asc" ? 1 : -1) : 0));
  };

  const handleInputChange = (e, field) => {
    const updatedRow = { ...editableRow, [field]: e.target.value };
    setEditableRow(updatedRow);
    setShowSave(JSON.stringify(updatedRow) !== JSON.stringify(selectedRows[0]));
  };

  const updateAction = async () => {
    if (await updateMemo(editableRow)) {
      resetSelection();
      fetchData();
    }
  };

  const handleAction = async () => {
    const updatedMemo = {
      ...editableRow,
      status: actionText === "Complete" ? "completed" : "open",
      completed_date: actionText === "Complete" ? new Date().toISOString().split("T")[0] : null,
    };
    if (await updateActionMemo(updatedMemo, actionText.toLowerCase())) {
      resetSelection();
      fetchData();
    }
  };

  const handleNewMemo = async () => {
    if (!createdMemo.title) return alert("Please enter a title");
    const newMemo = { ...createdMemo, target_date: createdMemo.target_date || new Date().toISOString().split("T")[0], persistence: createdMemo.persistence || "Daily", created_date: new Date().toISOString().split("T")[0] };
    if (await createNewMemo(newMemo)) {
      setCreatedMemo({});
      setDisplayCreate(false);
      fetchData();
    }
  };

  const resetSelection = () => {
    setSelectedRows([]);
    setEditableRow({});
    setShowSave(false);
  };

  const createNewMemo = async (memo) => handleApiCall("POST", approute.create_memo, memo);
  const updateMemo = async (memo) => handleApiCall("PUT", approute.update_memo, memo);
  const updateActionMemo = async (memo, action) => handleApiCall("PUT", `${approute.update_memo}${action}`, memo);
  const deleteMemo = async (id) => handleApiCall("DELETE", `${approute.delete_memo}${id}`);

  const handleApiCall = async (method, url, body = null) => {
    try {
      setLoaderState(true);
      const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : null });
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      return true;
    } catch (error) {
      alert(`Error with operation: ${error}`);
      return false;
    } finally {
      setLoaderState(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoaderState(true);
    const url = state ? approute.completed_memos : approute.open_memos;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      alert("Error fetching memos", error);
    } finally {
      setLoaderState(false);
    }
  }, [state]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <TabHeader tabTitle={tabTitle} />
      {loaderState ? <Loader /> : (
        <div>
          {!displayCreate ? (
            <div className="memo-container">
              <StatusButtons
                state={state}
                toggleState={toggleState}
                search={search}
                setSearch={setSearch}
                handleNewAction={() => setDisplayCreate(true)}
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
          ) : (
            <CreateBlock 
              persistenceOptions={persistenceOptions}
              createdMemo={createdMemo}
              setCreatedMemo={setCreatedMemo}
              handleCreateMemo={(e, field) => setCreatedMemo({ ...createdMemo, [field]: e.target.value })}
              handleNewMemo={handleNewMemo}
              handleCancel={() => { setCreatedMemo({}); setDisplayCreate(false); }} 
            />
          )}
          {selectedRows.length > 0 && !displayCreate && (
            <EditBlock
              row={selectedRows[0]}
              onAction={handleAction}
              actionText={actionText}
              editableRow={editableRow}
              setEditableRow={setEditableRow}
              showSave={showSave}
              updateAction={updateAction}
              handleInputChange={handleInputChange}
              persistenceOptions={persistenceOptions}
              deleteAction={() => deleteMemo(editableRow.id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MemoHome;