import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoDetail from './pages/TodoDetail';
import NotFound from './pages/NotFound';
import BrokenPage from './pages/BrokenPage';
import ThemeToggle from './components/ThemeToggle'; 

function App() {
  return (
    <>
      {/* Move ThemeToggle to bottom-right corner */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        zIndex: 1000
      }}>
        <ThemeToggle />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
