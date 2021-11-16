import React, { Component } from 'react';
import './CartItem.css';

const apiEndpoint = "https://api.jaime.link/cart/";
//const apiEndpoint = `https://api.${process.env.REACT_APP_DOMAIN}/cart`;

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    delete = async () => {
        try {
            // delete from backend
            let url = `${apiEndpoint}${this.props.id}/`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            });

            let data = await response.json();

            // delete from frontend
            this.props.del(this.props.index);
        } catch (err) {
            // TODO error handling
            console.log(err);
        }
    }

    render() {
        return (
            <div className="CartItem">
                <div className="CartItemLeft">
                    <p>{this.props.name}</p>
                </div>

                <div className="CartItemRight">
                    <button type="button" onClick={() => this.delete()}> Delete </button>
                </div>
            </div>
        );
    }
}

export default CartItem;
