import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from './customerSlice-v2';

export default function CreateCustomer() {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');

  const dispatch = useDispatch();

  function handleCreate() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className='inputs'>
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleCreate}>Create new customer</button>
      </div>
    </div>
  );
}
