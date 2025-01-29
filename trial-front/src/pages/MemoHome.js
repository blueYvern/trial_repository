import React, {useState, useEffect, useCallback} from "react";
import TabHeader from "../templates/TabHeader";
import * as approute from "../routes/routes";
import "./styles/memo-main.css";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box
} from "@mui/material";
import Loader from "../templates/Loader";

const StatusButtons = ({ state, toggleState, search, setSearch, handleNewAction }) => (
  <div className="memo-header">
    <input
      className="memo-search"
      type="text"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {!state &&     
      <div className="memo-create-button">
        <button className="status-button active-button" 
          onClick={() => handleNewAction()}>ADD</button>
      </div>
    }
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
        {data &&
          data.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))
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
  deleteAction
}) => {
  useEffect(() => {
    setEditableRow(row);
  }, [row,setEditableRow]);
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
      <button className="delete-button" onClick={() => deleteAction()}>
        Delete
      </button>
    </Box>
  );
};

const CreateBlock = ({  
  persistenceOptions,
  handleCreateMemo,
  handleNewMemo,
  handleCancel
}) => (
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
                <input type="text" 
                placeholder={"Title"}
                onChange={(e) => handleCreateMemo(e,"title")}
                required/>
              </TableCell>
              <TableCell>
                <input type="date"
                placeholder={new Date().toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]} 
                onChange={(e) => handleCreateMemo(e,"target_date")}/>
              </TableCell>
              <TableCell>
                <select
                  placeholder={"Select a frequency"}
                  onChange={(e) => handleCreateMemo(e,"persistence")}>
                  {persistenceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
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
)

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
  const persistenceOptions = ["Daily", "Weekly", "Biweekly" ,"Monthly", "Quarterly"];
  const [loaderState, setLoaderState] = useState(false);


  const fetchData = useCallback(async() => {
    if (state) {
      backend_getCompletedMemos();
    } else {
      backend_getOpenMemos();
    }
  }, [state]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const toggleState = (isCompleted) => {
    setState(isCompleted);
    setSelectedRows([]);
    setActionText(isCompleted ? "Reopen" : "Complete");
    setSortColumn({ key: "", order: "" });
    setDisplayCreate(false);
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
      setData(data);
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
    handleInputChange(e, "target_date");
  };

  const updateAction = async () => {
    if (await backend_updateMemo(editableRow)){
      setSelectedRows([]);
      setEditableRow({});
      setShowSave(false);
      fetchData();
    }    
  };

  const handleAction = async () => {
    const actioned_memo = {...editableRow};
    if (actionText === "Complete") {
      actioned_memo.status = "completed";
      actioned_memo.completed_date = new Date().toISOString().split("T")[0];
    }
    else if (actionText === "Reopen") {
      actioned_memo.status = "open";
      actioned_memo.completed_date = null;
    }
    if (await backend_updateActionMemo(actioned_memo,actionText.toLowerCase())){
      setSelectedRows([]);
      setEditableRow({});
      setShowSave(false);
      fetchData();
    }
  };

  const handleNewAction = () => {
    setDisplayCreate(true);
  };

  const handleCreateMemo = (e,field) => {
    const newMemo = {...createdMemo, [field]: e.target.value};
    setCreatedMemo(newMemo);
  }

  const handleNewMemo = async () => {
    const newMemo = {...createdMemo};
    if (newMemo.title){
      if(!newMemo.target_date){
        newMemo.target_date = new Date().toISOString().split("T")[0];
      }
      if(!newMemo.persistence){
        newMemo.persistence = "Daily";
      }
      newMemo.created_date = new Date().toISOString().split("T")[0];
      if (await backend_createNewMemo(newMemo)){
        setCreatedMemo({});
        setDisplayCreate(false);
        fetchData();
        return;
      }
    }
    else{
      alert("Please enter a title");
    }
  }

  const handleCancel = () => {
    setCreatedMemo({});
    setDisplayCreate(false);
  }

  const deleteAction = async () => {

    if (await backend_deleteMemo(editableRow.id)){
      setSelectedRows([]);
      setEditableRow({});
      setShowSave(false);
      fetchData();
    }
  }

  // .........................................................................  
  
  const backend_getOpenMemos = async () => {
    let open_url = approute.open_memos;
    try{
      setLoaderState(true);
      const response = await fetch(open_url);
      if(!response.ok){
        throw new Error('HTTP Error! Status: {}', response.status);
      }
      const data = await response.json();
      setData(data);
      setLoaderState(false);
    }
    catch(error){
      alert("Error fetching open memos", error);
    }
    finally{
      setLoaderState(false);
    }
  }

  const backend_getCompletedMemos = async () => {
    let completed_url = approute.completed_memos;
    try{
      setLoaderState(true);
      const response = await fetch(completed_url);
      if(!response.ok){
        throw new Error('HTTP Error! Status: {}', response.status);
      }
      const data = await response.json();
      setData(data);
      setLoaderState(false);
    }
    catch(error){
      alert("Error fetching open memos", error);
    }
    finally{
      setLoaderState(false);
    }
  }

  const backend_createNewMemo = async (memo) => {
    let create_url = approute.create_memo;
    try{
      setLoaderState(true);
      const response = await fetch(create_url,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: (JSON.stringify(memo))});
      if (!response.ok) {
        throw new Error('HTTP Error! Status: {}', response.status);
      }
      setLoaderState(false);
      return true;
    }
    catch(error){
      alert("Error creating memo",error);
    }
    finally{
      setLoaderState(false);
    }
    return false;
  }

  const backend_updateMemo = async (memo) => {
    let update_url = approute.update_memo;
    try{
      setLoaderState(true);
      const response = await fetch(update_url,{method: 'PUT', headers: {'Content-Type': 'application/json'}, body: (JSON.stringify(memo))});
      if (!response.ok) {
        throw new Error('HTTP Error! Status: {}', response.status);
      }
      setLoaderState(false);
      return true;
    }
    catch(error){
      alert("Error updating memo",error);
    }
    finally{
      setLoaderState(false);
    }
    return false;
  }

  const backend_updateActionMemo = async (memo,action) => {
    let update_url = approute.update_memo + action;
    try{
      setLoaderState(true);
      const response = await fetch(update_url,{method: 'PUT', headers: {'Content-Type': 'application/json'}, body: (JSON.stringify(memo))});
      if (!response.ok) {
        throw new Error('HTTP Error! Status: {}', response.status);
      }
      setLoaderState(false);
      return true;
    }
    catch(error){
      alert("Error updating memo",error);
    }
    finally{
      setLoaderState(false);
    }
    return false;
  }

  const backend_deleteMemo = async (id) => {
    let delete_url = approute.delete_memo + id;
    try{
      setLoaderState(true);
      const response = await fetch(delete_url,{method: 'DELETE'});
      if (!response.ok) {
        throw new Error('HTTP Error! Status: {}', response.status);
      }
      setLoaderState(false);
      return true;
    }
    catch(error){
      alert("Error deleting memo",error);
    }
    finally{
      setLoaderState(false);
    }
    return false;
  }

  // .........................................................................

  return (
    <div>
      <TabHeader tabTitle={tabTitle} />
      {loaderState ? <Loader /> : <div>
        {!displayCreate &&
        <div className="memo-container">
          <StatusButtons
            state={state}
            toggleState={toggleState}
            search={search}
            setSearch={setSearch}
            handleNewAction = {handleNewAction}
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
        }
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
            handleDateChange={handleDateChange}
            persistenceOptions={persistenceOptions}
            deleteAction={deleteAction}
          />
        )}
        {displayCreate && 
          <CreateBlock 
            persistenceOptions={persistenceOptions}
            createdMemo={createdMemo}
            setCreatedMemo={setCreatedMemo}
            handleCreateMemo={handleCreateMemo}
            handleNewMemo={handleNewMemo}
            handleCancel={handleCancel} />
        }
      </div>}
  </div>
  );
};

export default MemoHome;