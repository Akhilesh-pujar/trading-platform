import { useState } from 'react';
import styled from 'styled-components';
type Props = {}

type Broker = {
  name: string;
  id: number;
}

type FormValues = {
  selectedBroker: Broker | null;
  userId: string;
  vendorCode: string;
  apiKey: string;
}

const brokers: Broker[] = [
  { name: 'Finvesia', id: 1 },
  { name: 'Other broker coming soon', id: 2 },

]

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
flex-direction:coloumn;
& .form{
  display: flex;
  width:40rem;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

} & .input{
  margin-bottom: 0.8rem;
  width:30rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
} & .select{
  margin-bottom: 10px;
  padding: 0.6rem;
  width:30rem;
  border: 1px solid #ccc;
  border-radius: 5px;
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
}

}`;



const Index = (props: Props) => {

  const [formValues, setFormValues] = useState<FormValues>({
    apiKey: '',
    userId: '',
    vendorCode: '',
    selectedBroker: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const brokerId = parseInt(event.target.value);
    const selectedBroker = brokers.find((broker) => broker.id === brokerId) || null;
    setFormValues({ ...formValues, selectedBroker });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send formValues to finvesia server and check weather api is valid 
    console.log(formValues);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className='form'>

        <select name="broker" onChange={handleSelectChange} className='select'>
          <option value="">Select a broker</option>
          {brokers.map((broker) => (
            <option key={broker.id} value={broker.id}>
              {broker.name}
            </option>
          ))}
        </select>
        <input className='input' type="text" placeholder='UserId' name="userId" value={formValues.userId} onChange={handleInputChange} />

        <input className='input' type="text" name="vendorCode" placeholder='Vendor code' value={formValues.vendorCode} onChange={handleInputChange} />

        <input className='input' type="text" name="apiKey" placeholder='Enter API key' value={formValues.apiKey} onChange={handleInputChange} />

        <button className='button' type="submit" disabled={!formValues.selectedBroker}>ADD Broker</button>


      </form>

    </Container>
  )
}
export default Index;