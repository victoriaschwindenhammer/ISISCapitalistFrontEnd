
import { Services } from "./Services";
import { Product } from "./world";

type ProductProps = {
    prod: Product
    services: Services
}
export default function ProductComponent({prod, services }: ProductProps) {
        if (prod==null) {return (
            <div>...</div>
        )}
        else { return (<div className="Product">
        <div><img src={services.server +prod.logo}/></div>
        <div>{prod.name}</div>
        <div>Acheter pour : {prod.cout} $</div>
        <div>Rapporte : {prod.revenu} $</div>
        <div>Temps restant : {prod.timeleft}s</div>
        </div>
        )
    }
    

}