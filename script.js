let regForm=document.querySelector(".register-form");
let allInput=regForm.querySelectorAll("INPUT");
let closeBtn=document.querySelector(".btn-close");
let regList=document.querySelector(".reg-list");
let addBtn=document.querySelector(".add-btn")
console.log(allInput);

 let allRegData=[];
 let url="";

if(localStorage.getItem("allRegisterData") != null){
  allRegData=JSON.parse(localStorage.getItem("allRegisterData"));
}
console.log(allRegData);

// adding data
regForm.onsubmit=(e)=>{
    e.preventDefault();
    let checkEmail=allRegData.find((data)=>data.email ==allInput[1].value)
    // console.log(checkEmail);
    if(checkEmail==undefined){
        allRegData.push({
            name:allInput[0].value, 
            email:allInput[1].value, 
            mobile:allInput[2].value, 
            profile:url == "" ? "profile.jpg" :url
          });
          localStorage.setItem("allRegisterData",JSON.stringify(allRegData));
          swal("data inserted","successfully !","success");    //alert show
          closeBtn.click();
          regForm.reset("");
          getRegData();
        }
        else{
            swal("Email Already exist","faild","warning");
        }
    }
    

const getRegData=()=>{
    regList.innerHTML="";
    allRegData.forEach((data,index)=>{
  //console.log(data,index);
  regList.innerHTML +=`
   <tr>
                    <td>${index+1}</td>
                    <td><img width="30px" src="${data.profile}" alt=""></td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.mobile}</td>
                    <td>
                      <button data="${JSON.stringify(data)}" index="${index}" class="edit-btn btn btn-primary p-1 px-2"><i class="fa-solid fa-pencil"></i></button>
                      <button index="${index}" class="delete-btn btn btn-danger p-1 px-2"><i class="fa-solid fa-trash"></i></button>
                    </td>
                  </tr> `;
    });
    action();
}

// delete data and update data
const action=()=>{
    // delete
let allDelBtn=regList.querySelectorAll(".delete-btn");
//console.log(allDelBtn);
for(let btn of allDelBtn){
    btn.onclick=()=>{
        let index=btn.getAttribute("index");
        //alert(index);
        allRegData.splice(index,1);
        localStorage.setItem("allRegisterData",JSON.stringify(allRegData));
        alert("you want to delete");
        getRegData();
    }
}
// update data
let allEditBtn=regList.querySelectorAll(".edit-btn");
for(let btn of allEditBtn){
    btn.onclick=()=>{
        let index=btn.getAttribute("index");
        // alert(index);
        let data=btn.getAttribute("data")
        addBtn.click();
    }
}
}

getRegData();

// reading photo
allInput[3].onchange=()=>{
let fileReader=new FileReader();
fileReader.readAsDataURL(allInput[3].files[0]);
fileReader.onload=(e)=>{
url=e.target.result;
console.log(url);

}
}
