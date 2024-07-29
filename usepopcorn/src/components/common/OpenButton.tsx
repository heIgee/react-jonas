export default function OpenButton({
  isOpen,
  onOpen,
}: {
  isOpen: boolean;
  onOpen: () => void;
}) {
  return (
    <button className='btn-toggle' onClick={onOpen}>
      {isOpen ? '–' : '+'}
    </button>
  );
}
