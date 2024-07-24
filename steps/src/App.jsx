import { useState } from 'react';
import StepNumber from './StepNumber';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const decrement = () => {
    step > 1 && setStep((s) => s - 1);
  };

  const increment = () => {
    step < messages.length && setStep((s) => s + 1);
  };

  return (
    <>
      <button className='close' onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? '❌' : 'Learn the Truth'}
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            {messages.map((_, idx) => (
              <StepNumber
                key={crypto.randomUUID()}
                step={idx + 1}
                setStep={setStep}
                currStep={step}
              />
            ))}
          </div>
          <p className='message'>
            Step {step}: {messages[step - 1]}
          </p>
          <div className='buttons'>
            <button onClick={decrement}>Previous</button>
            <button onClick={increment}>Next</button>
          </div>
        </div>
      )}
    </>
  );
}

