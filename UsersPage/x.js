// const addUser = document.querySelector('#add-user-btn');
// const mainForm = document.querySelector('.main-form');
// const submitBtn = document.querySelector('.submit-btn');
// const userName = document.querySelector('#userName');
// const dateOfBirth = document.querySelector('#dateOfBirth');
// const phoneNumber = document.querySelector('#phoneNumber');
// const userEmail = document.querySelector('#userEmail');
// const profession = document.querySelector('#profession');
// const mainContainer = document.querySelector('.main-container');

const phoneValidation = /^[1-9]\d{9}$/;
const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
  if (localStorage.getItem("userList") === null) 
  {
    userList = [];
  } 
  else 
  {
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
      ')">Delete</button><button onClick="updateUser(' +
      ind +
      ')">update</button>';
    userDetails += '</tr>'
  });

  document.querySelector('currentUsers userContainer').innerHTML = userDetails;
}

document.onload = getData();

function addUser()
{
    if(validateForm() === true)
    {
        let userName = document.querySelector("#userName").value;
        let userAge = document.querySelector("#userAge").value;
        let userPhoneNumber = document.querySelector("#userPhoneNumber").value;
        let userEmail = document.querySelector("#userEmail").value;
        let userAddress = document.querySelector("#userAddress").value;

        let userList;
        if (localStorage.getItem("userList") === null) 
        {
            userList = [];
        } 
        else 
        {
            userList = JSON.parse(localStorage.getItem("userList"));
        }

        userList.push()(
            {
                userName:userName,
                userAge:userAge,
                userPhoneNumber:userPhoneNumber,
                userEmail:userEmail,
                userAddress:userAddress
            }
        )
        localStorage.setItem("userList", JSON.stringify(userList));
        getData();
        document.querySelector("#userName").value = "";
        document.querySelector("#userAge").value = "";
        document.querySelector("#userPhoneNumber").value = "";
        document.querySelector("#userEmail").value = "";
        document.querySelector("#userAddress").value = "";
    }
}

function deleteUser(ind)
{
    let userList;
    if (localStorage.getItem("userList") === null) 
    {
        userList = [];
    } 
    else 
    {
        userList = JSON.parse(localStorage.getItem("userList"));
    }    

    userList.splice(ind, 1);
    localStorage.setItem("userList", JSON.stringify(userList));
    getData();
}

function updateUser(ind)
{
    document.getElementById('#add-btn').classList.remove('active');
    document.getElementById('#update-btn').classList.add('active');
    let userList;
    if (localStorage.getItem("userList") === null) 
    {
        userList = [];
    } 
    else 
    {
        userList = JSON.parse(localStorage.getItem("userList"));
    }    

    document.querySelector("#userName").value = userList[ind].userName;
    document.querySelector("#userAge").value = userList[ind].userAge;
    document.querySelector("#userPhoneNumber").value = userList[ind].userPhoneNumber;
    document.querySelector("#userEmail").value = userList[ind].userEmail;
    document.querySelector("#userAddress").value = userList[ind].userAddress;


    document.querySelector('#update-btn').onclick = function()
    {
        if(validateForm() == true)
        {
            userList[ind].userName = document.querySelector("#userName").value;
            userList[ind].userAge = document.querySelector("#userAge").value;
            userList[ind].userPhoneNumber = document.querySelector("#userPhoneNumber").value;
            userList[ind].userEmail = document.querySelector("#userEmail").value;
            userList[ind].userAddress = document.querySelector("#userAddress").value;

            localStorage.setItem('userList', JSON.stringify(userList));
            showData();

            document.querySelector("#userName").value = "";
            document.querySelector("#userAge").value = "";
            document.querySelector("#userPhoneNumber").value = "";
            document.querySelector("#userEmail").value = "";
            document.querySelector("#userAddress").value = "";
            

            // document.getElementById('#add-btn').classList.add('active');
            // document.getElementById('#update-btn').classList.remove('active');         
        }
    }
}