import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useFirebase } from '../context/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListingPage = () => {
  const firebase = useFirebase();
  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [coverPic, setCoverPic] = useState(null);  // Changed initial state to null

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
      toast.success('Book added successfully!');
    } catch (error) {
      toast.error('Failed to add book!');
    }
  };

  return (
    <Container className='mt-5'>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type='text'
            value={name}
            placeholder='Enter Book Name'
          />
          <Form.Text className='text-muted'>
            We'll never share your Name with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicIsbn'>
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            type='text'
            value={isbnNumber}
            placeholder='Enter ISBN number'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            type='text'
            value={price}
            placeholder='Enter Price'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCoverPic'>
          <Form.Label>Cover Picture</Form.Label>
          <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type='file'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default ListingPage;
