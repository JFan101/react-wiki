import React, { Component }  from 'react';
import { Link } from "react-router-dom";

import classes from './MainNavigation.module.css';

function MainNavigation(){
    return( 
        <header className={classes.header}>
            <div className={classes.logo}><Link to="/">ikipediaway</Link></div>
            <nav>
                <ul>
                    <li>
                        <Link to="/JavaScript">JavaScript</Link>
                    </li>
                </ul>
            </nav>

        </header>
    );
}
export default MainNavigation;