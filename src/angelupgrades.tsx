import './App.css';
import { Services } from "./Services";
import { Pallier, World } from './world';

type ManaProps = {
    world: World
    services: Services
}

export default function Angelupgrade({ world, services }: ManaProps) {

    function acheterAngelupragde(u: Pallier) {
        if (world.totalangels >= u.seuil) {
            world.totalangels= world.totalangels - u.seuil;
            u.unlocked = true;
            if (u.idcible = -1) {
                
            }
            if (u.idcible == 0) {
                for (let i = 0; i < world.products.product.length; i++) {
                    if (u.typeratio = 'gain') {
                        world.products.product[i].revenu = world.products.product[i].revenu * u.ratio;
                    }
                    if (u.typeratio = 'vitesse') {
                        world.products.product[i].vitesse = world.products.product[i].vitesse / u.ratio;
                    }
                }
            }
        }
        else { }

    }

    return (
        < div className="angelupgrade">
            <div>
                <h1 className="title">Angel Upgrades</h1>
            </div>
            <div>
                <div>
                    {world.angelupgrades.pallier.filter(angelupgrade => !angelupgrade.unlocked).map(angelupgrade => (
                        <div key={angelupgrade.idcible} className="angelupgradegrid">
                            <div className="logoGrid" id="angelupgradeLogo">
                                <img alt="angelupgrade logo" className="round" src={services.server + angelupgrade.logo} />
                            </div>
                            <div className="infosGrid" id="infosangelupgrade">
                                <div className="seuilGrid" id="angelupgradeSeuil"> {angelupgrade.seuil} €  </div>
                                <div > {angelupgrade.typeratio} : x {angelupgrade.ratio}</div>
                            </div>
                            <div id="closebutton">
                                <button onClick={() => acheterAngelupragde(angelupgrade)} disabled={world.money < angelupgrade.seuil}> Acheter ! </button>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>

    )
}


