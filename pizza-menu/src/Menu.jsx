import { pizzaData } from './assets/data';
import Pizza from './Pizza';

export default function Menu() {
  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {pizzaData.length > 0 ? (
        <ul className='pizzas'>
          {pizzaData.map((p) => (
            <Pizza key={crypto.randomUUID()} pizza={p} />
          ))}
        </ul>
      ) : (
        <p>No pizzas yet. Come back later!</p>
      )}
    </main>
  );
}
