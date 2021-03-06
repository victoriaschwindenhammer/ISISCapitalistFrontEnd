import './managers.css';
import { Services } from "./Services";
import { Pallier, World} from './world';



    type ManaProps ={
        world: World
        services:Services
    }
    
    export default function Manager({world, services}: ManaProps){
  
    function engagerManager(m: Pallier) {
      services.putManager(m);
        if(world.money >= m.seuil){
          world.money= world.money-m.seuil;
          m.unlocked= true;
          world.products.product[m.idcible - 1].managerUnlocked=true;
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
                {world.managers.pallier.filter(manager => !manager.unlocked).map( manager => (
                    <div key={manager.idcible} className="managergrid">
                      <div className="logoGrid" id="managerLogo">
                        <img alt="manager logo" className="round" src={services.server + manager.logo} />
                      </div>
                      <div className="infosGrid" id="infosManagers">
                        <div> {manager.name} </div>
                        <div> {world.products.product[manager.idcible - 1].name}</div>
                        <div className="seuilGrid" id="managerSeuil"> {manager.seuil} € </div>
                      </div>
                      
                      <div>
                        <button  className="hirebutton" onClick={() => engagerManager(manager)} disabled={world.money < manager.seuil}> Engager ! </button>
                      </div>
                    </div>  
                  )
                  )}
              </div>
            </div>
          </div>
   
        )
      }
    
    
