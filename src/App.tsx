import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
import ProductComponent from './Product'
import { transform } from "./utils";
import 'bootstrap/dist/css/bootstrap.min.css';


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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
          
          <ul className="listbtn">
          <button onClick={() => handleShow()}><i className="btnManagers"></i>Managers</button></ul>
          <div> {showManager &&
        < div className="modal">
        <div>
          <h1 className="title">Managers make you feel better !</h1>
        </div>
        <div>
          <div>
            {world.managers.pallier.filter(manager => !manager.unlocked).map(
              manager => (
                <div key={manager.idcible} className="managergrid">
                  <div className="logoGrid" id="managerLogo">
                    <img alt="manager logo" className="round" src={services.server + manager.logo} />
                  </div>
                  <div className="infosGrid" id="infosManagers">
                    <div> {manager.name} </div>
                    <div> {world.products.product[manager.idcible - 1].name}</div>
                    <div className="seuilGrid" id="managerSeuil"> {manager.seuil} </div>
                  </div>
                  <div id="closebutton">
                    <button disabled={world.money < manager.seuil}> Hire! </button>
                    
                  </div>
                </div>
              ))}
          </div>
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      </div>
                     } </div>

                     </div> );
    }

                  
              export default App;
