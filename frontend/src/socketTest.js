import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class FlorenceTemperature extends Component {
    constructor() {
        super();
        this.state = {
            response:false,
            endpoint: "http://127.0.0.1:4001"
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        
    }

    render() {
        const {response} = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {response ?
                    <p>
                        The temperature in Florence is: {response} °F
                    </p>
                    :
                    <p>Loading...</p>
                }
            </div>
        );
    }
}

export default FlorenceTemperature;