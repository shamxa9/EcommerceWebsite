import React,{useState} from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from 'react-router-dom';
import {useStateValue} from "./StateProvider"

function Header() {
    
    let history=useHistory();
    const [search,setsearch]=useState("");

    const setval=()=>{
        console.log(search);
        localStorage.setItem("vOneLocalStorage", search);
        history.push("/search");
    }
    
    const [{basket}] = useStateValue()
    return (
        <div className='header'>
            <Link to="/">
            <img
                className="header__logo" 
                src='https://www.mabaya.com/wp-content/uploads/2019/10/amazon_PNG25.png' 
            />
            </Link>
            <div className="header__search">
                <input
                className="header__searchInput" type="text"  onChange={(e)=>{ 
                    setsearch(e.target.value);}}/>
                <SearchIcon className="header__searchIcon" onClick={setval}/>
            </div>

            <div className="header__nav">
                <div className='header__option'>
                    <span className='header__optionLineOne'>Sign in</span>
                    <span className='header__optionLineTwo'>Customer</span>
                </div>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Sign in</span>
                    <span className='header__optionLineTwo'>Supplier</span>
                </div>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Sign in</span>
                    <span className='header__optionLineTwo'>Admin</span>
                </div>
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
            </div>
        </div>
    );
}

export default Header
