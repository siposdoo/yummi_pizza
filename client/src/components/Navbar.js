import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CURR } from '../currency'
import { changeCurrency } from './actions/cartActions'


const Navbar = (props) => {
    const handleCurrencyChange = id => {
        props.changeCurrency();
    };

    return (

        <nav className="nav-wrapper blue">
            <div className="container">
                <Link to="/" className="brand-logo">YUMMI PIZZA</Link>

                <ul className="right">
                    <li><Link to="/">Yummi Pizza Menu</Link></li>

                    <li><Link to="/cart">{props.total > 0 && <span style={myBadge} className="badge">{(props.total * CURR[props.curr].ratio).toFixed(2)} {CURR[props.curr].name}</span>} <i className="material-icons">shopping_cart</i></Link></li>


                    <li onClick={() => { handleCurrencyChange() }}>Curr: {CURR[props.curr].name}</li>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </div>
        </nav>


    )
}
const myBadge = {

    position: 'absolute',
    top: '5px',
    marginLeft: '10px',
    backgroundColor: 'springgreen',
    borderRadius: '25px'
}

const mapStateToProps = (state) => {
    return {
        total: state.total,
        curr: state.curr,
        addedItems: state.addedItems.length
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        changeCurrency: () => { dispatch(changeCurrency()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);