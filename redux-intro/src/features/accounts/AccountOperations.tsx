import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, payLoan, requestLoan, withdraw } from './accountSlice';

export default function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [loanPurpose, setLoanPurpose] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');

  const { loan, isLoading } = useSelector((store) => store.account);

  const dispatch = useDispatch();

  function handleDeposit() {
    depositAmount && dispatch(deposit(depositAmount, currency));
    setDepositAmount(null);
  }

  function handleWithdrawal() {
    withdrawalAmount && dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount(null);
  }

  function handleRequestLoan() {
    loanAmount && dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount(null);
    setLoanPurpose('');
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className='inputs'>
        <div>
          <label>Deposit</label>
          <input
            type='number'
            value={depositAmount ?? ''}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value='USD'>US Dollar</option>
            <option value='EUR'>Euro</option>
            <option value='GBP'>British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            Deposit {depositAmount}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type='number'
            value={withdrawalAmount ?? ''}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal} disabled={isLoading}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type='number'
            value={loanAmount ?? ''}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder='Loan amount'
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder='Loan purpose'
          />
          <button onClick={handleRequestLoan} disabled={loan > 0}>
            Request loan
          </button>
        </div>

        {loan > 0 && (
          <div>
            <span>Pay back {loan} </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}
