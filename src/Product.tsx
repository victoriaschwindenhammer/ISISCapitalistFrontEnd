import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from "./ProgressBar";
import { Services } from "./Services";
import { Product, World } from "./world";

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void;
    services: Services
    world : World;
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

    function startFabrication(p:Product) {
        if (p.quantite>0){
        prod.timeleft = prod.vitesse;
        lastupdate=Date.now();
        setProgress(0);
        }
        else {}

    }
    function calcScore() {
        if (prod == null) { }
        else {
            if (prod.timeleft == 0) {
             }
            if(prod.timeleft == 0 && prod.managerUnlocked==true ) {
                startFabrication(prod);
            }
            if (prod.timeleft != 0){
                let now=Date.now();
                let elapsetime=now - lastupdate;
                prod.timeleft = prod.timeleft-elapsetime;
                lastupdate=now;
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

    

    function acheterProduit(p:Product){
        if (world.money >= p.cout) {
            let cout = p.cout;
            world.money =world.money - cout;
            p.quantite = p.quantite + 1;
            p.cout = cout * p.croissance;
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
                    <div className="revenu">Rapporte : {prod.revenu*prod.quantite} € </div>
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
