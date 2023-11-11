"use strict";

const myLibrary = [];
const bookModal = document.querySelector("[data-modal]");
const bookOpenModal = document.querySelector("[data-open-modal]");
const bookCloseModal = document.querySelector("[data-close-modal]");
const bookAdd = document.querySelector("#submit");

function createHTMLBooks(book) {
  //create the new alements
  const newBook = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const year = document.createElement("p");
  const pages = document.createElement("p");

  //set the classes
  newBook.classList.add("book");
  title.classList.add("book-title");
  author.classList.add("book-author");
  year.classList.add("book-year");
  pages.classList.add("book-pages");

  //add content
  title.textContent = book.title;
  author.textContent = book.author;
  year.textContent = book.year;
  pages.textContent = `${book.numOfPages} pages`;

  //add them to the container
  newBook.appendChild(title);
  newBook.appendChild(author);
  newBook.appendChild(year);
  newBook.appendChild(pages);

  //add it the the main container
  return newBook;
}

function displayBooks(library) {
  const bookContainer = document.querySelector("main");
  bookContainer.innerHTML = ""; // clears the container to avoid adding the same books twice

  for (let book of library) {
    bookContainer.appendChild(createHTMLBooks(book));
  }
}

function Book(title, author, year, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
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
  displayBooks(myLibrary);
  //clears the input fields before closing the modal
  allInputs.forEach((input) => (input.value = ""));
  bookModal.close();
});

addBookToLibrary(
  "A song of ice and fire",
  "George R. R. Martin",
  1997,
  320,
  "on"
);
