import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import 'react-toastify/dist/ReactToastify.css';

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await firebase.getBookById(params.bookId);
        setData(bookData.data());
        console.log(bookData.data());
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchData();
  }, [firebase, params.bookId]);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then(url => setURL(url));
    }
  }, [data, firebase]);

  const placeOrder = async () => {
    try {
      const result = await firebase.placeOrder(params.bookId, qty);
      console.log("Order placed", result);
      // Optionally add toast or notification for successful order placement
    } catch (error) {
      console.error('Error placing order:', error);
      // Optionally add toast or notification for failed order placement
    }
  }

  if (data === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      {url && <img src={url} alt={data.name} style={{ width: '50%', height: '50%', borderRadius: '10px' }} />}
      <h2>Details</h2>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h2>Owner Details</h2>
      <img src={data.photoURL} alt="Owner" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>

      <Form.Group className='mb-3' controlId='formBasicQuantity'>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          onChange={(e) => setQty(parseInt(e.target.value))}
          type='number'
          value={qty}
          placeholder='Enter Quantity'
          min={1}
        />
      </Form.Group>

      <Button variant="success" onClick={placeOrder}>Buy Now</Button>
    </div>
  );
}

export default BookDetailPage;
