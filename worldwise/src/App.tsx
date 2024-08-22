import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import { CityProvider } from './context/CityContext';
import CountryList from './components/CountryList';
import CityCard from './components/CityCard';
import Form from './components/Form';
import { FakeUserProvider } from './context/FakeUserContext';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  return (
    <FakeUserProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </FakeUserProvider>
  );
}
