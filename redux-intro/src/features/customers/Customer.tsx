import { useSelector } from 'react-redux';

export default function Customer() {
  const fullName = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {fullName}</h2>;
}
