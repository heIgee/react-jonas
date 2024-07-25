import { useState } from 'react';

export default function AddItemForm({ onAdd }) {
  const [itemData, setItemData] = useState({ description: '', quantity: 1 });

  const handleAdd = () => {
    if (!itemData.description) return;
    onAdd(itemData);
    setItemData(() => ({ description: '', quantity: 1 }));
  };

  return (
    <section className='add-form'>
      <p>What do you not want to forget for your trip?</p>
      <select
        value={itemData.quantity}
        onChange={(ev) =>
          setItemData((i) => ({ ...i, quantity: Number(ev.target.value) }))
        }
      >
        {Array.from({ length: 99 }, (_, idx) => (
          <option key={idx} value={idx + 1}>
            {idx + 1}
          </option>
        ))}
      </select>
      <input
        value={itemData.description}
        onChange={(ev) =>
          setItemData((i) => ({ ...i, description: ev.target.value }))
        }
        type='text'
      />
      <button onClick={handleAdd} disabled={!itemData.description}>
        Add
      </button>
    </section>
  );
}
