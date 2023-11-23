import './main.css'
import Timer from './components/Timer.tsx'
import Translit from "./components/Translit.tsx";

function App() {
  return (
      <>
        <div className='block'>
          <Timer />
        </div>
        <Translit />
      </>
  );
}

export default App;
