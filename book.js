let myLibrary = [];

function Book(title, author, numPages, read) {
  this.title = title,
  this.author = author,
  this.numPages = numPages,
  this.read = read,
  this.info = function() {
    return `${title} by ${author}, ${numPages} pages, ${read ? 'read' : 'not read yet'}`
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  let booklist = document.getElementById('booklist');

  for (let book of myLibrary) {
    let bookItem = document.createElement('li');
    bookItem.classList.add('book');

    for (let value of Object.values(book)) {
      if (typeof value !== 'function') {
        let element = document.createElement('p');
        let text = typeof value === 'number' ? value + ' pages' : typeof value === 'boolean' ? 'read: ' + value : value
        element.appendChild(document.createTextNode(text));
        bookItem.appendChild(element);
      }
    }

    booklist.appendChild(bookItem);
  }
}

// Display New Book Form on click
let container = document.getElementById('form-container');
let btn = document.getElementById('new-book-btn');
btn.onclick = () => container.style.display = 'block';

// Add book to library on click
let addBtn = document.getElementById('add-book-btn');
addBtn.onclick = (event) => {
  event.preventDefault();
  let form = document.getElementById('book-form');
  let newBook = new Book(form.title.value, form.author.value, parseInt(form.pages.value), form.read.checked);
  addBookToLibrary(newBook);
  console.log(myLibrary);
  displayBooks();
}

let book1 = new Book('Cooked', 'Michael Pollan', 350, true);
let book2 = new Book('How to Change Your Mind', 'Michael Pollan', 400, false);
myLibrary.push(book1);
myLibrary.push(book2);
displayBooks();