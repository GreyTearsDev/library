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
  pages.textContent = `${book.numOfPages} pages`;
  deleteBtn.textContent = "x";

  if (book.haveReadStatus == false) {
    readStatus.textContent = "Haven't read it";
    readStatus.style.backgroundColor = "#e74c3c";
    newBook.style.borderLeftColor = "#e74c3c";
  } else {
    readStatus.textContent = "Have read it";
    readStatus.style.backgroundColor = "#159a9c";
    newBook.style.borderLeftColor = "#159a9c";
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
        storedBook.toggleRead();

        if (storedBook.haveReadStatus == false) {
          readStatus.textContent = "Haven't read it";
          readStatus.style.backgroundColor = "#e74c3c";
          newBook.style.borderLeftColor = "#e74c3c";
          return;
        }
        readStatus.textContent = "Have read it";
        readStatus.style.backgroundColor = "#159a9c";
        newBook.style.borderLeftColor = "#159a9c";
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
  let pages = bookElement.querySelector(".book-pages").textContent.split(" ");

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    if (
      title == book.title &&
      author == book.author &&
      year == book.year &&
      pages[0] == book.numOfPages
    ) {
      bookElement.remove();
      myLibrary.splice(i, 1);
      break;
    }
  }
}

class Book {
  constructor(title, author, year, numOfPages, haveRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
  }

  get haveReadStatus() {
    return this.haveRead;
  }

  toggleRead() {
    if (this.haveRead == true) {
      this.haveRead = false;
    } else {
      this.haveRead = true;
    }
  }
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
  let haveRead = document.querySelector("#have-read");
  let allInputs = document.querySelectorAll("input");

  //check if all inputs are filled
  for (let input of allInputs) {
    if (input.value == "" && !(input === haveRead)) return;
  }

  haveRead = haveRead.checked ? true : false;

  let book = new Book(title, author, pubYear, numOfPages, haveRead);

  myLibrary.push(book);
  displayBooks(book);

  //clears the input fields before closing the modal
  allInputs.forEach((input) => (input.value = ""));
  bookModal.close();
});

bookContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("book-delete-btn")) {
    event.preventDefault();
    removeBook(event.target.parentElement);
  }
});

function defaultBooks() {
  let book1 = new Book("Da Impostah", "GreyTearsDev", 2023, 300, true);
  let book2 = new Book("It", "Stephen King", 1986, 1138, false);
  let book3 = new Book(
    "The Strain",
    "Guillermo Del Toro and Chuck Hogan",
    2009,
    401,
    true
  );

  myLibrary.push(book1);
  myLibrary.push(book2);
  myLibrary.push(book3);

  displayBooks(book1);
  displayBooks(book2);
  displayBooks(book3);
}
defaultBooks();
