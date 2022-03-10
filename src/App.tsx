import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
import ProductComponent from './Product'
import { transform } from "./utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import Manager from "./managers";

function App() {
  const [services, setServices] = useState(new Services(""))
  const [world, setWorld] = useState(new World())
  useEffect(() => {
    let services = new Services("")
    setServices(services)
    services.getWorld().then(response => {
      setWorld(response.data)
    }
    )

  }, [])

 
  const [showManager, setShow] = useState(false);
    
  function fonction(){
    setShow(true);
  }

  return (

    <div className="App">
      <div className="header">
        <img src={services.server + world.logo} />
        <div className="titre">
          {world.name}
        </div>
        <div className="listeHeader">
          <li>{services.user}</li>
          <li>Score : {world.score}</li>
          <li>Money : <span dangerouslySetInnerHTML={{ __html: transform(world.money) }} /> $</li>
        </div>
      </div>
      <div className="main">
        <div> liste des boutons de menu </div>
        
        <div className="product">
          <div> <ProductComponent prod={world.products.product[0]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[1]} services={services} /> </div>
          <div> 3 </div>
          <div> 4 </div>
          <div> 5 </div>
          <div> 6 </div>
          </div>
          </div>
          
          <div className="listbtn">
          <button onClick={() => fonction()}><i className="btnManagers"></i>Managers</button>
          <div> <Manager world2 = {world} services = {services}/> </div>
          </div>
         

                     </div> );
    }

                  
              export default App;
