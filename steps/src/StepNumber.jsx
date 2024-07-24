export default function StepNumber({ step, setStep, currStep }) {
  return (
    <div
      onClick={() => setStep(step)}
      className={currStep >= step ? 'active' : ''}
    >
      {step}
    </div>
  );
}
