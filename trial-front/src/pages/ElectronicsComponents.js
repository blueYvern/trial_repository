import React,{useState, useEffect} from "react";
import TabHeader from "../templates/TabHeader";
import * as approute from "../routes/routes";
import Loader from "../templates/Loader";
import "./styles/electronics-main.css";

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

// add component
// search for component
// view inventory : component name,count (possibly image)
// edit inventory/ delete inventory

const InvHeader = ({
    data,
    handleCreateClick,
    handleViewClick
}) => {
    return (
        <div>
            <h4 className="inv-header"> There are currently {data} items in the inventory</h4>
            <div className="inv-header-buttons">
                <button className="inv-header-button" onClick={handleCreateClick}>Add Component</button>
                <button className="inv-header-button" onClick={handleViewClick}>View Inventory</button>
            </div>
        </div>
    );
}

const AddComponentBlock = ({
    createAction,
    cancelAction,
    setUpComponent,
    displayCreateMessage,
    componentName
}) => {
    
    return (
        <div className="table-component-block">
            {displayCreateMessage ? <p className="create-message">Component {componentName} successfully added to inventory</p> : null}
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
                                <TableCell>
                                    <input 
                                        type="text" 
                                        placeholder="Component Name"
                                        onChange={(e) => setUpComponent(e,"name")}/>
                                </TableCell>
                                <TableCell>
                                    <input 
                                        type="number" 
                                        placeholder="Quantity"
                                        onChange={(e) => setUpComponent(e,"quantity")}/>    
                                </TableCell>
                                <TableCell>
                                    <input 
                                        type="text" 
                                        placeholder="Category"
                                        onAbort={(e) => setUpComponent(e,"category")}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <div className="table-header">
                <button className="save-button btn left-btn" onClick={createAction}>Create</button>
                <button className="cancel-button btn right-btn" onClick={cancelAction}>Cancel</button>
            </div>
        </div>
    )
}

const ViewInventoryBlock = ({
    invData,
    search,
    setSearch,
    handleBack
}) => {
    return (
        <div className="table-component-block">
            <div className="table-header">
                <div className="search-container">
                    <input className="search-input btn left-btn" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <button className="back-button btn right-btn" onClick={handleBack}>Back</button>                
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
                            {invData && invData.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()))
                            .map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

const EditComponentBlock = () => {
    return(
        <div className="table-component-block">
            
        </div>
    )    
}

const ElectronicsInventory = () => {
    const [loaderState, setLoaderState] = useState(false);
    const [invCount,setInvCount] = useState(0);
    const [displayCreateBlock, setDisplayCreateBlock] = useState(false);
    const [displayEditBlock, setDisplayEditBlock] = useState(false);
    const [displayViewBlock, setDisplayViewBlock] = useState(false);
    const [invData, setInvData] = useState([]);
    const [search, setSearch] = useState('');
    const [createdComp, setCreatedComp] = useState({});
    const [displayCreateMessage,setDisplayCreateMessage] = useState(false);
    const [lastUpdated,setLastUpdated] = useState("");
    
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortColumn, setSortColumn] = useState({ key: "", order: "" });

    useEffect(() => {  
        backend_getInventoryCount();
    },[lastUpdated]);

    const toggleCreateBlock = () => {
        setCreatedComp({});
        setDisplayCreateMessage(false);
        setDisplayCreateBlock(!displayCreateBlock);
    }

    const setUpComponent = (e,field) => {
        const newComp = {...createdComp,[field]:e.target.value};
        setCreatedComp(newComp);
    }

    const handleCreateAction =  async () => {
        const newComp = {...createdComp};
        if(newComp.name){
            if(!newComp.quantity){
                newComp.quantity = 1;
            }
            if(!newComp.category){
                newComp.category = "Misc";
            }
            if(await backend_createComponent(newComp)){
                setCreatedComp({});
                setLastUpdated(newComp.name);
                setDisplayCreateMessage(true);
            }
        }
        else{
            alert("Please enter a component name");
        }
    }
    const toggleEditBlock = () => {
        setDisplayEditBlock(!displayEditBlock);
    }
    const toggleViewBlock = async() => {
        backend_getInventory();
        setDisplayViewBlock(!displayViewBlock);
    }
    const handleViewBack = () => {
        setDisplayViewBlock(!displayViewBlock);
    }
    //--------------------------------------------------------------------------------------------
    const backend_getInventoryCount = async () => {
        let inv_count_url = approute.get_electronics_inv_count;
        try{
            setLoaderState(true);
            const response = await fetch(inv_count_url,{method: 'GET'});
            if (!response.ok) {
                throw new Error('HTTP Error! Status: {}', response.status);
            }
            const data = await response.json();
            setInvCount(data);
            setLoaderState(false);
            return true;
        }
        catch(error){
            alert("Error fetching inventory count",error); 
        }
        finally{
            setLoaderState(false);
        }
        return false;    
    }
    const backend_getInventory = async () => {
        let inv_url = approute.get_electronics_inv;
        try{
            setLoaderState(true);
            const response = await fetch(inv_url,{method: 'GET'});
            if (!response.ok) {
                throw new Error('HTTP Error! Status: {}', response.status);
            }
            const data = await response.json();
            setInvData(data);
            setLoaderState(false);
            return true;
        }
        catch(error){
            alert("Error fetching inventory {}",error.message);
        }
        finally{
            setLoaderState(false);
        }
        return false;
    }
    const backend_createComponent = async (component) => {
        let create_url = approute.add_inventory;   
        try{
            setLoaderState(true);
            const response = await fetch(create_url,{method: 'POST', headers: {'Content-Type': 'application/json'}, body: (JSON.stringify(component))});
            if (!response.ok) {
                throw new Error('HTTP Error! Status: {}', response.status);
            }
            setLoaderState(false);
            return true;
        }
        catch(error){
            alert("Error saving component",error);
        }
        finally{
            setLoaderState(false);
        }
        return false;
    }
    //--------------------------------------------------------------------------------------------
    return (
        <div>
            <TabHeader tabTitle="Inventory"/>
            {loaderState ? <Loader/> : 
            displayCreateBlock ? 
                <AddComponentBlock 
                    createAction = {handleCreateAction}
                    cancelAction = {toggleCreateBlock}
                    setUpComponent = {setUpComponent}
                    displayCreateMessage = {displayCreateMessage}
                    componentName={lastUpdated}
                /> :
                displayViewBlock ? 
                    <ViewInventoryBlock
                        invData={invData}
                        search={search}
                        setSearch={setSearch}
                        handleBack={handleViewBack}
                    /> :
                    displayEditBlock ? 
                        <EditComponentBlock/> : 
                        <InvHeader 
                            data={invCount} 
                            handleCreateClick={toggleCreateBlock}
                            handleViewClick={toggleViewBlock}
                        />
            }
        </div>
    );
}

export default ElectronicsInventory;