const backend_url = "http://krosmo-api.com/";

//dev mode
//const backend_url = "http://localhost:5000/";

// Memo routes
const memo_url = backend_url + "memos/";

export const create_memo = memo_url + "create_memo/";
export const get_memos = memo_url + "get_memos/";
export const open_memos = get_memos + "open/";
export const completed_memos = get_memos + "completed/";
export const update_memo = memo_url + "update_memo/";
export const delete_memo = memo_url + "delete_memo/";

// Electronics Routes
const electronics_url = backend_url + "electronics/";

export const get_electronics_inv_count = electronics_url + "get_inventory_count/";
export const get_electronics_inv = electronics_url + "get_inventory/";
export const add_inventory = electronics_url + "add_inventory/";


// Frontend routes
export const MEMOS = "/memos/";
export const ELECTRONICS = "/electronics/";
export const CODINGS = "/codings/";
export const ENTERTAINMENT = "/entertainment/";
export const DOCS = "/docs/";
export const HEALTH = "/health/";
export const WEALTH = "/wealth/";
export const HOME = "/";
export const NOTFOUND = "*";

export const ELECTRONICS_INVENTORY = "/electronics/inventory/";
export const ELECTRONICS_PROJECTS = "/electronics/projects/";
