import React, { useState, useEffect, useMemo } from "react";
import TabHeader from "../templates/TabHeader";
import * as approute from "../routes/routes";
import Loader from "../templates/Loader";
import "./styles/electronics-main.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

const Button = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>{children}</button>
); 

const TableRowComponent = ({ row }) => (
    <TableRow key={row.id} hover>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.category}</TableCell>
    </TableRow>
);

const AddComponentBlock = ({ createAction, cancelAction, setUpComponent, displayCreateMessage, componentName }) => (
    <div className="table-component-block">
        {displayCreateMessage && <p className="create-message">Component {componentName} successfully added to inventory</p>}
        <Box className="component-table-container">
            <TableContainer component={Paper}>
                <Table className="comp-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><input type="text" placeholder="Component Name" onChange={(e) => setUpComponent(e, "name")} /></TableCell>
                            <TableCell><input type="number" placeholder="Quantity" onChange={(e) => setUpComponent(e, "quantity")} /></TableCell>
                            <TableCell><input type="text" placeholder="Category" onChange={(e) => setUpComponent(e, "category")} /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <div className="table-header">
            <Button className="save-button btn left-btn" onClick={createAction}>Create</Button>
            <Button className="cancel-button btn right-btn" onClick={cancelAction}>Cancel</Button>
        </div>
    </div>
);

const ViewInventoryBlock = ({ invData, search, setSearch, handleBack }) => {
    const filteredData = useMemo(() => invData.filter(row => row.name.toLowerCase().includes(search.toLowerCase())), [invData, search]);

    return (
        <div className="table-component-block">
            <div className="table-header">
                <div className="search-container">
                    <input className="search-input btn left-btn" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Button className="back-button btn right-btn" onClick={handleBack}>Back</Button>
            </div>
            <Box className="component-table-container">
                <TableContainer component={Paper}>
                    <Table className="comp-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map(row => <TableRowComponent key={row.id} row={row} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
};

const ElectronicsInventory = () => {
    const [loaderState, setLoaderState] = useState(false);
    const [invCount, setInvCount] = useState(0);
    const [displayBlock, setDisplayBlock] = useState("header");
    const [invData, setInvData] = useState([]);
    const [search, setSearch] = useState('');
    const [createdComp, setCreatedComp] = useState({});
    const [displayCreateMessage, setDisplayCreateMessage] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        backend_getInventoryCount();
    }, [lastUpdated]);

    const toggleBlock = (blockType) => {
        if (blockType === "view") {
            backend_getInventory();
        }
        setDisplayBlock(prev => prev === blockType ? "header" : blockType);
    }
    const setUpComponent = (e, field) => setCreatedComp({ ...createdComp, [field]: e.target.value });
    
    const handleCreateAction = async () => {
        if (createdComp.name) {
            const newComp = { ...createdComp, quantity: createdComp.quantity || 1, category: createdComp.category || "Misc" };
            if (await backend_createComponent(newComp)) {
                setCreatedComp({});
                setLastUpdated(newComp.name);
                setDisplayCreateMessage(true);
            }
        } else {
            alert("Please enter a component name");
        }
    };

    const backend_getInventoryCount = async () => {
        try {
            setLoaderState(true);
            const response = await fetch(approute.get_electronics_inv_count);
            const data = await response.json();
            setInvCount(data);
        } catch (error) {
            alert("Error fetching inventory count", error);
        } finally {
            setLoaderState(false);
        }
    };

    const backend_getInventory = async () => {
        try {
            setLoaderState(true);
            const response = await fetch(approute.get_electronics_inv);
            const data = await response.json();
            setInvData(data);
        } catch (error) {
            alert("Error fetching inventory", error);
        } finally {
            setLoaderState(false);
        }
    };

    const backend_createComponent = async (component) => {
        try {
            setLoaderState(true);
            const response = await fetch(approute.add_inventory, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(component)
            });
            return response.ok;
        } catch (error) {
            alert("Error saving component", error);
            return false;
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <div>
            <TabHeader tabTitle="Inventory" />
            {loaderState ? <Loader /> :
                displayBlock === "create" ? <AddComponentBlock createAction={handleCreateAction} cancelAction={() => toggleBlock("create")} setUpComponent={setUpComponent} displayCreateMessage={displayCreateMessage} componentName={lastUpdated} /> :
                    displayBlock === "view" ? <ViewInventoryBlock invData={invData} search={search} setSearch={setSearch} handleBack={() => toggleBlock("view")} /> :
                        <div>
                            <h4 className="inv-header">There are currently {invCount} items in the inventory</h4>
                            <div className="inv-header-buttons">
                                <Button className="inv-header-button" onClick={() => toggleBlock("create")}>Add Component</Button>
                                <Button className="inv-header-button" onClick={() => toggleBlock("view")}>View Inventory</Button>
                            </div>
                        </div>
            }
        </div>
    );
};

export default ElectronicsInventory;