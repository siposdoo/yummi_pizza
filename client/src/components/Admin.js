import React, { Component } from 'react';

class Admin extends Component {
    constructor(props) {
        super(props) 
        this.state = { 
            items: []
        }
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
                <h1 className="center" id='title'>You orders</h1>
                <table id='orders'>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Admin