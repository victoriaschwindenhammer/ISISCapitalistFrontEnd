import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from "./ProgressBar";
import { Services } from "./Services";
import Unlock from './unlocks';
import { Product, World, Pallier } from "./world";

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void;
    services: Services
    world: World;
}


export default function ProductComponent({ prod, onProductionDone, services, world }: ProductProps) {
    const [progress, setProgress] = useState(0)
    let lastupdate = Date.now();

    const savedCallback = useRef(calcScore)
    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    function startFabrication(p: Product) {
        if (p.quantite > 0) {
            prod.timeleft = prod.vitesse;
            lastupdate = Date.now();
            setProgress(0);
        }
        else { }

    }
    function calcScore() {
        if (prod == null) { }
        else {
            if (prod.timeleft == 0) {
            }
            if (prod.timeleft == 0 && prod.managerUnlocked == true) {
                startFabrication(prod);
            }
            if (prod.timeleft != 0) {
                let now = Date.now();
                let elapsetime = now - lastupdate;
                prod.timeleft = prod.timeleft - elapsetime;
                lastupdate = now;
                if (prod.timeleft <= 0) {
                    prod.timeleft = 0;
                    setProgress(0);
                    onProductionDone(prod);
                }
                else {
                    setProgress(((prod.vitesse - prod.timeleft) / prod.timeleft) * 100);

                }
            }
        }
    }



    function acheterProduit(p: Product) {
        if (world.money >= p.cout) {
            let cout = p.cout;
            world.money = world.money - cout;
            p.quantite = p.quantite + 1;
            p.cout = cout * p.croissance;
        }
        for (let i = 0; i < p.palliers.pallier.length; i++) {
            if (p.id == p.palliers.pallier[i].idcible) {
                if (p.palliers.pallier[i].unlocked == false) {
                    if (p.quantite >= p.palliers.pallier[i].seuil) {
                        p.palliers.pallier[i].unlocked = true;
                        if (p.palliers.pallier[i].typeratio = "gain") {
                            p.revenu = p.revenu * p.palliers.pallier[i].ratio
                        }
                    }
                }
            }
        }
        for (let i = 0; i < world.allunlocks.pallier.length; i++) {
            if (world.allunlocks.pallier[i].unlocked == false) {
            if (p.quantite == world.products.product[0].quantite) {
                if (world.products.product[0].quantite == world.products.product[0].quantite) {
                    if (world.products.product[1].quantite == world.products.product[2].quantite) {
                        if (world.products.product[2].quantite == world.products.product[3].quantite) {
                            if (world.products.product[3].quantite == world.products.product[4].quantite) {
                                if (world.products.product[4].quantite == world.products.product[5].quantite) {
                                    if (world.products.product[5].quantite == world.allunlocks.pallier[i].seuil) {
                                        world.allunlocks.pallier[i].unlocked = true;
                                        for (let j = 0; j < world.products.product.length; j++) {
                                            if (world.allunlocks.pallier[i].typeratio = "gain") {
                                                world.products.product[j].revenu = world.products.product[j].revenu * world.allunlocks.pallier[i].ratio;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}


        if (prod == null) {
            return (
                <div>...</div>
            )
        }
        else {
            return (<div className="product">
                <div className="lesdeux">
                    <div className="logo" onClick={() => startFabrication(prod)} ><img className="round" src={services.server + prod.logo} /></div>
                    <div className="quantite">{prod.quantite}</div>
                </div>

                <div className="productcolonnedroite">
                    <div className="lesdeux">
                        <div className="progressbar">
                            <ProgressBar transitionDuration={"0.1s"} customLabel={" "}
                                completed={progress} />
                        </div>
                        <div className="revenu">Rapporte : {prod.revenu * prod.quantite} € </div>
                    </div>
                    <div className="productlignebas">
                        <div><button onClick={() => acheterProduit(prod)} disabled={world.money < prod.cout}>Acheter pour : {prod.cout} € </button></div>
                        <div>Temps restant : {prod.timeleft}s</div>
                    </div>
                </div>
            </div>
            )
        }


    }
