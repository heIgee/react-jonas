export default function Footer() {
  const time = new Date();
  const hour = time.getHours();

  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  const shortTime = time.toLocaleTimeString([], { timeStyle: 'short' });
  return (
    <footer className='footer'>
      <div className='order'>
        {isOpen ? (
          <>
            <p>
              {shortTime}: We are open until {closeHour}:00. Come visit us!
            </p>
            <button className='btn'>Order</button>
          </>
        ) : (
          <p>
            {shortTime}: We are closed! Happy to welcome you between {openHour}
            :00 and {closeHour}:00
          </p>
        )}
      </div>
    </footer>
  );
}
