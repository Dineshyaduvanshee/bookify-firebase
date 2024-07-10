import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import {useNavigate} from 'react-router-dom';
const BookCard = (props) => {
  const firebase = useFirebase();
  const [url, setURL] = useState(null);
  const navigate = useNavigate();  
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then(url => setURL(url));
  }, [props.imageURL, firebase]);

  console.log(props);
  return (
    <Card style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '10px', margin: '25px', overflow: 'hidden' }}>
      <Card.Img variant="top" src={url} style={{ height: '12rem', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.name}</Card.Title>
        <Card.Text>
          This book has a title <strong>{props.name}</strong> and is sold by <strong>{props.displayName}</strong>. It costs Rs. <strong>{props.price}</strong>.
        </Card.Text>
        <Card.Text style={{ fontSize: '0.9rem', color: '#6c757d' }}>
          <strong>ISBN:</strong> {props.isbn}
        </Card.Text>
        <Button variant="primary">Buy Now</Button> &nbsp;
        <Button onClick={e=>navigate(`/book/view/${props.id}`)} variant="success">View</Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
