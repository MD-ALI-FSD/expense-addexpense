const eamount = document.querySelector("#eamount");
const ediscrp = document.querySelector("#ediscrp");
const ecategory = document.querySelector("#ecategory");
const submit = document.querySelector(".submit");

var id = -2;

/****************************************************/
// Listen for a click on the submit button
/****************************************************/
submit.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = eamount.value;
  const discription = ediscrp.value;
  const category = ecategory.value;

  //data validation
  if (amount === "" || discription === "" || category === "") {
    const msg = document.querySelector(".msg");
    msg.classList.add("error");
    msg.innerHTML = "Please enter values in all the fields!!!";
    // Remove error after 3 seconds
    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 4000);
  }

  // console.log(amount, discription, category);
  const newUserData = {
    amount: amount,
    discription: discription,
    category: category,
  };
  console.log(newUserData);
  if (id === -2) {
    // storing new data
    console.log("inside if");
    axios
      .post("http://localhost:3000/user/addexpense", newUserData)
      .then((res) => {
        displayData();
        // window.location.href = "./homepage.html";
        // response.redirect("./signup.html");

        // location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // } else if (id !== -2) {
  //   // Editing existing data
  //   axios
  //     .put(`http://localhost:3000/user/edit-user/${id}`, newUserData)
  //     .then((res) => {
  //       console.log(res.data);
  //       id = -2;
  //       // uname.value = "";
  //       // email.value = "";
  //       // mobile.value = "";
  //       // location.reload();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
});

/****************************************************/
// Function to display data already available
/****************************************************/
async function displayData() {
  var html = "";
  //datarv is an object
  const datarv = await axios.get("http://localhost:3000/user/getexpense");
  //datarv.data is an array
  const { allExpenses: allData } = datarv.data;
  // console.log(allData);
  if (allData === null) return;

  for (let i = 0; i < allData.length; i++) {
    html = `<div class="child ${allData[i].id}">
            <div>Amount: ${allData[i].amount}</div>
            <div>Description: ${allData[i].description}</div> 
            <div>Ctegory: ${allData[i].category}</div>
            <button class="editbtn" id="${allData[i].id}">Edit</button>
            <button class="deletebtn" id="${allData[i].id}">Delete</button> 
        </div>`;

    const display = document.querySelector(".display");
    display.insertAdjacentHTML("afterbegin", html);
  }
}
