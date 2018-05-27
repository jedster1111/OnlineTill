import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            show: false,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const show = this.state.show;
        let text = null;
        text = show && (
            <div>
                <h3>test</h3>
            </div>
            );
        


        return (
            <div>
                <h1>This is a clock</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
                <h3>{text}</h3>
            </div>
        );
    }
}

export default Clock;