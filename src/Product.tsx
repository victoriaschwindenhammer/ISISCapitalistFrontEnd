import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from "./ProgressBar";
import { Services } from "./Services";
import { Product } from "./world";

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void;
    services: Services
}


export default function ProductComponent({ prod, onProductionDone, services }: ProductProps) {
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

    function startFabrication() {
        prod.timeleft = prod.vitesse;
        lastupdate=Date.now();
        setProgress(0);

    }
    function calcScore() {
        if (prod == null) { }
        else {
            if (prod.timeleft == 0) { }
            else {
                let now=Date.now();
                let elapsetime=now - lastupdate;
                prod.timeleft = prod.timeleft-elapsetime;
                lastupdate=now;
                if (prod.timeleft <= 0) {
                    prod.timeleft = 0; 
                        // code de rajout de l'argent
                        setProgress(0);
                        onProductionDone(prod);
                }
                else {
                    setProgress(((prod.vitesse - prod.timeleft) / prod.timeleft) * 100);

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
                <div className="logo" onClick={() => startFabrication()} ><img className="round" src={services.server + prod.logo} /></div>
                <div className="quantite">{prod.quantite}</div>
            </div>

            <div className="productcolonnedroite">
                <div className="lesdeux">
                    <div className="progressbar">
                        <ProgressBar transitionDuration={"0.1s"} customLabel={" "}
                            completed={progress} />
                    </div>
                    <div className="revenu">Rapporte : {prod.revenu} $</div>
                </div>
                <div className="productlignebas">
                    <div>Acheter pour : {prod.cout} $</div>
                    <div>Temps restant : {prod.timeleft}s</div>
                </div>
            </div>
        </div>
        )
    }


}
