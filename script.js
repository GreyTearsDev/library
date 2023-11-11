"use strict";

const myLibrary = [];
const bookModal = document.querySelector("[data-modal]");
const bookOpenModal = document.querySelector("[data-open-modal]");
const bookCloseModal = document.querySelector("[data-close-modal]");
const bookAdd = document.querySelector("#submit");
const bookContainer = document.querySelector("main");

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.haveRead}`;
  };
}

function addBookToLibrary(title, author, year, numOfPages, haveRead) {
  myLibrary.push(new Book(title, author, year, numOfPages, haveRead));
}

bookOpenModal.addEventListener("click", () => {
  bookModal.showModal();
});

bookCloseModal.addEventListener("click", (event) => {
  event.preventDefault();
  bookModal.close();
});

bookAdd.addEventListener("click", (event) => {
  event.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pubYear = document.querySelector("#pub-year").value;
  let numOfPages = document.querySelector("#num-of-pages").value;
  let haveRead = document.querySelector("#have-read").value;
  let allInputs = document.querySelectorAll("input");

  addBookToLibrary(title, author, pubYear, numOfPages, haveRead);

  //clears the input fields before closing the modal
  allInputs.forEach((input) => (input.value = ""));

  bookModal.close();
});
