const studentName = document.querySelector("#fullName");
const studentEmail = document.querySelector("#email");
const studentGender = document.querySelector("#inputGender");
const studentCourse = document.querySelector("#inputCourse");
const addStudentButton = document.querySelector("#btn");
const studentList = document.querySelector("#studentDetails");
const counter = document.querySelector("#count");

addStudentButton.addEventListener("click", addNewStudent);
document.addEventListener("DOMContentLoaded", displayStudentDetails)

function addNewStudent(e) {
  e.preventDefault();

  let newStudent = {
    fullname: studentName.value,
    email: studentEmail.value,
    gender: studentGender.value,
    course: studentCourse.value
  }

  addStudentToList(newStudent);
  storeStudentDetails(newStudent);
  resetField();
}

function displayStudentDetails() {
  let students = fetchStudents();
  for (const student of students) {
    addStudentToList(student)
  }
}

function addStudentToList(student) {
  let row = document.createElement("tr");
  row.innerHTML = `
<td>${student.fullname}</td>
<td>${student.email}</td>
<td>${student.gender}</td>
<td>${student.course}</td>
<td><a href="#" class="btn btn-danger btn-sm">Delete</a></td>
`
  studentList.appendChild(row)
}

function storeStudentDetails(newStudent) {
  let students = fetchStudents();
  students.push(newStudent);
  localStorage.setItem("students", JSON.stringify(students));
  alert("New Student Added Successfully");
  location.reload();
}

function fetchStudents() {
  let students;
  if (localStorage.getItem("students") == null) {
    students = [];
  } else {
    students = JSON.parse(localStorage.getItem("students"));
    if (students.length <= 1) {

      counter.innerText = `${students.length} registered student`;
    } else {
      counter.innerText = `${students.length} registered students`;

    }
  }
  return students;
}

function resetField() {
  studentName.value = "";
  studentEmail.value = "";
  studentGender.value = "";
  studentCourse.value = "";
}