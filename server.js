import server from "./index.js";
import connectToDB from "./src/config/db.js";

server.listen(8000,()=>{
    console.log("Server listening at port 8000");
    connectToDB();
})