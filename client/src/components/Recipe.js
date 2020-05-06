import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CURR } from '../currency'
import axios from 'axios'


class Recipe extends Component {

    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            showCheckout: false,
            name: '',
            email: '',
            phone: '',
            address: ''
        };
    }
    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }
    handleChangeAddress(event) {
        this.setState({ address: event.target.value });
    }


    handleSubmit(event) {

        axios.post('http://localhost:8000/api/order', {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            order: JSON.stringify(this.props.addedItems)
        })
            .then(res => {
                console.log(res);
                this.setState({ showCheckout: false })
                this.props.addedItems = []
                

            })
        
        event.preventDefault();
    }
    componentWillUnmount() {
        if (this.refs.shipping.checked)
            this.props.substractShipping()
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        }
        else {
            this.props.substractShipping();
        }
    }

    render() {

        return (
            <div className="">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange={this.handleChecked} />
                            <span>Shipping(+{(6 * CURR[this.props.curr].ratio).toFixed(2)} {CURR[this.props.curr].name})</span>
                        </label>
                    </li>
                    <li className="collection-item"><b>Total: {(this.props.total * CURR[this.props.curr].ratio).toFixed(2)} {CURR[this.props.curr].name}</b></li>
                </div>
                <div className="checkout">
                    {!this.state.showCheckout &&
                        <button onClick={() => this.setState({ showCheckout: true })} className="waves-effect waves-light btn">Checkout</button>
                    }
                    {this.state.showCheckout && <div className="col-md-6">
                        <h5>Please enter your data for delivery</h5>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
                            </label>
                            <label>
                                Address:
          <input type="text" value={this.state.address} onChange={this.handleChangeAddress} />
                            </label>
                            <label>
                                Email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
                            </label>
                            <label>
                                Phone:
          <input type="text" value={this.state.phone} onChange={this.handleChangePhone} />
                            </label>
                            <input type="submit" className="waves-effect waves-light btn" value="Send order" />
                        </form>

                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total,
        curr: state.curr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
