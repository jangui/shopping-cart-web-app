import React, { Component } from 'react';
import './CartItem.css';

const apiEndpoint = "https://api.jaime.link/cart/";
//const apiEndpoint = `https://api.${process.env.REACT_APP_DOMAIN}/cart`;

class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: "",
        };
    }

    /*
     * Deletes this item from backend & frontend
     * Calls parent function for deletion from frontend
     */
    delItem = async () => {
        // delete fron backend
        let res = this.delItemBackend();
        if ('error' in res) {
            this.setState({error: res['error']});
            console.log(`Error: ${res['error']}`)
            return;
        }

        // delete from frontend
        this.props.del(this.props.index);
    }

    /*
     * Deletes this item from backend
     * @return {JSON} The json response from the API
     *                Only error the response will contain an 'error' field
     */
    delItemBackend = async () => {
        let response;
        try {
            let url = `${apiEndpoint}${this.props.id}/`;
            response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            let data = await response.json();
            return data;
        } catch (err) {
            response = new Response();
            return response.json({error: err});
        }
    }

    render() {
        // TODO if error render popup error
        return (
            <div className="CartItem">
                <div className="CartItemLeft">
                    <p>{this.props.name}</p>
                </div>

                <div className="CartItemRight">
                    <button type="button" onClick={() => this.delItem()}> Delete </button>
                </div>
            </div>
        );
    }
}

export default CartItem;
