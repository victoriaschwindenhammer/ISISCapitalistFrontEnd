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
        <div ><img className="round" src={services.server + world.logo} /></div>
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
        <div className="products">
          <div> <ProductComponent prod={world.products.product[0]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[1]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[2]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[3]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[4]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[5]} services={services} /> </div>
        </div>
      </div>
      <div className="listbtn">
        <button onClick={() => fonction()}><i className="btnManagers"></i>Managers</button>
        <div> <Manager world2 = {world} services = {services}/> </div>
        </div>
    </div>
    );
    } 
    export default App;

                  
              
