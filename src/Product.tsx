import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from "./ProgressBar";
import { Services } from "./Services";
import Unlock from './unlocks';
import { Product, World, Pallier } from "./world";
import './Product.css';

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void;
    services: Services
    world: World;
    qtmulti: String;
    money: number;
}


export default function ProductComponent({ prod, onProductionDone, qtmulti, services, world }: ProductProps) {
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
        //calcMaxCanBuy();


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
        let max = Math.round(world.money / p.cout);
        //let croissancetotale = 0 

        if (Number(qtmulti) == 1 || Number(qtmulti) == 10 || Number(qtmulti) == 100) {
            /* for (let i=0; i<Number(qtmulti);i++){
            croissancetotale+=Math.pow(p.croissance,i);
            } */
            if (world.money >= p.cout * Number(qtmulti)) {
                let cout = p.cout;
                world.money = world.money - (cout * Number(qtmulti));
                p.quantite = p.quantite + Number(qtmulti);
                p.cout = cout * Math.pow(p.croissance, (Number(qtmulti)));
            }
        }
        if (qtmulti = 'MAX') {
            if (world.money >= p.cout * max) {
                let cout = p.cout;
                world.money = world.money - (cout * max);
                p.quantite = p.quantite + max;
                p.cout = cout * Math.pow(p.croissance, max);
            }
        }

        for (let i = 0; i < p.palliers.pallier.length; i++) {
            if (p.id == p.palliers.pallier[i].idcible) {
                if (p.palliers.pallier[i].unlocked == false) {
                    if (p.quantite >= p.palliers.pallier[i].seuil) {
                        p.palliers.pallier[i].unlocked = true;
                        if (p.palliers.pallier[i].typeratio = "gain") {
                            p.revenu = p.revenu * p.palliers.pallier[i].ratio;
                        }
                        if (p.palliers.pallier[i].typeratio = "vitesse") {
                            p.vitesse = p.vitesse / p.palliers.pallier[i].ratio;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < world.allunlocks.pallier.length; i++) {
            let count = 0
            if (world.allunlocks.pallier[i].unlocked == false) {
                for (let k = 0; i < world.products.product.length; k++) {
                    if (world.products.product[k].quantite == world.allunlocks.pallier[i].seuil) {
                        count += 1;
                    }
                }
                if (count == world.products.product.length) {
                    world.allunlocks.pallier[i].unlocked = true;
                    for (let j = 0; j < world.products.product.length; j++) {
                        if (world.allunlocks.pallier[i].typeratio = "gain") {
                            world.products.product[j].revenu = world.products.product[j].revenu * world.allunlocks.pallier[i].ratio;
                        }
                        if (world.allunlocks.pallier[i].typeratio = "vitesse") {
                            world.products.product[j].vitesse = world.products.product[j].vitesse / world.allunlocks.pallier[i].ratio;
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

    /*        let prix = Math.round(prod.cout*((Math.pow(prod.croissance,qtmulti)-1)/(prod.croissance-1)));
            u0(1-c^n)/(1-c) < world.money dc n =
        function calcMaxCanBuy(){
            let n = Math.log(1+World.money*(prod.croissance-1)/prod.cout)/(Math.log(prod.croissance))
            
            return n;
        } */

    if (prod == null) {
        return (
            <div></div>
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
                    <br></br>
                    <div className="progressbar">
                        <ProgressBar transitionDuration={"0.1s"} customLabel={" "}
                            completed={progress} />
                    </div>


                    <div className="revenu">Rapporte : {prod.revenu * prod.quantite} € </div>
                </div>
                <div className="productlignebas">
                    <div><button className='prix' onClick={() => acheterProduit(prod)} disabled={world.money < prod.cout * Number(qtmulti)}> {prod.cout} € x {qtmulti} </button></div>
                    <div className='temps'>Temps restant : {prod.timeleft}s</div>
                </div>
            </div>
        </div>
        )
    }


}
