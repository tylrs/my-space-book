import './App.css';
import { NavLink } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <header className='header'>
        <button>Randomizer</button>
        <h1>My Space Book</h1>
        <NavLink to='/my-liked'>My Liked Images</NavLink>
      </header>
      <Images />
    </main>
  );
}

export default App;
