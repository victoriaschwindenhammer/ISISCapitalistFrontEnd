import './App.css';
import { Services } from "./Services";
import {  World,Product } from './world';

    type ManaProps ={
        world: World
        services:Services
    }
    
    export default function Allunlocks({world, services}: ManaProps){

    return (
        < div className="allunlocks">
        <div>
          <h1 className="title">All unlocks </h1>
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
    )
}