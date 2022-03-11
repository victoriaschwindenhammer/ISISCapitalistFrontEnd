import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
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


/*   useEffect(() => {
    let services = new Services("")
    setServices(services)
    services.getWorld().then(response => {
      setWorld(response.data)
    }
    )

  }, []) */

  const [showManager, setShow] = useState(false);

  function afficher() {
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
          <div> <ProductComponent prod={world.products.product[0]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[1]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[2]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[3]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[4]} services={services} /> </div>
          <div> <ProductComponent prod={world.products.product[5]} services={services} /> </div>
        </div>
      </div>
      <div className="listbtn">


      </div>
    </div>
  );
}
export default App;



