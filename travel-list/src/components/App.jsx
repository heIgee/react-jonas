import { useCallback, useEffect, useState } from 'react';
import AddItemForm from './AddItemForm';
import Header from './Header';
import PackingList from './PackingList';
import Summary from './Summary';

// prettier-ignore
const initialItems = [
  { id: crypto.randomUUID(), description: 'Passports', quantity: 2, isPacked: false },
  { id: crypto.randomUUID(), description: 'Socks', quantity: 12, isPacked: true },
  { id: crypto.randomUUID(), description: 'Cats', quantity: 5, isPacked: false },
  { id: crypto.randomUUID(), description: 'Apples', quantity: 4, isPacked: true },
];

export default function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('packingItems')) ?? initialItems
  );

  useEffect(() => {
    localStorage.setItem('packingItems', JSON.stringify(items));
  }, [items]);

  // memoization calls in this app are mostly for fun

  const addItem = useCallback((item) => {
    setItems((prev) => [
      ...prev,
      { ...item, isPacked: false, id: crypto.randomUUID() },
    ]);
  }, []);

  const removeItem = useCallback((item) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }, []);

  const toggleItem = useCallback((item) => {
    setItems((prev) =>
      prev.map((i) => {
        return i.id === item.id ? { ...i, isPacked: !i.isPacked } : i;
      })
    );
  }, []);

  const clearItems = useCallback(() => {
    setItems(() => []);
  }, []);

  const handleClear = useCallback(() => {
    if (confirm('Are you sure to remove all items?')) clearItems();
  }, [clearItems]);

  return (
    <div className='app'>
      <Header />
      <AddItemForm onAdd={addItem} />
      <PackingList
        items={items}
        onClear={handleClear}
        onToggle={toggleItem}
        onDelete={removeItem}
      />
      <Summary
        numTotal={items.length}
        numPacked={items.filter((i) => i.isPacked).length}
      />
    </div>
  );
}

