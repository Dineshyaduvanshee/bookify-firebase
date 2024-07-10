import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card'; // Ensure this path is correct
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksSnapshot = await firebase.listAllBooks();
        setBooks(booksSnapshot.docs);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [firebase]);

  return (
    <div className="container mt-5">
      <Row xs={1} md={3} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <BookCard {...book.data()} id={book.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
