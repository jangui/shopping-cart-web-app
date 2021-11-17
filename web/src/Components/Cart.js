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

    /*
     * Fetch all items in cart from database
     * @param {String} endpoint The API endpoint for GET'ing cart items
     * @return {Array}          An array of JSON objects in cart
     */
    fetchCart = async (endpoint) => {
        let response = await fetch(endpoint);
        let data = await response.json();
        return data
    }

    /*
     * Event Handler for user's text input. Updates state with user input.
     */
    updateUserInput = (evt) => {
        this.setState({userInput: evt.target.value});
    }

    /*
     * Adds user's input to cart.
     * User input is stored and updated by another method.
     * This function should be called when user submits their input.
     */
    addItem = async () => {
        let cart = this.state.cart;
        let itemName = this.state.userInput;

        /* TODO
        // if item already in cart, simply update its quantity
        if (cart.filter(item => item.name === itemName)) {
            console.log(itemName);
            // update quantity frontend TODO
            // update quantity backend TODO
            return;
        }
        */

        // add to backend
        let quantity = 1; // TODO handle quantity as another user input
        let res = await this.addToCart(itemName, quantity);
        if ('error' in res) {
            this.setState({error: res.error.msg});
            console.log(res.error.msg);
            return;

        }

        // add to frontend
        let item = {"name": itemName, "quantity": quantity, "_id": res.id};
        cart.push(item);
        this.setState({cart: cart, userInput: ""});
        return;
    }

    /*
     * Add item to Cart on the backend
     * @param  {String} name     The name of the item
     * @param  {Number} quanity  The quanitity of the item
     * @return {JSON}            JSON response from API
     */
    addToCart = async (name, quantity) => {
        let response;
        try {
            let url = `${apiEndpoint}/add`;
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({"name": name, "quantity": quantity}),
            });
            let data = await response.json();
            console.log(data);
            return data;

        } catch (err) {
            console.log(`Error: ${err.msg}`);
            response = new Response();
            return response.status(400).json({error: err});
        }
    }


    /*
     * Deletes item from frontend.
     * This function is only called from child components.
     * The CartItem child componenets will handle deletion for the backend.
     * @param {Number} index The index of the item to be deleted from the frontend
     */
    delItem = (index) => {
        let cart = this.state.cart;
        cart.splice(index, 1);
        this.setState({cart: cart});
    }

    /*
     * Does work when component mounts.
     * Currently fetches cart from api and stores it in state.
     */
    async componentDidMount() {
        try {
            let data = await this.fetchCart(apiEndpoint);
            this.setState( { cart: data });
        } catch (err) {
            this.setState( { error: err });
            console.log(err);
        }
    }

    /*
     * Renders Component
     */
    render() {
        // if error, display
        if (this.state.error !== "") {
            return ( <p> {this.state.error} </p> ); // TODO better frontend error handling
        }

        // map cart data into CartItem components
        let cart = this.state.cart.map((item, index) => {
            return <CartItem
                id={item._id}
                name={item.name}
                key={index}
                index={index}
                del={this.delItem}
            />
        });

        return (
            <div className="Cart">
                <h1> Shopping Cart </h1>

                {/* user input */}
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

                {/* button to submit user input */}
                <button
                    type="button"
                    onClick={() => this.addItem()}
                > Add </button>

                {/* contents of cart */}
                {cart}

            </div>
        );

    }
}

export default Cart;
