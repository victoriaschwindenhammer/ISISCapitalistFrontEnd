import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { World, Product } from './world';
import ProductComponent from './Product'
import { transform } from "./utils";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Manager from "./managers";
import Unlock from "./unlocks";
import Cashupgrade from "./cashupgrades";



function App() {
  
  const [services, setServices] = useState(new Services(""))
  const [world, setWorld] = useState(new World())
  let [qtmulti, setQtmulti] = useState(1);
  let [value, setValue] = useState('Acheter 1');
  let [count, setCount] = useState(0);
  
  //const [product, setProduct] = useState(new Product())
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

  const [showManager, setShowManager] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [showCashupgrade, setShowCashupgrade] = useState(false);
  function afficherManager() {
    if (showManager == true) {
      setShowManager(false)
    }
    else {
      setShowManager(true)
    };
  }

  function afficherUnlock() {
    if (showUnlock == true) {
      setShowUnlock(false)
    }
    else {
      setShowUnlock(true)
    };
  }

  function afficherCashupgrade() {
    if (showCashupgrade == true) {
      setShowCashupgrade(false)
    }
    else {
      setShowCashupgrade(true)
    };
  }

  function onProductionDone(p: Product): void {
    // calcul de la somme obtenue par la production du produit
    let gain = p.revenu *p.quantite;
    // ajout de la somme à l’argent possédé
    addToScore(gain)

  }

  function addToScore(g: number) {
    setWorld(world=>({...world,money:world.money + g, score : world.score+g}));

  }

  
  function multiplicateur() {
    if (qtmulti == 1){
            setValue('Acheter 10');
            setQtmulti(10);
            setCount(count + 1);
          }else 
          if (qtmulti == 10 ){
            setValue('Acheter 100');
            setQtmulti(100);
            setCount(count + 1);
          }else
          if (qtmulti == 100){
            setValue('Acheter max');
            setQtmulti(1000000);
            setCount(count + 1);
          }else 
          if (qtmulti == 1000000){
            setValue('Acheter 1');
            setQtmulti(1);
            setCount(0);
            
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
          <li>Score : <span dangerouslySetInnerHTML={{ __html: transform(world.score) }} /> €</li>
          <li>Coins : <span dangerouslySetInnerHTML={{ __html: transform(world.money) }} /> €</li>
          <div> Multiplicateur :<button onClick={multiplicateur}> {qtmulti} </button>
      </div>
        </div>
      </div>
      <label> Choisis ton pseudo :
        <input type="text" value={username} onChange={onUserNameChanged} id="inputUsername" /></label>
      <div className="main">
        <ul>
         <div className="listbtn"> 
          <li className="btnManagers"> <button onClick={() => afficherManager()}>Managers </button>
            <div> {showManager &&
              <div className="modal"> <Manager world={world} services={services} /> </div>
            }
            
            </div> </li>
            <li><button onClick={() => afficherUnlock()}><i className="btnUnlocks"></i>Unlocks </button>
            <div> {showUnlock&&
              <div className="modal"> <Unlock world={world} prod={world.products.product[0]} services={services} /> </div>
      
            }
            </div> </li>
            <li> <button onClick={() => afficherCashupgrade()}><i className="btnUnlocks"></i>Cash upgrades </button>
            <div> {showCashupgrade &&
              <div className="modal"> <Cashupgrade world={world} services={services} /> </div>
      
            }
            </div> </li>
            </div> 
        </ul>
        <div className="products">
          <div> <ProductComponent prod={world.products.product[0]} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} world={world}/> </div>
          <div> <ProductComponent prod={world.products.product[1]} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} world={world}/> </div>
          <div> <ProductComponent prod={world.products.product[2]} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} world={world}/> </div>
          <div> <ProductComponent prod={world.products.product[3]} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} world={world}/> </div>
          <div> <ProductComponent prod={world.products.product[4]} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} world={world}/> </div>
          <div> <ProductComponent prod={world.products.product[5]} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} world={world}/> </div>
        </div>
      </div>
      
    </div>
  );


}
export default App;



