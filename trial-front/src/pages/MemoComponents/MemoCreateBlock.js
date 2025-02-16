import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const MemoCreateBlock = ({ persistenceOptions, handleCreateMemo, handleNewMemo, handleCancel }) => {
  
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
      
        <TableContainer component={Paper}>
            <Table className="edit-table">
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
        <button onClick={handleNewMemo}>Create</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default MemoCreateBlock;