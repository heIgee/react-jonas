import { useNavigate } from 'react-router-dom';
import { useFakeUser } from '../context/FakeUserContext';
import styles from './User.module.css';

export default function User() {
  const {
    fakeUserState: { user },
    logout,
  } = useFakeUser();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
  }

  return user ? (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <></>
  );
}
