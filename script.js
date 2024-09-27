let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let closeBtn = document.querySelector(".btn-close");
let allBtn = regForm.querySelectorAll("BUTTON");
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let searchElement = document.querySelector(".search");
let deleteAllBtn = document.querySelector(".delete-all-btn");
//console.log(allInput);

let allRegData = [];
let url = "";

if (localStorage.getItem("allRegisterData") != null) {
  allRegData = JSON.parse(localStorage.getItem("allRegisterData"));
}
//console.log(allRegData);

// adding data
regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allRegData.find((data) => data.email == allInput[1].value);
  // console.log(checkEmail);
  if (checkEmail == undefined) {
    allRegData.push({
      name: allInput[0].value,
      email: allInput[1].value,
      mobile: allInput[2].value,
      profile: url == "" ? "profile.jpg" : url,
    });
    localStorage.setItem("allRegisterData", JSON.stringify(allRegData));
    swal("data inserted", "successfully !", "success"); //alert show
    closeBtn.click();
    regForm.reset("");
    getRegData();
  } else {
    swal("Email Already exist", "faild", "warning");
  }
};

// read data
const getRegData = () => {
  regList.innerHTML = "";
  allRegData.forEach((data, index) => {
    let dataStr = JSON.stringify(data);
    let finalData = dataStr.replace(/"/g, "'");
    //console.log(data,index);
    regList.innerHTML += `
   <tr>
                    <td>${index + 1}</td>
                    <td><img width="30px" src="${data.profile}" alt=""></td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.mobile}</td>
                    <td>
                      <button data="${finalData}" index="${index}" class="edit-btn btn btn-primary p-1 px-2"><i class="fa-solid fa-pencil"></i></button>
                      <button index="${index}" class="delete-btn btn btn-danger p-1 px-2"><i class="fa-solid fa-trash"></i></button>
                    </td>
                  </tr> `;
  });
  action();
};

// delete data and update data
const action = () => {
  // delete
  let allDelBtn = regList.querySelectorAll(".delete-btn");
  //console.log(allDelBtn);
  for (let btn of allDelBtn) {
    btn.onclick = () => {
      let index = btn.getAttribute("index");
      //alert(index);
      allRegData.splice(index, 1);
      localStorage.setItem("allRegisterData", JSON.stringify(allRegData));
      alert("you want to delete");
      getRegData();
    };
  }
  // update data
  let allEditBtn = regList.querySelectorAll(".edit-btn");
  for (let btn of allEditBtn) {
    btn.onclick = () => {
      let index = btn.getAttribute("index");
      let dataStr = btn.getAttribute("data");

      let finalData = dataStr.replace(/'/g, '"');
      let data = JSON.parse(finalData);
      //alert(index);
      console.log(data);
      addBtn.click();
      allInput[0].value = data.name;
      allInput[1].value = data.email;
      allInput[2].value = data.mobile;
      url = data.profile;

      allBtn[0].disabled = false;
      allBtn[1].disabled = true;

      allBtn[0].onclick = () => {
        allRegData[index] = {
          name: allInput[0].value,
          email: allInput[1].value,
          mobile: allInput[2].value,
          profile: url == "" ? "profile.jpg" : url,
        };
        localStorage.setItem("allRegisterData", JSON.stringify(allRegData));
        swal("data updated", "successfully !", "success"); //alert show
        closeBtn.click();
        regForm.reset("");
        getRegData();
        allBtn[1].disabled = false;
        allBtn[0].disabled = true;
      };
    };
  }
};

getRegData();

// reading photo
allInput[3].onchange = () => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(allInput[3].files[0]);
  fileReader.onload = (e) => {
    url = e.target.result;
    console.log(url);
  };
};


// delete all data
deleteAllBtn.onclick = () => {
  alert("delete all data");
  allRegData = [];
  localStorage.removeItem("allRegisterData");
  getRegData();
};


// search item
searchElement.oninput = () => {
  search();
};
const search = () => {
  let value = searchElement.value.toLowerCase();
  let tr = regList.querySelectorAll("TR");
  //console.log(tr);
  for (let i = 0; i < tr.length; i++) {
    let allTd = tr[i].querySelectorAll("TD");
    let name = allTd[2].innerHTML;
    let email = allTd[3].innerHTML;
    let mobile = allTd[4].innerHTML;
    if (name.toLocaleLowerCase().indexOf(value) != -1) {
      tr[i].style.display = "";
    } else if (email.toLocaleLowerCase().indexOf(value) != -1) {
      tr[i].style.display = "";
    } else if (mobile.toLocaleLowerCase().indexOf(value) != -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
};
