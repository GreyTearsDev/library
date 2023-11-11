const myLibrary = [];

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
