import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


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
            <button className="status-button inactive-button" onClick={onAction}>
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
        <div className="edit-button-container">
          {showSave && (
            <button className="status-button inactive-button" onClick={updateAction}>
              Save
            </button>
          )}
          <button className="inactive-button status-button" onClick={deleteAction}>
            Delete
          </button>
        </div>
      </Box>
    );
};

export default EditBlock