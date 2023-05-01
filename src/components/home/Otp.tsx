import firebase from 'firebase/app'
import { useState } from 'react';
import { getAuth } from "firebase/auth";
import styled from 'styled-components';

const Container = styled.div`
display:flex;
justify-content:center;
& .input{
  width:20rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.25rem;
  &::placeholder {
    font-size: 1.2rem;
    color: rgb(var(--dark-color), 0.5);
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
} & .button{
  font-size: 1rem;
  font-weight: 500;
  color: rgb(var(--light-color));
  padding: 0.75rem 1.25rem;
  border-radius: 5rem;
  background-color: rgb(var(--primary-color));
  border: 1px solid rgb(var(--light-color), 0.1);
  box-shadow: 0 0.25rem 0.5rem rgb(var(--primary-color), 0.25),
    0 0.35rem 1rem rgb(var(--primary-color), 0.1);
  width: fit-content;
  cursor: pointer;
  overflow: hidden;
  transition: 0.5s;
  animation: animate-size 0.75s infinite ease alternate;
  @keyframes animate-size {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  }
  &:hover {
    border-color: transparent;
    box-shadow: 0 0 0.75rem rgb(var(--primary-color), 0.75);
    animation-play-state: paused;
  }
}  & .form{
  display: flex;
  width:20rem;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}`;

type Props = {}

export default function Otp({ }: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendOTP = () => {
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then((verificationId: React.SetStateAction<null>) => setVerificationId(verificationId))
      .catch((error: any) => console.error(error));
  };

  const handleVerifyOTP = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    firebase.auth().signInWithCredential(credential)
      .then((user: any) => console.log(user))
      .catch((error: any) => console.error(error));
  };
  return (
    <Container>
      <form className='form'>
        <input type="number" className='input' placeholder='Enter your Number' id="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

        <input className='input' type="text" id="otp" value={verificationCode} placeholder='Enter your otp' onChange={e => setVerificationCode(e.target.value)} />

      </form>

      <button className='button' onClick={handleSendOTP}>Get OTP</button>
      <button className='button' onClick={handleVerifyOTP}>Verify OTP</button>
      <div id="recaptcha-container">Here captcha will come</div>
    </Container>
  )
}