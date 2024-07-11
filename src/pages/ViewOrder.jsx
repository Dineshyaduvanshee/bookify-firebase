import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';

const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(firebase.isLoggedIn) {
        const fetchBooks = async () => {
            firebase.fetchMyBooks().then((books) => setBooks(books.docs));
          };
          fetchBooks();
    }
   
  }, [firebase]);
  console.log(books);
  if(!firebase.isLoggedIn) return <h1>please login</h1>

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

