import React, { useState, useEffect, useCallback } from "react";

import { MemoEditBlock, MemoCreateBlock, MemoDataTable } from "./MemoComponents";
import { Loader, TabHeader } from "../templates";
import * as approute from "../routes/routes";
import "./_styles/memo-main.css";

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

    {!state && (
      <div className="memo-create-button">
        <button className="status-button inactive-button" onClick={handleNewAction}>
          ADD
        </button>
      </div>
    )}

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

  const afterMethods = () => {
    setSelectedRows([]);
    fetchData();
  }

  const handleRowClick = (row) => {
    const currentSelected = selectedRows.some((selected) => selected.id === row.id);
    if (currentSelected) {
      resetSelection();
    } else {
      setShowSave(false);
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
      afterMethods();
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
              <MemoDataTable
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
            <MemoCreateBlock 
              persistenceOptions={persistenceOptions}
              createdMemo={createdMemo}
              setCreatedMemo={setCreatedMemo}
              handleCreateMemo={(e, field) => setCreatedMemo({ ...createdMemo, [field]: e.target.value })}
              handleNewMemo={handleNewMemo}
              handleCancel={() => { setCreatedMemo({}); setDisplayCreate(false); }} 
            />
          )}
          {selectedRows.length > 0 && !displayCreate && (
            <MemoEditBlock
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
              deleteAction={() => deleteMemo(editableRow.id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MemoHome;