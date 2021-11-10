import React, { Component } from 'react';
import CartItem from './CartItem';

const fetchCart = async (endpoint) => {
    let response = await fetch(endpoint);
    let data = await response.json();
    return data
}

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            error: "",
        };
    }

    async componentDidMount() {
        let apiEndpoint = "https://api.jaime.link/cart";
        try {
            let data = await fetchCart(apiEndpoint);
            this.setState( { cart: data });
        } catch (err) {
            this.setState( { error: err });
           console.log(err);
        }
    }

    render() {
        // display error
        if (this.state.error !== "") {
            return ( <p> {this.state.error} </p> );
        }

        let cart = this.state.cart.map((item) => {
            return <CartItem
                id={item._id}
                name={item.name}
            />
        });

        return (
            <>{cart}</>
        );

    }
}

export default Cart;
