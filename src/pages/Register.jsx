import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import {useFirebase} from '../context/Firebase';
import {useNavigate} from "react-router-dom";
const RegisterPage = () => {
    const firebase = useFirebase();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
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
        console.log('Signup a user...');
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
       console.log('Successfully signed up...',result);
    };
    console.log(firebase);
  return (
    <Container className='mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control onChange={e =>setEmail(e.target.value)} type='email' value={email} placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={e =>setPassword(e.target.value)} type='password' value={password} placeholder='Enter password' />
          {/* <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group> */}

        <Button variant='primary' type='submit'>
          Crate Account
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
