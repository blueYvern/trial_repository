import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TransactionTable = ({selectedRecords, sortedData, sortedRecordsColor}) => {
    return (
        <div className="transaction-table-container">
            <h3 className="transaction-table-title">Transaction Details</h3>
            <TableContainer component={Paper}>
                <Table className="transaction-table">
                    <TableHead className="transaction-table-header">
                        <TableRow>
                            {['date', 'payee', 'amount', 'category', 'type'].map((column) => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((tx, index) => (
                            <TableRow key={index}
                                hover
                                style={{backgroundColor :  selectedRecords.includes(tx) ?  sortedRecordsColor : ''}}>
                                <TableCell>{tx.date}</TableCell>
                                <TableCell>{tx.payee}</TableCell>
                                <TableCell>${tx.amount.toFixed(2)}</TableCell>
                                <TableCell>{tx.category}</TableCell>
                                <TableCell>{tx.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TransactionTable;