import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Services } from "./Services";
import { Pallier, World, Product } from './world';
import startFabrication from './Product';

type ManaProps = {
    world: World
    services: Services
}

export default function Cashupgrade({ world, services }: ManaProps) {

    function acheterCashupragde(u: Pallier) {
        if (world.money >= u.seuil) {
            world.money = world.money - u.seuil;
            u.unlocked = true;
            if (u.idcible != 0) {
                if (u.typeratio = 'gain') {
                    world.products.product[u.idcible - 1].revenu = world.products.product[u.idcible - 1].revenu * u.ratio;
                }
            }
            if (u.idcible == 0) {
                for (let i = 0; i < world.products.product.length; i++) {
                    if (u.typeratio = 'gain') {
                        world.products.product[i].revenu = world.products.product[i].revenu * u.ratio;
                    }
                }
            }
        }
        else { }

    }

    return (
        < div className="cashupgrade">
            <div>
                <h1 className="title">Cash Upgrades</h1>
            </div>
            <div>
                <div>
                    {world.upgrades.pallier.filter(cashupgrade => !cashupgrade.unlocked).map(cashupgrade => (
                        <div key={cashupgrade.idcible} className="cashupgradegrid">
                            <div className="logoGrid" id="cashupgradeLogo">
                                <img alt="cashupgrade logo" className="round" src={services.server + cashupgrade.logo} />
                            </div>
                            <div className="infosGrid" id="infoscashupgrades">
                                <div className="seuilGrid" id="cashupgradeSeuil"> {cashupgrade.seuil}  </div>
                                <div > {cashupgrade.typeratio} : x {cashupgrade.ratio}</div>
                            </div>
                            <div id="closebutton">
                                <button onClick={() => acheterCashupragde(cashupgrade)} disabled={world.money < cashupgrade.seuil}> Acheter ! </button>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>

    )
}


