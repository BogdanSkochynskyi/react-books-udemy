import axios from 'axios';
import { useState, useEffect } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const responce = await axios.get('http://localhost:3001/books');

    setBooks(responce.data);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const responce = await axios.put(`http://localhost:3001/books/${id}`, 
    {
      title : newTitle
    });
    
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...responce.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const responce = await axios.post('http://localhost:3001/books', {title});

    const updatedBooks = [
      ...books,
      responce.data,
    ];
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
