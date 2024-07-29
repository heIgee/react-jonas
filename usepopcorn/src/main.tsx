import React from 'react';
import ReactDOM from 'react-dom/client';
// import StarRating from './StarRating';
import App from './components/App.tsx';
import './main.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
    {/* <StarRating labels={['Yikes', 'Meh', 'Okay', 'Nice', 'Great']} />
    <StarRating maxRating={7} defaultRating={3} color='#1272d3' size={2.5} />
    <StarRating maxRating={12} color='red' size={1.75} className='logo' />
    <Dang /> */}
  </React.StrictMode>,
);

// function Dang() {
//   const [state, setState] = useState(0);
//   return (
//     <>
//       <StarRating
//         maxRating={3}
//         labels={[]}
//         color='#a2dd51'
//         size={2}
//         onRatingSet={(r) => setState(r)}
//       />
//       <p>Star is {state}</p>
//     </>
//   );
// }

