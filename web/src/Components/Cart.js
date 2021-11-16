import React, { Component } from 'react';
import CartItem from './CartItem';
import './Cart.css';

const apiEndpoint = "https://api.jaime.link/cart";
//const apiEndpoint = `https://api.${process.env.REACT_APP_DOMAIN}/cart`;

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            error: "",
            userInput: "",
        };
    }

    fetchCart = async (endpoint) => {
        let response = await fetch(endpoint);
        let data = await response.json();
        return data
    }

    updateUserInput = (evt) => {
        this.setState({userInput: evt.target.value});
    }

    // TODO document
    // takes user input and adds to shopping cart
    addItem = async () => {
        let cart = this.state.cart;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === this.state.userInput) {
                // increment quanity TODO
                this.setState({cart: cart, userInput: ""});
                return;
            }
        }

        // add to cart
        let item = await this.addToCart(this.state.userInput, 1); // TODO quantity
        if (item === null) {this.setState({userInput: ""}); return;}
        cart.push(item);


        this.setState({cart: cart, userInput: ""});
        return;
    }

    // add to cart BACKEND only
    addToCart = async (name, quantity) => {
        try {
            let url = `${apiEndpoint}/add`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({"name": name, "quantity": quantity}),
            });

            const responseCode = response.status;
            if (responseCode !== 200) {
                // TODO error adding to cart
                return;
            }
            let data = await response.json();

            let res = await fetch(`${apiEndpoint}/${data.id}`);
            let item = await res.json();
            return item
        } catch (err) {
            // TODO error handling
        }

    }


    // gets called from CartItem when they deleted // TODO documentation
    delete = (index) => {
        let cart = this.state.cart;
        cart.splice(index, 1);
        this.setState({cart: cart});
    }

    async componentDidMount() {
        try {
            let data = await this.fetchCart(apiEndpoint);
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

        let cart = this.state.cart.map((item, index) => {
            return <CartItem
                id={item._id}
                name={item.name}
                key={index}
                index={index}
                del={this.delete}
            />
        });

        return (
            <div className="Cart">
                <h1> Shopping Cart </h1>
                    <input
                        value={this.state.userInput}
                        onChange={(evt) => this.updateUserInput(evt)}
                        onKeyPress={
                            (evt) => {
                                if (evt.key === 'Enter') {
                                    this.addItem();
                                }
                            }
                        }
                    />
                    <button
                        type="button"
                        onClick={() => this.addItem()}
                    > Add </button>

                {cart}
            </div>
        );

    }
}

export default Cart;
