import './App.css';
import { NavLink } from 'react-router-dom';
import Images from '../Images/Images';
import sampleData from '../../sample-data';

const App = () => {
  return (
    <main>
      <header className='header'>
        <button>Randomizer</button>
        <h1>My Space Book</h1>
        <NavLink to='/my-liked'>My Liked Images</NavLink>
      </header>
      <Images imagesInfo={sampleData}/>
    </main>
  );
}

export default App;
