import React, {useState} from "react";
import TabHeader from "../templates/TabHeader";
import "./styles/memo-main.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const open_data = [
    { id: 55937, request: "Ops Alerts...", subject: "EM Event...", status: "Open", nextTarget: "Best Effort", team: "CG Incid...", member: "John Doe" },
    { id: 55936, request: "Canon...", subject: "SAP PI Alert...", status: "Open", nextTarget: "12 Days", team: "CG Can...", member: "Jane Smith" },
    { id: 55935, request: "Ops Alerts...", subject: "EM Event...", status: "Open", nextTarget: "Best Effort", team: "CG Incid...", member: "John Doe" },
    { id: 55934, request: "Canon...", subject: "SAP PI Alert...", status: "Open", nextTarget: "12 Days", team: "CG Can...", member: "Jane Smith" },
    { id: 55933, request: "Ops Alerts...", subject: "EM Event...", status: "Open", nextTarget: "Best Effort", team: "CG Incid...", member: "John Doe" },
    { id: 55932, request: "Canon...", subject: "SAP PI Alert...", status: "Open", nextTarget: "12 Days", team: "CG Can...", member: "Jane Smith" },
    { id: 55931, request: "Ops Alerts...", subject: "EM Event...", status: "Open", nextTarget: "Best Effort", team: "CG Incid...", member: "John Doe" },
];

const completed_data = [
    { id: 55933, request: "Ops Alerts...", subject: "EM Event...", status: "Completed", nextTarget: "Best Effort", team: "CG Incid...", member: "John Doe" },
    { id: 55932, request: "Canon...", subject: "SAP PI Alert...", status: "Completed", nextTarget: "12 Days", team: "CG Can...", member: "Jane Smith" },
    { id: 55931, request: "Ops Alerts...", subject: "EM Event...", status: "Completed", nextTarget: "Best Effort", team: "CG Incid...", member: "John Doe" },
];

function StatusButtons(props) {
    return (
        <div class="memo-status-buttons">
            <button class="status-button" onClick={props.openMemos} disabled = {!props.state}>Open</button>
            <button class="status-button" onClick={props.completedmemos} disabled = {props.state}>Completed</button>      
        </div>
    );
}

function DataTable({data}) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Next Target</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Member</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.request}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.nextTarget}</TableCell>
                <TableCell>{row.team}</TableCell>
                <TableCell>{row.member}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function MemoHome({tabTitle}) {

    const [state,setState] = useState(false);
    const [data,setData] = useState(open_data);


    const openMemos = () => {
        setState(!state);
        setData(open_data);
    }

    const completedmemos = () => {
        setState(!state);
        setData(completed_data);
    }

    return (
        <div>
            <TabHeader tabTitle={tabTitle}/>
            <StatusButtons state={state} openMemos={openMemos} completedmemos={completedmemos}/>
            <DataTable data={data}/>
        </div>
    );
}

export default MemoHome;