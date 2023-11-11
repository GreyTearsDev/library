"use strict";

let myLibrary = [];
const bookModal = document.querySelector("[data-modal]");
const bookOpenModal = document.querySelector("[data-open-modal]");
const bookCloseModal = document.querySelector("[data-close-modal]");
const bookAdd = document.querySelector("#submit");
const bookContainer = document.querySelector("main");
let bookRemove = document.querySelectorAll(".book-delete-btn");
let readTogglers = document.querySelectorAll(".read-btn");

function createHTMLBooks(book) {
  //create the new alements
  const newBook = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const year = document.createElement("p");
  const pages = document.createElement("p");
  const deleteBtn = document.createElement("button");
  const readStatus = document.createElement("button");

  //set the classes
  newBook.classList.add("book");
  title.classList.add("book-title");
  author.classList.add("book-author");
  year.classList.add("book-year");
  pages.classList.add("book-pages");
  deleteBtn.classList.add("book-delete-btn");
  readStatus.classList.add("read-btn");

  //add content
  title.textContent = book.title;
  author.textContent = book.author;
  year.textContent = book.year;
  pages.textContent = book.numOfPages;
  deleteBtn.textContent = "x";

  if (book.toggleRead() == true) {
    readStatus.textContent = "Have read it";
  } else {
    readStatus.textContent = "Haven't read it";
  }

  //add them to the container
  newBook.appendChild(title);
  newBook.appendChild(author);
  newBook.appendChild(year);
  newBook.appendChild(pages);
  newBook.appendChild(deleteBtn);
  newBook.appendChild(readStatus);

  return newBook;
}

function displayBooks(book) {
  bookContainer.innerHTML = ""; // clears the container to avoid adding the same books twice

  for (let storedBook of myLibrary) {
    if (myLibrary.length > 0 || !(book === storedBook)) {
      let newBook = createHTMLBooks(storedBook);
      let readStatus = newBook.lastElementChild;
      //ad listener to toggle the text on the button
      readStatus.addEventListener("click", function () {
        if (storedBook.toggleRead() == true) {
          readStatus.textContent = "Have read it";
          return;
        }
        readStatus.textContent = "Haven't read it";
      });

      bookContainer.appendChild(newBook);
    }
    continue;
  }
}

function removeBook(bookElement) {
  let title = bookElement.querySelector(".book-title").textContent;
  let author = bookElement.querySelector(".book-author").textContent;
  let year = bookElement.querySelector(".book-year").textContent;
  let pages = bookElement.querySelector(".book-pages").textContent;

  console.log(title);
  console.log(author);
  console.log(year);
  console.log(pages);

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    if (
      title == book.title &&
      author == book.author &&
      year == book.year &&
      pages == book.numOfPages
    ) {
      bookElement.remove();
      myLibrary.splice(i, 1);
      console.log(myLibrary);
      break;
    }
  }
}

function Book(title, author, year, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

Book.prototype.toggleRead = function () {
  if (this.haveRead == true) {
    this.haveRead = false;
    return this.haveRead;
  } else {
    this.haveRead = true;
    return this.haveRead;
  }
};

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

  let book = new Book(title, author, pubYear, numOfPages, haveRead);
  myLibrary.push(book);
  displayBooks(book);
  console.log(myLibrary);

  //clears the input fields before closing the modal
  allInputs.forEach((input) => (input.value = ""));
  bookModal.close();
});

bookContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("book-delete-btn")) {
    console.log("hi");
    event.preventDefault();
    removeBook(event.target.parentElement);
  }
});
