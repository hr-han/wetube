import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const delList = document.querySelectorAll(".del__comment");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = delBtn => {
    const li = delBtn.closest("li");
    li.remove();
  decreaseNumber();
};

const deleteComment = async event => {
  const videoId = window.location.href.split("/videos/")[1];

  //console.log(videoId);

  const delBtn = event.target
  console.log(delBtn);
  
  const hidden = delBtn.querySelector("input");
  const commentId = hidden.value

  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: "POST",
    data: {
      videoId
    }
  });
  console.log(response);
  if (response.status === 200) {
    delComment(delBtn);
  }
};

export const handleDelete = event => {
    deleteComment(event);
};

function init() {
    for (let i = 0; i < delList.length; i++) {
      delList[i].addEventListener("click", handleDelete);
    }
}

if (delList) {
  init();
}
