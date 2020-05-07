import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addInit, addToCart } from './actions/cartActions'
import { CURR } from '../currency'



class Home extends Component {


    handleClick = (id) => {
        this.props.addToCart(id);
    }


    render() {

        let itemList = this.props.items.map(item => {

            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img src={require('../images/' + item.imagePath)} alt={item.name} />
                        <span className="card-title">{item.name}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <p>{item.desc.substring(0, 250)} ...</p>
                        <p><b>Price: {(item.price * CURR[this.props.curr].ratio).toFixed(2)} {CURR[this.props.curr].name}</b></p>
                    </div>
                </div>

            )
        })
        return (
            <div className="container">
                {this.props.items.length === 0 &&
                    <h3 className="center">Click on Yummi pizza menu to order</h3>
                }

                <h3 className="center">To change currency click on curr on nav menu</h3>
                <div className="box">
                    {itemList}


                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        curr: state.curr
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        addInit: (items) => { dispatch(addInit(items)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)