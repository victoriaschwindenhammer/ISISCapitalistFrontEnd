import './App.css';
import { Services } from "./Services";
import {  World,Product } from './world';

    type ManaProps ={
        world: World
        prod: Product
        services:Services
    }
    
    export default function Unlock({world, prod, services}: ManaProps){

    return (

            < div className="unlock">
            <div>
              <h1 className="title">Maximise tes profits ! </h1>
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
                        <div className="seuilGrid" id="unlockSeuil"> {/* <span dangerouslySetInnerHTML={{ __html: transform(unlock.seuil) }} />  */} {unlock.seuil}</div>
                        <div > {unlock.typeratio} : x {unlock.ratio}</div>
                      </div>
                    </div>  
                  )
                  )}
              </div>
  
            </div>
          </div>
   
        )
      }
    