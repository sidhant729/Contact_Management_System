const phoneValidation = /^[1-9]\d{9}$/;
const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const addUserBtn = document.querySelector(".addUserBtn");
const mainBtn = document.querySelector(".main-btn");
const mainForm = document.querySelector(".main-form");
const currentUser = document.querySelector(".currentUsers");

const dataAddBtn = document.querySelector(".data-add-btn");
const updateDataBtn = document.querySelector(".data-update-btn");

dataAddBtn.addEventListener("click", () => {
  addUser();
  mainForm.classList.add("active");
  mainBtn.classList.add("active");
  currentUser.classList.add("active");
  dataAddBtn.style.display = "block"; // Show "Add" button
  updateDataBtn.style.display = "none"; // Hide "Update" button
});

addUserBtn.addEventListener("click", () => {
  mainForm.classList.add("active");
  mainBtn.classList.remove("active");
  currentUser.classList.remove("active");
});

function validateForm() {
  let userName = document.querySelector("#userName").value;
  let userAge = document.querySelector("#userAge").value;
  let userPhoneNumber = document.querySelector("#userPhoneNumber").value;
  let userEmail = document.querySelector("#userEmail").value;
  let userAddress = document.querySelector("#userAddress").value;

  if (userName.length === 0) {
    alert("Enter Your Name");
    return false;
  }
  if (userAge < 0 || userAge.length === 0) {
    alert("Enter Valid Age");
    return false;
  }
  if (!userPhoneNumber.match(phoneValidation)) {
    alert("Enter The Correct Phone Number");
    return false;
  }
  if (!userEmail.match(emailValidation)) {
    alert("Enter the Correct Email");
    return false;
  }
  if (userAddress.length === 0) {
    alert("Enter the Address");
    return false;
  }
  return true;
}

function getData() {
  let userList;
  if (localStorage.getItem("userList") === null) {
    userList = [];
  } else {
    userList = JSON.parse(localStorage.getItem("userList"));
  }

  let userDetails = "";

  userList.forEach((user, ind) => {
    userDetails += "<tr>";
    userDetails += "<td>" + user.userName + "</td>";
    userDetails += "<td>" + user.userAge + "</td>";
    userDetails += "<td>" + user.userPhoneNumber + "</td>";
    userDetails += "<td>" + user.userEmail + "</td>";
    userDetails += "<td>" + user.userAddress + "</td>";
    userDetails +=
      '<td><button onClick="deleteUser(' +
      ind +
      ')">Delete</button>' +
      '<button onClick="updateUser(' +
      ind +
      ')">Update</button></td>';
    userDetails += "</tr>";
  });

  document.querySelector(".userContainer").innerHTML = userDetails;
}

getData();

function addUser() {
  if (validateForm()) {
    let userName = document.querySelector("#userName").value;
    let userAge = document.querySelector("#userAge").value;
    let userPhoneNumber = document.querySelector("#userPhoneNumber").value;
    let userEmail = document.querySelector("#userEmail").value;
    let userAddress = document.querySelector("#userAddress").value;

    let userList;
    if (localStorage.getItem("userList") === null) {
      userList = [];
    } else {
      userList = JSON.parse(localStorage.getItem("userList"));
    }

    userList.push({
      userName: userName,
      userAge: userAge,
      userPhoneNumber: userPhoneNumber,
      userEmail: userEmail,
      userAddress: userAddress,
    });

    localStorage.setItem("userList", JSON.stringify(userList));
    getData();
    document.querySelector("#userName").value = "";
    document.querySelector("#userAge").value = "";
    document.querySelector("#userPhoneNumber").value = "";
    document.querySelector("#userEmail").value = "";
    document.querySelector("#userAddress").value = "";
  }
}

function deleteUser(ind) {
  let userList;
  if (localStorage.getItem("userList") === null) {
    userList = [];
  } else {
    userList = JSON.parse(localStorage.getItem("userList"));
  }

  userList.splice(ind, 1);
  localStorage.setItem("userList", JSON.stringify(userList));
  getData();
}

function updateUser(ind) {
  mainForm.classList.add("active");
  mainBtn.classList.remove("active");
  currentUser.classList.remove("active");

  document.querySelector(".data-add-btn").style.display = "none";
  document.querySelector(".data-update-btn").style.display = "block";

  let userList;
  if (localStorage.getItem("userList") === null) {
    userList = [];
  } else {
    userList = JSON.parse(localStorage.getItem("userList"));
  }

  document.querySelector("#userName").value = userList[ind].userName;
  document.querySelector("#userAge").value = userList[ind].userAge;
  document.querySelector("#userPhoneNumber").value = userList[ind].userPhoneNumber;
  document.querySelector("#userEmail").value = userList[ind].userEmail;
  document.querySelector("#userAddress").value = userList[ind].userAddress;

  document.querySelector(".data-update-btn").onclick = function () {
    if (validateForm()) {
      userList[ind].userName = document.querySelector("#userName").value;
      userList[ind].userAge = document.querySelector("#userAge").value;
      userList[ind].userPhoneNumber = document.querySelector("#userPhoneNumber").value;
      userList[ind].userEmail = document.querySelector("#userEmail").value;
      userList[ind].userAddress = document.querySelector("#userAddress").value;

      localStorage.setItem("userList", JSON.stringify(userList));
      getData();

      document.querySelector("#userName").value = "";
      document.querySelector("#userAge").value = "";
      document.querySelector("#userPhoneNumber").value = "";
      document.querySelector("#userEmail").value = "";
      document.querySelector("#userAddress").value = "";

      document.querySelector(".data-add-btn").style.display = "block";
      document.querySelector(".data-update-btn").style.display = "none";

      mainForm.classList.remove("active");
      mainBtn.classList.add("active");
      currentUser.classList.add("active");
    }
  };
}
