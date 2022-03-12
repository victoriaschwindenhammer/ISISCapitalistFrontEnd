import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { Pallier, World,Product } from './world';
import startFabrication from './Product';
import { transform } from "./utils";

    type ManaProps ={
        world: World
        prod: Product
        services:Services
    }
    
    export default function Unlock({world, prod, services}: ManaProps){

    return (

            < div className="unlock">
            <div>
              <h1 className="title">Unlocks </h1>
            </div>
            <div>
              <div>  
                { prod.palliers.pallier.filter(unlock => !unlock.unlocked).map( unlock => (
                    <div key={unlock.idcible} className="unlockgrid">
                      <div className="logoGrid" id="unlockLogo">
                        <img alt="unlock logo" className="round" src={services.server + unlock.logo} />
                      </div>
                      <div className="infosGrid" id="infosUnlocks">
                      
                        {/* <div> {world.products.product[unlock.idcible - 1].name}</div> */}
                        <div className="seuilGrid" id="unlockSeuil"> <span dangerouslySetInnerHTML={{ __html: transform(unlock.seuil) }} />  </div>
                        <div > {unlock.typeratio} : x {unlock.ratio}</div>
                      </div>
                    </div>  
                  )
                  )}
              </div>
              <div>
                {world.allunlocks.pallier.filter(allunlock => !allunlock.unlocked).map( allunlock => (
                    <div key={allunlock.idcible} className="allunlockgrid">
                      <div className="logoGrid" id="allunlockLogo">
                        <img alt="allunlock logo" className="round" src={services.server + allunlock.logo} />
                      </div>
                      <div className="infosGrid" id="infosAllunlock">
                        <div className="seuilGrid" id="managerSeuil"> {allunlock.seuil}  </div>
                        <div > {allunlock.typeratio} : x {allunlock.ratio}</div>
                      </div>
                    </div>  
                  )
                  )}
              </div>
            </div>
          </div>
   
        )
      }
    