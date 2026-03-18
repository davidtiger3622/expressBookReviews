const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Task 1: Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});
  
// Task 3: Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = [];
  
  // Get all book keys
  let book_keys = Object.keys(books);
  
  // Iterate through books and filter by author
  book_keys.forEach((key) => {
    if(books[key].author === author) {
      filtered_books.push(books[key]);
    }
  });
  
  res.send(JSON.stringify(filtered_books, null, 4));
});

// Task 4: Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = [];
  
  // Get all book keys
  let book_keys = Object.keys(books);
  
  // Iterate through books and filter by title
  book_keys.forEach((key) => {
    if(books[key].title === title) {
      filtered_books.push(books[key]);
    }
  });
  
  res.send(JSON.stringify(filtered_books, null, 4));
});

// Task 5: Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;