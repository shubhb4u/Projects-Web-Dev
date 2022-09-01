const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", () => {

  // Relative path on back button to take us to gallery
  location.assign("./index.html");
});

if (db) {
    let galleryCont = document.querySelector(".gallery-cont");
    let imageDBTransaction = db.transaction("image", "readonly");
    let imageStore = imageDBTransaction.objectStore("image");
    let imageRequest = imageStore.getAll();
    imageRequest.onsuccess = function () {
      if (imageRequest.result !== undefined) {
        // console.log("Images", imageRequest.result);
        let imageResult = imageRequest.result;
        imageResult.forEach((imageObj) => {
          //create a img container
          //append child in the page of gallery cont
          // console.log(imageObj);
          let url = imageObj.url;
          var imageEle = document.createElement("div");
          imageEle.setAttribute("class", "media-cont");
          imageEle.setAttribute("id", imageObj.id);
          // add image to that container
          imageEle.innerHTML = `
                <div class="media">
                <img src="${url}"/>
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;
          //appendchild in gallery-cont
          galleryCont.appendChild(imageEle);
          let deleteBtn = imageEle.querySelector(".delete");
          deleteBtn.addEventListener("click", deleteListener);

          let downloadBtn = imageEle.querySelector(".download");
          downloadBtn.addEventListener("click", downloadListener);
        });
      } else {
        console.log("No such images");
      }
    };
}