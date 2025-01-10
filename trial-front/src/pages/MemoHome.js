import React, {use, useState} from "react";
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

const open_data = [
    {  id:1, title: "Ops Alerts", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Weekly", status: "Open" },
    {  id:2,title: "Canon", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Daily", status: "Open"  },
    {  id:3,title: "Ops Alerts", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Monthly", status: "Open"  },
    {  id:4,title: "Canon", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Quarterly", status: "Open"  },
    {  id:5,title: "Ops Alerts", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Yearly", status: "Open"  },
    {  id:6,title: "Canon", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Fortnightly", status: "Open"  },
    {  id:7,title: "Ops Alerts", target_date: "12/12/2022", created_date: "12/12/2022", persistence: "Half Yearly", status: "Open"  },
];

const completed_data = [
    {  id:9,title: "Ops Alerts",  target_date: "12/12/2022", created_date: "12/12/2022", completed_date: "12/12/2022", persistence: "Fortnightly", status: "Completed" },
    {  id:10,title: "Canon",  target_date: "12/12/2022", created_date: "12/12/2022", completed_date: "12/12/2022", persistence: "Monthly", status: "Completed" },
    {  id:8,title: "Ops Alerts", target_date: "12/12/2022", created_date: "12/12/2022", completed_date: "12/12/2022", persistence: "Quarterly", status: "Completed" },
];

function StatusButtons(props) {
    return (
      <div class="memo-header">
        <input class="memo-search" type="text" placeholder="Search" value={props.search} onChange={(e) => props.searchChange(e.target.value)}/>
        <div class="edit-button">
          <button class="edit-button" disabled = {props.actionDisabled} onClick={() => props.action(props.selectedRow)}>{props.actionText}</button>
        </div>
        <div class="memo-status-buttons">
            <button class="status-button" onClick={props.openMemos} disabled = {!props.state}>Open</button>
            <button class="status-button" onClick={props.completedmemos} disabled = {props.state}>Completed</button>      
        </div>
      </div>
    );
}

function DataTable(props) {

  const handleRowClick = (row) => {
    props.updateSelection(row);
    props.setActionDisabled(false);
  };

  return (
    <div className="memo-container">
      <StatusButtons  
        state={props.state} 
        openMemos={props.openMemos} 
        completedmemos={props.completedmemos}
        search={props.search} 
        searchChange={props.searchChange}
        actionDisabled={props.actionDisabled}
        action={props.action}
        actionText={props.actionText}
        selectedRow = {props.selection}
        />
      <Box>
        <TableContainer component={Paper}>
          <Table className="memo-table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Target Date</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Persitence</TableCell>
                {!props.hiddenList.includes("completed") && <TableCell>Completed Date</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.filter(
                  (row) =>
                  !props.search.length || row.title.toString().toLowerCase().includes(props.search.toLowerCase()))
                .map((row) => (
                <TableRow 
                  key={row.id}
                  hover
                  onClick={() => handleRowClick(row)}
                  className={props.selectedId === row.id ? "memo-table-row-selected" : "memo-table-row"}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.created_date}</TableCell>
                  <TableCell>{row.target_date}</TableCell>              
                  <TableCell>{row.persistence}</TableCell>
                  {!props.hiddenList.includes("completed") && <TableCell>{row.completed_date}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

function EditBlock({row, action}) {

  return(
    <div className="edit-view-container">
      <TableContainer component={Paper}>
        <Table className="memo-table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Target Date</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Persitence</TableCell>
              <TableCell>Completed Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.target_date}</TableCell>
              <TableCell>{row.created_date}</TableCell>
              <TableCell>{row.persistence}</TableCell>
              <TableCell>{row.completed_date}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div class="edit-button">
        <button class="edit-button">{action}</button>
      </div>
    </div>
  )

}

function MemoHome({tabTitle}) {

    const [state,setState] = useState(false);
    const [data,setData] = useState(open_data);
    const [search,setSearch] = useState("");
    const [hiddenList, setHiddenList] = useState(["completed"]);
    const [selection, setSelection] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [status, setStatus] = useState("Open");
    const [actionText, setActionText] = useState("Complete");
    const [actionDisabled, setActionDisabled] = useState(true);

    const openMemos = () => {
        setState(!state);
        setData(open_data);
        setSearch("");
        setHiddenList(["completed"]);
        updateSelection({});
        setStatus("Open");
        setActionText("Complete");
        setActionDisabled(true);
        console.log(selection === null);
    }

    const completedmemos = () => {
        setState(!state);
        setData(completed_data);
        setSearch("");
        setHiddenList([]);
        updateSelection({});
        setStatus("Completed");
        setActionText("Reopen");
        setActionDisabled(true);
        console.log(selection);
    }

    const searchChange = (value) => {
        setSearch(value);
    }

    const updateSelection = (selectedRow) => {
      setSelection(selectedRow);
      setSelectedId(selectedRow.id);
    }

    const action = (row) => {
      console.log(row,actionText);
    }

    return (
        <div>
            <TabHeader tabTitle={tabTitle}/>  
            <DataTable 
              data={data}
              search={search} 
              hiddenList={hiddenList}
              updateSelection={updateSelection}
              selection={selection}
              selectedId={selectedId}
              status={status}
              state={state} 
              openMemos={openMemos} 
              completedmemos={completedmemos} 
              searchChange={searchChange}
              actionText={actionText}
              actionDisabled={actionDisabled}
              setActionDisabled={setActionDisabled}
              action={action}/>
            {!selection.size > 0 ? <EditBlock row={selection} action={action}/> : <p>No</p>}  
        </div>
    );
}

export default MemoHome;