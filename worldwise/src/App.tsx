import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import SpinnerFullPage from './components/SpinnerFullPage';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import CityCard from './components/CityCard';
import Form from './components/Form';
import { CityProvider } from './context/CityContext';
import { FakeUserProvider } from './context/FakeUserContext';
import ProtectedRoute from './pages/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  return (
    <FakeUserProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/app'
              element={
                <ProtectedRoute>
                  <CityProvider>
                    <AppLayout />
                  </CityProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to='cities' replace />} />
              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<CityCard />} />
              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </FakeUserProvider>
  );
}
