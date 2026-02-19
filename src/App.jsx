import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Banner from './components/Banner.jsx';
import Row from './components/Row.jsx';
import requests from './services/requests.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './components/Login.jsx';

function Home() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <main>
        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      </main>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogin = useCallback(() => {
    window.localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    window.localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={
            <Login isAuthenticated={isAuthenticated} onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? '/' : '/login'}
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

