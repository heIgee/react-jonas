export default function PackingItem({ item, onToggle, onDelete }) {
  return (
    <li>
      <input checked={item.isPacked} onChange={onToggle} type='checkbox' />
      <span style={{ textDecoration: item.isPacked ? 'line-through' : '' }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={onDelete}>❌</button>
    </li>
  );
}
