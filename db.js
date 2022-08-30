// https://javascript.info/indexeddb

let openRequest = indexedDB.open("myDatabase");
let db;

openRequest.addEventListener("success", () => {
    // console.log("connection successfull");
    db=openRequest.result; // Databse object is created, which will have key-value pair.
})


// IndexedDB has a built-in mechanism of “schema versioning”, absent in server-side databases.

// upgradeneeded: database is ready, but its version is outdated (see below).It basically
// runs when we create a new database because the schema is new or when we change the 
// schema so upgrade is needed.

openRequest.addEventListener("upgradeneeded" , ()=> {
    // triggers if the client had no database
    // ...perform initialization...
      // console.log("db upgraded OR initalisation in db ");
      db = openRequest.result;
  
      // We will store the urls of the image/video to display on frontend.
      db.createObjectStore("video", { keyPath:"id" });
      db.createObjectStore("image", { keyPath:"id" });
  
  });
  
  openRequest.addEventListener("error", ()=>{
    console.error("Error", openRequest.error);
  });

  // schema-> blue print -> how does my db look like , what all i can store in my db 
