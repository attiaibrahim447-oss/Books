// Book Library App - Made with ❤️

// مصفوفة لتخزين الكتب
let myLibrary = [];

// كائن يمثل الكتاب
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// إضافة الكتاب للمصفوفة
function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

// عرض الكتب في الصفحة
function displayLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = ""; // مسح المحتوى القديم

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.isRead ? "Read ✅" : "Not Read ❌"}</p>
      <button class="toggle-read" data-index="${index}">Toggle Read</button>
      <button class="delete-book" data-index="${index}">Delete</button>
    `;

    libraryDiv.appendChild(bookCard);
  });

  // إضافة أحداث الأزرار
  document.querySelectorAll(".toggle-read").forEach(btn => {
    btn.addEventListener("click", toggleReadStatus);
  });

  document.querySelectorAll(".delete-book").forEach(btn => {
    btn.addEventListener("click", deleteBook);
  });
}

// تغيير حالة القراءة
function toggleReadStatus(e) {
  const index = e.target.dataset.index;
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayLibrary();
}

// حذف الكتاب
function deleteBook(e) {
  const index = e.target.dataset.index;
  myLibrary.splice(index, 1);
  displayLibrary();
}

// التحكم في إظهار الفورم
const addBookBtn = document.getElementById("btn-add-book");
const addBookForm = document.getElementById("form-add-book");

addBookBtn.addEventListener("click", () => {
  addBookForm.style.display =
    addBookForm.style.display === "none" ? "block" : "none";
});

// عند إرسال الفورم
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // جلب القيم
  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const pages = document.getElementById("book-pages").value.trim();
  const isRead = document.getElementById("book-read").checked;

  if (title && author && pages) {
    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);
    addBookForm.reset();
    addBookForm.style.display = "none";
  } else {
    alert("Please fill in all fields!");
  }
});
