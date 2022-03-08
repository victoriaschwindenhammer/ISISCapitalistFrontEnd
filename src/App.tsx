import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Services} from "./Services";
import { World} from './world';
import ProductComponent from './Product'
import { transform } from "./utils";
//import { updateShorthandPropertyAssignment } from 'typescript';


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
  //je sais pas pq le titre est en deux fois...
  return (
    
    <div className="App">
      <div className="header">
      <img src={services.server + world.logo} />
        <label className="logo">{world.name}</label>
            <div className ="titre">
            Mario Capitalist
            </div>
        <ul className="listeHeader">
          <li>{services.user}</li>
          <li>Score : {world.score}</li>
          <li>Money : <span dangerouslySetInnerHTML={{ __html: transform(world.money) }} /> $</li>
        </ul>
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
