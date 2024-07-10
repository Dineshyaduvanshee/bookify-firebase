import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await firebase.fetchMyBooks();
        setBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [firebase]);

  if (books.length === 0) {
    return <div>No books found</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Ordered Books</h1>
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={book.imageURL} className="card-img-top" alt={book.name} />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <p className="card-text">Price: Rs. {book.price}</p>
                <p className="card-text">ISBN: {book.isbn}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
