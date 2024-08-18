export default function FlagImg({ countryCode }: { countryCode: string }) {
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />
  );
}
