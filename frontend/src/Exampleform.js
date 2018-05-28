import React from 'react';

class ExampleForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            agreed: true,
            value: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.state.agreed ?
            alert('An essay was submitted: ' + this.state.essay)
            : alert('Please agree to sell your soul') 
        event.preventDefault();
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                    I agree to sell my soul <br/>
                        <input
                            name="agreed"
                            type="checkbox"
                            checked={this.state.agreed}
                            onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <label>
                        Essay:<br/>
                        <textarea name="essay" value={this.state.essay} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
        );
    }
}

export default ExampleForm