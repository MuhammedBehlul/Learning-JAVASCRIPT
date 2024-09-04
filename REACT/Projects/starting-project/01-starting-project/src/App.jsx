import Header from './Components/Header';
import './index.css';
import Input from './Components/Input';
import React, { useState } from 'react';
import Results from './Components/Results';

function App() {

  const [formValues, setFormValues] = useState({
    initialInvestment: 1000,
    annualInvestment: 1500,
    expectedReturn: 5,
    duration: 10
  });

  const inputValid = formValues.duration > 0;

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: +value
    });
  };

  return (
    <>
      <Header />
      <Input formValues={formValues} onChange={handleChange} />
      {inputValid || <p className='center'>Please enter a valid duration</p>}
      {inputValid && <Results results={formValues} />}
    </>
  );
}

export default App;
