import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from "./ProgressBar";
import { Services } from "./Services";
import { Product } from "./world";

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services }: ProductProps) {
    const [progress, setProgress] = useState(0)
    const [lastupdate, setLastupdate] = useState(Date.now())
    //var lastupdate = Date.now();

    const savedCallback = useRef(calcScore)
    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])


    function startFabrication(p: Product) {
        p.timeleft = p.vitesse
        //setProgress(50);

    }
    function calcScore() {
        if (prod.timeleft = 0) { }
        else {
            prod.timeleft = ((Date.now()) - lastupdate) - prod.timeleft;

            if (prod.timeleft <= 0) {
                if (prod.timeleft < 0) {
                    prod.timeleft = 0;
                }
                else {
                    // code de rajout de l'argent
                    setProgress(0)
                }
            }
            else {
                setProgress(((prod.vitesse - prod.timeleft) / prod.timeleft) * 100);

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
                <div className="logo" onClick={() => startFabrication(prod)}><img className="round" src={services.server + prod.logo} /></div>
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