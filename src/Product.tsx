import React, { useEffect, useState } from 'react';
import ProgressBar from "./ProgressBar";
import { Services } from "./Services";
import { Product } from "./world";

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({ prod, services }: ProductProps) {
    const [progress, setProgress] = useState(0)
    if (prod == null) {
        return (
            <div>...</div>
        )
    }
    else {
        return (<div className="product">
            <div className="lesdeux">
                <div className="logo" onClick={() => startFabrication()}><img className="round" src={services.server + prod.logo} /></div>
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

    function startFabrication() {
        setProgress(50);
        
    }
    


}