import './App.css';
import { NavLink } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <header className='header'>
        <button>Randomizer</button>
        <h1>My Space Book</h1>
        <NavLink>My Liked Images</NavLink>
      </header>
      
    </main>
  );
}

export default App;
