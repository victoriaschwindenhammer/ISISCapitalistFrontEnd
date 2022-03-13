import React, { useEffect, useState } from 'react';
import './App.css';
import { Services } from "./Services";
import { World, Product } from './world';
import ProductComponent from './Product'
import { transform } from "./utils";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Manager from "./managers";
import Unlock from "./unlocks";
import Allunlocks from "./allunlocks";
import Cashupgrade from "./cashupgrades";
import Badge from '@mui/material/Badge';



function App() {
  
  const [services, setServices] = useState(new Services(""))
  const [world, setWorld] = useState(new World())
  let [qtmulti, setQtmulti] = useState("1");
  //let [value, setValue] = useState('Acheter 1');
  //let [count, setCount] = useState(0);
  let [BadgeMana, setBadgeMana] = useState(0);
  
  
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

      
  function Badges() {
    if (world.money > world.managers.pallier[5].seuil) {
      setBadgeMana(6);
    }
    else if (world.money > world.managers.pallier[4].seuil) {
      setBadgeMana(5);
    }
    else if (world.money > world.managers.pallier[3].seuil) {
      setBadgeMana(4);
    }
    else if (world.money > world.managers.pallier[2].seuil) {
      setBadgeMana(3);
    }
    else if (world.money > world.managers.pallier[1].seuil) {
      setBadgeMana(2);
    }
    else {
      setBadgeMana(1);
    }
  }

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
    if (qtmulti == "1"){
            //setValue('Acheter 10');
            setQtmulti("10");
            //setCount(count + 1);
          }else 
          if (qtmulti == "10" ){
            //setValue('Acheter 100');
            setQtmulti("100");
            //setCount(count + 1);
          }else
          if (qtmulti == "100"){
            //setValue('Acheter max');
            setQtmulti("MAX");
            //setCount(count + 1);
          }else 
          if (qtmulti == "MAX"){
            //setValue('Acheter 1');
            setQtmulti("1");
            //setCount(0);
            
        }
      }
     
      
      
  return (
    <div className="App">
      <div className="header">
        <div ><img className="round" src={services.server + world.logo} /></div>
        <div> <img className="titre" src="../supermariocapitalist.png" />
          
        </div><ul>
        <div className="listeHeader">
          
          {services.user}
         <div> Score : <span dangerouslySetInnerHTML={{ __html: transform(world.score) }} /> €</div>
         <div >Coins :  <span  dangerouslySetInnerHTML={{ __html: transform(world.money) }} />€</div>
          <div> <button className="multi" onClick={multiplicateur}> x {qtmulti} </button>
      </div>
        </div></ul>
      </div>
      <label> Choisis ton pseudo :
        <input type="text" value={username} onChange={onUserNameChanged} id="inputUsername" /></label>
      <div className="main">
        <ul>
         <div className="listbtn"> 
          < div> <Badge badgeContent={Badges} color="primary"> <button className="btnmana" onClick={() => afficherManager()}></button></Badge> 
          <div> 

          </div> <div> {showManager &&
              <div className="modal"> <Manager world={world} services={services} /> </div>
            }
            </div>
            </div> 
            <br></br>
          <button className="btnUnlocks" onClick={() => afficherUnlock()}> </button>
            <div> {showUnlock&&
              <div className="modal"> <div><Unlock world={world} prod={world.products.product[0]} services={services} /> </div>
              <div><Unlock world={world} prod={world.products.product[1]} services={services} /> </div>
              <div><Unlock world={world} prod={world.products.product[2]} services={services} /> </div>
              <div><Unlock world={world} prod={world.products.product[3]} services={services} /> </div>
              <div><Unlock world={world} prod={world.products.product[4]} services={services} /> </div>
              <div><Unlock world={world} prod={world.products.product[5]} services={services} /> </div>
              <div><Allunlocks world={world} services={services} /> </div>
              </div>
      
            }
            <br></br>
            </div>
             <button className="btnupgrades" onClick={() => afficherCashupgrade()}></button>
            <div> {showCashupgrade &&
              <div className="modal"> <Cashupgrade world={world} services={services} /> </div>
      
            }
            </div> 
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



