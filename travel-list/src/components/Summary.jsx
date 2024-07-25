export default function Summary({ numTotal, numPacked }) {
  return (
    <footer className='summary'>
      You have {numTotal} items on your list
      {numTotal > 0 && (
        <span>
          , {numPacked} of which are packed (
          {((numPacked / numTotal) * 100) | 0}%)
          {numPacked === numTotal && (
            <em>
              <br />
              You are good to go! ✈️
            </em>
          )}
        </span>
      )}
    </footer>
  );
}
