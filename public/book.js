// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

const db = firebase.firestore();
const library = db.collection('books');

// let myLibrary = firebase.database().ref().child('books');
// myLibrary.on('value', (snapshot) => console.log(snapshot.value));
// console.log(myLibrary);
// db.collection('books').add({
library.get().then((querySnapshot) => {
    querySnapshot.forEach((book) => {
      console.log(book.data());
    });
  });

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
  library.add({
    title: book.title,
    author: book.author,
    numPages: book.numPages,
    read: book.read
  })
  // myLibrary.push(book);
}

function displayBooks() {
  let booklist = document.getElementById('booklist');

  // Clear existing display
  while (booklist.firstChild) {
    booklist.removeChild(booklist.firstChild);
  }

  let i = 0
  library.get().then((querySnapshot) => {
    querySnapshot.forEach(book => {
      bookData = book.data();
      let bookItem = document.createElement('li');
      bookItem.classList.add('book');

      for (let value of Object.values(bookData).sort()) {
        if (typeof value !== 'function') {
          let element = document.createElement('p');
          if (typeof value === 'boolean') {
            let readBtn = document.createElement('button')
            readBtn.appendChild(document.createTextNode(value === true ? 'Read' : 'Not Read'));
            readBtn.id = book.id;
            readBtn.setAttribute('onclick', 'toggleRead(this.id)');
            element.appendChild(readBtn);
          } else {
            let text = typeof value === 'number' ? value + ' pages' : value
            element.appendChild(document.createTextNode(text));
          }
          bookItem.appendChild(element);
        }
      }

      // delete button
      let deleteButton = document.createElement('button');
      deleteButton.appendChild(document.createTextNode('Delete'))
      deleteButton.classList.add('delete');
      deleteButton.id = book.id;
      deleteButton.setAttribute('onclick', 'deleteBook(this.id)')
      bookItem.appendChild(deleteButton);
      i++;

      booklist.appendChild(bookItem);
      })
    })
}

function deleteBook(id) {
  library.doc(id).delete().then(() => console.log('successfully deleted'))
  displayBooks();
}

async function toggleRead(id) {
  // console.log(id);
  let book = await library.doc(id).get();
  library.doc(id).update({
    read: !book.data().read
  })//.then(() => console.log('toggled read'))
  displayBooks();
}

// Display New Book Form on click
let container = document.getElementById('form-container');
let btn = document.getElementById('new-book-btn');
btn.onclick = () => container.style.display = 'flex';

// Close form on clicking 'X'
let closeBtn = document.getElementById('close');
closeBtn.onclick = () => container.style.display = 'none';

// Add book to library on click
let addBtn = document.getElementById('add-book-btn');
addBtn.onclick = (event) => {
  event.preventDefault();
  let form = document.getElementById('book-form');
  let newBook = new Book(form.title.value, form.author.value, parseInt(form.pages.value), form.read.checked);
  addBookToLibrary(newBook);
  form.reset();
  container.style.display = 'none';
  displayBooks();
}

let book1 = new Book('Cooked', 'Michael Pollan', 350, true);
let book2 = new Book('How to Change Your Mind', 'Michael Pollan', 400, false);
displayBooks();