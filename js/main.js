let inpName = document.getElementById("name");
let inpEmail = document.getElementById("email");
let inpImageUrl = document.getElementById("imageUrl");
let btnAll = document.getElementById("btn-all");
let inpAll = document.getElementById("input");
let image = document.getElementById("image");
let list = document.getElementById("task-list");

//? Create - созданиие/добавление новых данных
//? Read - отабражение данных
//? Update - изминение (обновление) существующих данных
//? Delete - удаление всех данных или только выбранной

//? ========= Create start ===========
function createTask(liTask) {
  if (localStorage.getItem("tasks") === null) {
    localStorage.setItem("tasks", "[]");
  }
  let data = JSON.parse(localStorage.getItem("tasks"));
  data.push(liTask);
  localStorage.setItem("tasks", JSON.stringify(data));
}
btnAll.addEventListener("click", () => {
  if (inpName.value.trim() === "") {
    alert("Заполните поле!");
    return;
  } else if (inpEmail.value.trim() === "") {
    alert("Заполните поле!");
    return;
  } else if (inpImageUrl.value.trim() === "") {
    alert("Заполните поле!");
    return;
  }
  let obj = {
    nameTask: inpName.value,
    emailTask: inpEmail.value,
    photo: inpImageUrl.value,
  };
  createTask(obj);

  readTask();

  inpName.value = "";
  inpEmail.value = "";
  inpImageUrl.value = "";
});

inpImageUrl.addEventListener("change", () => {
  image.src = URL.createObjectURL(inpImageUrl.files[0]);
  image.style.display = "block";
});
//? ========= Creat finish ===========

//?========Read Start===========
function readTask() {
  if (localStorage.getItem("tasks") === null) {
    localStorage.setItem("tasks", "[]");
  }
  let data = JSON.parse(localStorage.getItem("tasks"));

  list.innerHTML = "";

  data.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerText = `${item.nameTask}, ${item.emailTask}, ${item.photo}`;

    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Удалить";

    li.append(btnDelete);

    btnDelete.addEventListener("click", () => {
      editTask(index, item);
    });
    list.append(li);
  });
}
//?========Read finish===========

//? =========== Delete Start ==========
function deleteTask(index) {
  let data = JSON.parse(localStorage.getItem("tasks"));

  data.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(data));

  readTask();
}
//? =========== Delete finish ==========

//?============ Edit start ============
let mainModal = document.querySelector(".main-modal");
let innerModalName = document.getElementById("innerModalName");
let innerModalEmail = document.getElementById("innerModalEmail");
let innerModalUrl = document.getElementById("innerModalUrl");

let boxIndex = document.querySelector(".boxIndex");

function editTask(index, item) {
  console.log(item);
  mainModal.style.display = "block";
  innerModalName.value = `${item.nameTask}`;
  innerModalEmail.value = `${item.emailTask}`;
  innerModalUrl.value = `${item.photo}`;

  boxIndex.setAttribute("id", index);
}

let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", () => {
  if (!innerModalName.value.trim()) {
    alert("Заполните поле 'name'");
    return;
  } else if (!innerModalEmail.value.trim()) {
    alert("Заполните поле 'email'");
    return;
  } else if (!innerModalUrl.value.trim()) {
    alert("Заполните поле 'imgUrl'");
    return;
  }

  let data = JSON.parse(localStorage.getItem("tasks"));

  let obj2 = {
    name: innerModalName.value,
    email: innerModalEmail.value,
    imgUrl: innerModalUrl.value,
  };

  data.splice(boxIndex.id, 1, obj2);

  localStorage.setItem("tasks", JSON.stringify(data));

  readTask();
  mainModal.style.display = "none";
});

let btnCloseModal = document.getElementById("btnCloseModal");
btnCloseModal.addEventListener("click", () => {
  mainModal.style.display = "none";
});
//?============ Edit finish ============
readTask();
