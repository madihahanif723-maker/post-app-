var cardBg
var time = moment().format("MMMM Do YYYY, h:mm:ss a");
var loginPt = false;
var currentUser = "";


function deletePost() {
  var card = event.target.parentNode.parentNode
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      card.remove();
      Swal.fire({
        title: "Deleted!",
        text: "Your post has been deleted.",
        icon: "success"
      });
    }
  });
}


function editPost() {
  var card = event.target.parentNode.parentNode
  var title = card.children[1].children[0].children[0].children[0].innerText
  var description = card.children[1].children[0].children[1].innerText
  Swal.fire({
    icon: "question",
    title: "Edit post",
    text: "You want to update this post",
    confirmButtonText: "Yes, edit it!"
  }).then(() => {
    document.getElementById("title").value = title
    document.getElementById("description").value = description
    card.remove()
  })
}


function post() {
  var title = document.getElementById("title")
  var description = document.getElementById("description")
  console.log(title.value, description.value);
  var posts = document.getElementById("posts")
  var currentTime = new Date().toLocaleTimeString();
  if (title.value.trim() && description.value.trim()) {
    posts.innerHTML += `
     <div class="card mb-2 one ">
              <div class="card-header one"> ~${currentUser} <br>
              small style="color:#6e8692;">${time}</small></div>
              <div style="background-image:url(${cardBg})" class="card-body">
                <figure>
                  <blockquote class="blockquote">
                    <p>
                      ${title.value}
                    </p>
                  </blockquote>
                  <figcaption class="blockquote-footer">
                    ${description.value}
                  </figcaption>
                </figure>
              </div>
              <div class="ms-auto m-2">
              <button onclick="editPost()" class="btn btn-success">Edit</button>
              <button onclick="deletePost()" class="btn btn-danger">Delete</button>
              </div>
            </div>
    `
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Title & description can't be empty!",
    });
  }
  title.value = ""
  description.value = ""
}
function selectImg(src) {
  cardBg = src
  console.log(src, event.target.classList);
  // event.target.className += " selectedImg"
  var bgImg = document.getElementsByClassName("bgImg")
  for (var i = 0; i < bgImg.length; i++) {
    console.log(bgImg[i].className);
    bgImg[i].className = "bgImg"
  }
  event.target.classList.add("selectedImg")
}

function logout() {
  currentUser = "";

  Swal.fire({
    icon: "success",
    title: "Logged out!",
    timer: 800,
    showConfirmButton: false,
  });
  document.getElementById("logincontainer").style.display = "block";
  document.getElementById("postContainer").style.display = "none";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("name").value = "";

}


function login() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var userName = document.getElementById("name").value.trim();

  if (email && password && userName) {
    loginPt = true;
    currentUser = userName.charAt(0).toUpperCase() + userName.slice(1);
    document.getElementById("logincontainer").style.display = "none";
    document.getElementById("postContainer").style.display = "block";
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome! " + currentUser
    });

  } else {
    Swal.fire({
      icon: "error",
      title: "Fill all fields",
    });

  }
}
