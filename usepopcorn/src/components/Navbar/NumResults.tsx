export default function NumResults({ num }: { num: number }) {
  return (
    <p className='num-results'>
      Found <strong>{num}</strong> results
    </p>
  );
}
