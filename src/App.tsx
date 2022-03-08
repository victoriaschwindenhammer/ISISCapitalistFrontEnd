import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Services} from "./Services";
import { World} from './world';
import ProductComponent from './Product'
import { updateShorthandPropertyAssignment } from 'typescript';


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
  return (
    <div className="App">
      <div className="header">
        <div> <img src={services.server + world.logo}/><span> {world.name} </span> </div>
        <div> {world.money}  </div>
        <div> multiplicateur </div>
        <div> ID du joueur </div>
      </div>
      <div className="main">
        <div> liste des boutons de menu </div>
        <div className="product">
          <div> <ProductComponent prod={ world.products.product[0] } services={ services }/> </div>
          <div> second produit </div>
          <div> troisième produit </div>
          <div> quatrième produit </div>
          <div> cinquième produit </div>
          <div> sixième produit </div>
        </div>
      </div>
    </div>
  );
}



export default App;
