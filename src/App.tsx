import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { World, Product} from './world';
import ProductComponent from './Product'
import { transform } from "./utils";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Manager from "./managers";

function App() {
  const [services, setServices] = useState(new Services(""))
  const [world, setWorld] = useState(new World())
  const [username, setUsername] = useState("");

  const onUserNameChanged = (e: any) => {
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value);
  }

  useEffect(() => {
 if (username !== "") {
 let services = new Services(username)
 setServices(services)
 services.getWorld().then(response => {
 //let liste = compute_unlocks_list(response.data)
 setWorld(response.data)
 //setUnlockList(liste)
 }
 )
 }
}, [username])
  useEffect(() => {
 let username = localStorage.getItem("username");
 // si pas de username, on génère un username aléatoire
 if (!username || username === "") {
 username = "Linguini" + Math.floor(Math.random() * 10000);
 }
 localStorage.setItem("username", username);
 setUsername(username)
}, [])

  const [showManager, setShow] = useState(false);

  function afficher() {
    setShow(true);
  }

  function onProductionDone(p: Product): void {
    // calcul de la somme obtenue par la production du produit
    let gain = p.revenu
    // ajout de la somme à l’argent possédé
    addToScore(gain)

    function addToScore(g : number){
      world.score= world.score + g;
    }
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
          <li><button ><i className="multiplicateur"></i>Buy x 1</button></li>
        </div>
      </div>
      <label> Choisis ton pseudo :
        <input type="text" value={username} onChange={onUserNameChanged} id="inputUsername" /></label>
      <div className="main">
        <ul>
          <li><button onClick={() => afficher()}><i className="btnManagers"></i>Managers </button>
            <div> {showManager &&
              <div className="modal"> <Manager world2={world} services={services} /> </div>
            }
            </div> </li>
        </ul>
        <div className="products">
          <div> <ProductComponent prod={world.products.product[0]} onProductionDone={onProductionDone} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[1]} onProductionDone={onProductionDone} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[2]} onProductionDone={onProductionDone} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[3]} onProductionDone={onProductionDone} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[4]} onProductionDone={onProductionDone} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[5]} onProductionDone={onProductionDone} services={services} /> </div>
        </div>
      </div>
      <div className="listbtn">


      </div>
    </div>
  );
}
export default App;



