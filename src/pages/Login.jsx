import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import { useFirebase } from '../context/Firebase';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isLoggedIn){
        //navigate to home page
        navigate("/");
    }
  },[firebase,navigate])
  console.log(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in a user...');
    try {
      const result = await firebase.signInUserWithEmailAndPass(email, password);
      console.log('Login successful...', result);
    } catch (error) {
      console.error('Login failed...', error);
    }
  };

  return (
    <Container className='mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            onChange={(e) => setEmail(e.target.value)} 
            type='email' 
            value={email} 
            placeholder='Enter email' 
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            onChange={(e) => setPassword(e.target.value)} 
            type='password' 
            value={password} 
            placeholder='Enter password' 
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      <h1 className='mt-2 mb-2'>OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant='danger'>Signin With Google</Button>

    </Container>
  );
};

export default LoginPage;
