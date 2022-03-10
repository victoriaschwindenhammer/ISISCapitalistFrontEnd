import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { World } from './world';

    type ManaProps ={
        world2: World
        services:Services
    }
    
    export default function Manager({world2, services}: ManaProps){
    
    
        const [showManager, setShow] = useState(false);
    
    return (
        <div> {showManager &&
            < div className="modal">
            <div>
              <h1 className="title">Managers make you feel better !</h1>
            </div>
            <div>
              <div>
                {world2.managers.pallier.filter(manager => !manager.unlocked).map( manager => (
                    <div key={manager.idcible} className="managergrid">
                      <div className="logoGrid" id="managerLogo">
                        <img alt="manager logo" className="round" src={services.server + manager.logo} />
                      </div>
                      <div className="infosGrid" id="infosManagers">
                        <div> {manager.name} </div>
                        <div> {world2.products.product[manager.idcible - 1].name}</div>
                        <div className="seuilGrid" id="managerSeuil"> {manager.seuil} </div>
                      </div>
                      <div id="closebutton">
                        <button disabled={world2.money < manager.seuil}> Hire! </button>
    
                      </div>
                    </div>
                  ))}
              </div>
              <button onClick={() => setShow(false)}>Close</button>
            </div>
          </div>
    }
    </div>
        )
    } 
