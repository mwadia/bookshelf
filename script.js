const mainDiv = document.querySelector('#book-shelf');
const body = document.querySelector('body');
const shelves = [];
let popupVisible = false;

var title, author, img, activeShelf;

const books = [
  {
    title: 'book1',
    author: 'John Doe',
    img: 'https://bit.ly/3BzLMfM',
  },
  {
    title: 'book2',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book3',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book4',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book5',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book6',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book7',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book8',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book9',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
  {
    title: 'book10',
    author: 'John Doe',
    img: 'https://i.stack.imgur.com/y9DpT.jpg',
  },
];

const popup = createPopup();

function createGrid(parentElement, gridSize) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const shelf = document.createElement('div');
    shelf.classList.add('shelf');
    shelf.id = i;
    parentElement.appendChild(shelf);
    shelves.push(shelf);
  }
}

function togglePopup() {
  popupVisible = !popupVisible;
  popupVisible = popupVisible;
  popup.style.display = popupVisible ? 'flex' : 'none';
}

function createHeader() {
  const header = document.createElement('div');
  header.classList.add('header');
  const headerButton = document.createElement('button');
  headerButton.classList.add('header-button');
  headerButton.textContent = 'Add New Book';
  headerButton.addEventListener('click', togglePopup);
  header.appendChild(headerButton);
  body.prepend(header);
}

function addNewBook(book, shelfIndex) {
  if (shelves.length > shelfIndex) {
    const bookNode = document.createElement('div');
    bookNode.classList.add('book-item');
    const titleNode = document.createElement('p');
    titleNode.classList.add('book-title');
    titleNode.textContent = book.title;
    const authorNode = document.createElement('p');
    authorNode.classList.add('book-author');
    authorNode.textContent = book.author;
    const imgNode = document.createElement('img');
    imgNode.classList.add('book-img');
    imgNode.src = book.img;

    bookNode.appendChild(imgNode);
    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);

    shelves[shelfIndex].appendChild(bookNode);

    return bookNode;
  }

  return false;
}

function getRandomShelfIndex() {
  const max = 9;
  return Math.floor(Math.random() * max);
}

function linkBooks(books) {
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    addNewBook(book, getRandomShelfIndex());
  }
}

function onFieldsChange(e) {
  const val = e.target.value;
  const name = e.target.name;
  switch (name) {
    case 'Title':
      title = val;
      break;
    case 'Author':
      author = val;
      break;
    case 'Image':
      img = val;
      break;
    case 'Shelf':
      activeShelf = Number(val);
  }
}

function createFormControl(name, type, selectOptions) {
  let container = document.createElement('div');
  container.classList.add('form-control');
  const label = document.createElement('label');
  label.classList.add('form-control-label');
  label.textContent = name;
  let field;
  if (type === 'select') {
    field = document.createElement('select');
    for (let i = 0; i < selectOptions.length; i++) {
      const option = document.createElement('option');
      option.value = selectOptions[i];
      option.textContent = selectOptions[i];
      field.appendChild(option);
    }
  } else {
    field = document.createElement('input');
    field.type = type;
  }

  field.addEventListener('change', onFieldsChange);
  field.name = name;

  container.appendChild(label);
  container.appendChild(field);

  return container;
}

function onFormSubmit(e) {
  e.preventDefault();
  const newBookObj = {
    title,
    author,
    img,
  };

  addNewBook(newBookObj, Number(activeShelf) - 1);
}

function createPopup() {
  const popupOverlay = document.createElement('div');
  popupOverlay.classList.add('popup-overlay');
  popupOverlay.addEventListener('click', togglePopup);

  const popupContent = document.createElement('div');
  popupContent.addEventListener('click', function (e) {
    e.stopPropagation();
  });
  popupContent.classList.add('popup-content');
  popupOverlay.appendChild(popupContent);

  const form = document.createElement('form');
  form.addEventListener('submit', onFormSubmit);

  const titleControl = createFormControl('Title', 'text');
  const authorControl = createFormControl('Author', 'text');
  const imgControl = createFormControl('Image', 'text');
  const shelfSelectControl = createFormControl(
    'Shelf',
    'select',
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  );

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add('popup-button');
  submitButton.textContent = 'Add';

  form.appendChild(titleControl);
  form.appendChild(authorControl);
  form.appendChild(imgControl);
  form.appendChild(shelfSelectControl);
  form.appendChild(submitButton);
  popupContent.appendChild(form);

  body.appendChild(popupOverlay);

  return popupOverlay;
}

createHeader();
createGrid(mainDiv, 3);
linkBooks(books);
