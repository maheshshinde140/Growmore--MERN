
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './views/Home/Home.js'
import About from './views/About/About.js';
import Plans from './views/Plans/Plans.js';
import Contact from './views/Contact/Contact.js';

function App() {
  return (
    <div className="App">
     {/* <BrowserRouter>
     <Navbar/>
      <Routes>
           <Route path='/' element={ <Home/>}/>
           <Route path='/about' element={<About/> }/>
           <Route path='/plans' element={<Plans/> }/>
           <Route path='/contact' element={<Contact/> }/>
      </Routes>
      <Footer/>
    </BrowserRouter>  */}
   
    </div>
  );
}

export default App;
