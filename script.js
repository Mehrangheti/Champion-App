import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://champion-a8664-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const championRef = ref(database, "texts");

let btn = document.querySelector('.btn');
let text = document.querySelector('textarea');
let allMsg = document.querySelector('.allMsg');
const empty = document.querySelector('.empty span')
btn.addEventListener('click', function(e) {
    let textvalue=text.value;
    if (textvalue === "") {
      empty.innerHTML = "Please fill the textarea";
    } else {
        let para = document.createElement("p");
        para.innerHTML = textvalue;
        allMsg.insertBefore(para, allMsg.firstChild);
        push(championRef, textvalue);
        text.value = "";
        empty.innerHTML=""
    }
    
});




onValue(championRef,function(snapshot){
    if(snapshot.exists()){
    let championArray = Object.entries(snapshot.val())
    allMsg.innerHTML = ""
    for(let i=0;i<championArray.length;i++){
            displayItems(championArray[i])
        }
    }else{
        allMsg.innerHTML = `<h4 style="color:red">No Endorsements</h4>`
    }

   
})


function displayItems(itemInDB){
    let para = document.createElement("p");
    para.innerHTML = itemInDB[1];
    allMsg.insertBefore(para, allMsg.firstChild);

    para.addEventListener("click",function(itemIDInDB){
            let fullPath = ref(database,`texts/${itemInDB[0]}`)
            remove(fullPath)


})
}






// let para = document.createElement("p");
// para.innerHTML = textvalue;
// allMsg.insertBefore(para, allMsg.firstChild);