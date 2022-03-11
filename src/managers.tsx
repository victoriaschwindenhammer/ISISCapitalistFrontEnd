import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { Pallier, World,Product } from './world';
import startFabrication from './Product';

    type ManaProps ={
        world2: World
        services:Services
    }
    
    export default function Manager({world2, services}: ManaProps){
      
    function engagerManager(m: Pallier) {
        if(world2.money >= m.seuil){
          world2.money= world2.money-m.seuil;
          m.unlocked= true;
          world2.products.product[m.idcible - 1].managerUnlocked=true;
        }
        else {}

    } 

    return (

            < div className="manager">
            <div>
              <h1 className="title">Chacun son travail ! Engages un de nos managers pour te faciliter la vie : </h1>
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
                        <div className="seuilGrid" id="managerSeuil"> {manager.seuil} € </div>
                      </div>
                      <div id="closebutton">
                        <button onClick={() => engagerManager(manager)} disabled={world2.money < manager.seuil}> Engager ! </button>
                      </div>
                    </div>  
                  )
                  )}
              </div>
            </div>
          </div>
   
        )
      }
    
    
