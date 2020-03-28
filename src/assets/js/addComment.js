import axios from "axios";
import { handleDelete } from "./delComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");


const increaseNumber =() => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10) + 1;
}


const addComment = (comment, newId) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delSpan = document.createElement("span");
    const hidden = document.createElement("input");
    hidden.type="hidden"
    hidden.value = newId;
    hidden.id = "jsDelHidden";
    //const a = document.createElement("a");
    // hidden 추가
    delSpan.classList.add("del__comment");
    delSpan.id = "jsDelComment";
    
    delSpan.innerHTML = " ✖️";
    
    span.innerHTML = comment;
    delSpan.addEventListener("click", handleDelete);
    delSpan.appendChild(hidden);
    li.appendChild(span);
    li.appendChild(delSpan);
    //li.appendChild(a);
    commentList.prepend(li);
    increaseNumber();
}


const sendComment = async comment => {
     const videoId = window.location.href.split("/videos/")[1];
    
    console.log(window.location.href);

    await axios({
      url: `/api/${videoId}/comment`,
      method: "POST",
      data: {
        comment
      }
    }).then(async res => {
      return await res;
    }).then(res2 => {
        console.log(res2);

        //console.log(response);
        if (res2.status === 200) {
          //console.log(comment);
          const {data :{commentId}} = res2

          addComment(comment, commentId);
        }
    });

}
    


function handleSubmit(event) {
    // 이벤트 취소
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment)
    commentInput.value = "";
}




function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
    init();
}