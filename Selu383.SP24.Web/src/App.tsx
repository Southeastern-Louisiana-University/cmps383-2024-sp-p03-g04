import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import imagePath from './assets/logo.png'

function App(){
  let items=["Home","About", "Services","Rooms","Gallery","Contact"];
  return(
    <div>
      <NavBar 
      brandName="EnForce" 
      imageSrcPath={imagePath}
      navItems={items}/>
    </div>
  )
}

export default App