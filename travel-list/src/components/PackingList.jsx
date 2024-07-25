import { useCallback, useMemo, useState } from 'react';
import PackingItem from './PackingItem.jsx';
import { sortFuncs } from '../sortFuncs.js';

export default function PackingList({ items, onClear, onToggle, onDelete }) {
  const [sortKey, setSortKey] = useState(
    JSON.parse(localStorage.getItem('sortKey')) ?? 'byInput'
  );

  const sortFunc = useMemo(() => sortFuncs[sortKey], [sortKey]);

  const sortedItems = useMemo(
    () => items.toSorted(sortFunc), // ES2023
    [items, sortFunc]
  );

  const handleSort = useCallback((newKey) => {
    setSortKey(newKey);
    localStorage.setItem('sortKey', JSON.stringify(newKey));
  }, []);

  // bad example use case for effect since we already have
  // the only way to change the key above
  // useEffect(() => {
  //   localStorage.setItem('sortKey', JSON.stringify(sortKey));
  // }, [sortKey]);

  return (
    <main>
      <ul className='list'>
        {sortedItems.map((i) => (
          <PackingItem
            key={i.id}
            item={i}
            onToggle={() => onToggle(i)}
            onDelete={() => onDelete(i)}
          />
        ))}
        <div className='actions'>
          <select
            value={sortKey}
            onChange={(ev) => handleSort(ev.target.value)}
          >
            <option value='byInput'>Sort by Input order</option>
            <option value='byPacked'>Sort by Packed</option>
            <option value='byQuantity'>Sort by Quantity</option>
            <option value='byDescription'>Sort by Description</option>
          </select>
          <button disabled={items.length <= 0} onClick={onClear}>
            Clear List
          </button>
        </div>
      </ul>
    </main>
  );
}
