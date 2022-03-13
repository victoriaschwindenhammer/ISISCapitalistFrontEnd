import './App.css';
import { Services } from "./Services";
import { Pallier, World} from './world';



    type ManaProps ={
        world: World
        services:Services
    }
    
    export default function Investor({world, services}: ManaProps){
 
  
    return (
            < div className="Investor">
            <div>
              <h1 className="title">Anges</h1>
            </div>
            <div>
            <img className="imageange" alt="angel logo"  src="../angeactif.png"  /> 
              <div>
                Anges actifs : {world.activeangels}
                </div>
                <div> Les anges rapportent chacun un bonus de 2% ! 
              </div>
              <br></br>
              <div>
                  Anges supplementaires accumules dans cette partie : 
                  </div>
                  <div>
                  {Math.round(150 * Math.sqrt(world.score/Math.pow(10,15))-world.totalangels)}
              </div>
            </div>
          </div>
   
        )
      }