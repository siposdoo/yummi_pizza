import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        let a = this.getAllOrders()

        this.state = { //state is by default an object
            items: []
        }
    }

    getAllOrders = () => {
        axios.get('http://localhost:8000/api/orders')
            .then((response) => {
                this.a = response.data;

            });


    }
    renderTableData() {
        return this.state.items.map((item, index) => {
            const { id, name, address, email, phone, order } = item //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{order}</td>
                </tr>
            )
        })
    }
    componentDidMount() {
        fetch('http://localhost:8000/api/orders')
            .then(response => response.json())
            .then(data => this.setState({ items: data }));
    }

    render() {
        return (
            <div>
                <h1 id='title'>You orders</h1>
                <table id='students'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Admin