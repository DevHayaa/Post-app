// Password validation
const passwordInput = document.getElementById('inputPassword4');
const passwordHelp = document.getElementById('passwordHelp');

function validatePassword() {
  const password = passwordInput.value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!passwordRegex.test(password)) {
    passwordHelp.textContent = "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
    return false;
  }
  passwordHelp.textContent = "";
  return true;
}

passwordInput.addEventListener('input', validatePassword);

// Email validation
const emailInput = document.getElementById("inputEmail4");

function validateEmail() {
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    emailInput.setCustomValidity("Please enter a valid email address.");
  } else {
    emailInput.setCustomValidity("");
  }
}

emailInput.addEventListener("input", validateEmail);
 
// Sign up form submission with localStorage
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  firstName = document.getElementById("inputFirstName").value;
  lastName = document.getElementById("inputLastName").value;

  // Save user info to localStorage
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);

  const signUpFormContainer = document.getElementById("signUpFormContainer");
  const postApp = document.getElementById("postApp");

  signUpForm.reset();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Account created successfully!",
    showConfirmButton: false,
    timer: 1500,
  });
  signUpFormContainer.classList.add("hidden");
  postApp.classList.remove("hidden");

  // Load user details if available
  loadUserProfile();
});

// Load user details on page load
window.addEventListener("load", function () {
  const savedFirstName = localStorage.getItem('firstName');
  const savedLastName = localStorage.getItem('lastName');

  if (savedFirstName && savedLastName) {
    firstName = savedFirstName;
    lastName = savedLastName;

    document.getElementById("signUpFormContainer").classList.add("hidden");
    document.getElementById("postApp").classList.remove("hidden");
    loadUserProfile();
  }
});

function loadUserProfile() {
  profilePhotoImg.src = localStorage.getItem('profilePhoto') || profilePhotoImg.src;
}

// Save profile picture to localStorage
profilePhotoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    profilePhotoImg.src = reader.result;
    localStorage.setItem('profilePhoto', reader.result);
  };
  reader.readAsDataURL(file);
});
// Save posts in localStorage and load them on page refresh
function post() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const currentTime = new Date().toLocaleTimeString();

  if (title.trim() && description.trim()) {
    const post = {
      title,
      description,
      time: currentTime,
      profilePhoto: profilePhotoImg.src,
      backgroundImage: backgroundImg
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

    renderPost(post);
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
  } else {
    Swal.fire({
      title: "Empty Post",
      text: "Can't publish post without Title or Description",
      icon: "question",
    });
  }
}

// Render post on the screen
function renderPost(post) {
  const postContainer = document.getElementById("post");
  postContainer.innerHTML += `
    <div class="card p-2 mb-2">
      <div class="card-header d-flex">
        <img class="profile-photo" src="${post.profilePhoto}" />
        <div class="name-time d-flex flex-column">
          ${firstName} ${lastName}
          <div class="time">${post.time}</div>
        </div>
      </div>
      <div style="background-image: url(${post.backgroundImage})" class="card-body">
        <blockquote class="blockquote mb-0">
          <p>${post.title}</p>
          <footer class="blockquote-footer">${post.description}</footer>
        </blockquote>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <button type="button" onclick="editpost(this)" class="ms-2 btn editBtn">Edit</button>
        <button type="button" onclick="deletePost(this)" class="ms-2 btn btn-danger deleteBtn">Delete</button>
      </div>
    </div>`;
}

// Load posts on page load
window.addEventListener("load", function () {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(renderPost);
});

function deletePost(button) {
  const postIndex = Array.from(button.closest('.card').parentNode.children).indexOf(button.closest('.card'));
  let posts = JSON.parse(localStorage.getItem('posts'));
  posts.splice(postIndex, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  button.closest('.card').remove();
}
// Image selection visual feedback
function selectImg(src) {
  backgroundImg = src;
  const bgImages = document.getElementsByClassName("bg-img");

  Array.from(bgImages).forEach(img => img.classList.remove('selectedImg'));
  event.target.classList.add('selectedImg');
}


// var firstName, lastName;
// const profilePhotoImg = document.getElementById("profilePhotoImg");
// const profilePhotoInput = document.getElementById("profilePhotoInput");

// profilePhotoImg.addEventListener("click", () => {
//   profilePhotoInput.click();
// });

// profilePhotoInput.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const reader = new FileReader();
//   reader.onload = () => {
//     profilePhotoImg.src = reader.result;
//   };
//   reader.readAsDataURL(file);
// });
// signUpForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   firstName = document.getElementById("inputFirstName").value;
//   lastName = document.getElementById("inputLastName").value;
//   console.log(firstName, lastName);

//   const signUpFormContainer = document.getElementById("signUpFormContainer");
//   var postApp = document.getElementById("postApp");

//   signUpForm.reset();
//   Swal.fire({
//     position: "top-end",
//     icon: "success",
//     title: "Account created successfully!",
//     showConfirmButton: false,
//     timer: 1500,
//   });
//   signUpFormContainer.classList.add("hidden");
//   postApp.classList.remove("hidden");
// });

// var backgroundImg;
// function post() {
//   var title = document.getElementById("title");
//   var description = document.getElementById("description");
//   console.log(firstName, lastName);
//   var currentTime = new Date().toLocaleTimeString();
//   if (title.value.trim() && description.value.trim()) {
//     var post = document.getElementById("post");
//     post.innerHTML += `
//    <div class="card p-2 mb-2">
//        <div class="card-header d-flex">
//        <img class="profile-photo" src="${profilePhotoImg.src}" />
//        <div class="name-time d-flex flex-column">
//         ${firstName} ${lastName}
//         <div class="time">${currentTime}</div>
//       </div>
//     </div>
//       <div style="background-image: url(${backgroundImg})" class="card-body">
//         <blockquote class="blockquote mb-0">
//            <p>${title.value}</p>
//            <footer class="blockquote-footer">${description.value}</footer>
//          </blockquote>
//       </div>
//        <div class="card-footer d-flex justify-content-end">
//          <button type="button" onclick="editpost(this)" class="ms-2 btn  editBtn">Edit</button>
//          <button type="button" onclick="deletePost(this)" class="ms-2 btn btn-danger deleteBtn">Delete</button>
//        </div>
//   </div>`;
//     title.value = "";
//     description.value = "";
//   } else {
//     Swal.fire({
//       title: "Empty Post",
//       text: "Can't publish post without Title or Description",
//       icon: "question",
//     });
//   }
// }
// function selectImg(src) {
//   backgroundImg = src;
//   var bgImg = document.getElementsByClassName("bg-img");

//   for (var i = 0; i < bgImg.length; i++) {
//     bgImg[i].className = "bg-img";
//   }
//   event.target.className += " selectedImg";
// }
// function deletePost(button) {
//   button.parentNode.parentNode.remove();
// }
// function editpost(button) {
//   var card = button.parentNode.parentNode;
//   var title = card.childNodes[3].childNodes[1].childNodes[1].innerHTML;
//   var description = card.childNodes[3].childNodes[1].childNodes[3].innerHTML;
//   document.getElementById("title").value = title;
//   document.getElementById("description").value = description;
//   card.remove();
// }