var Hello = React.createClass({ 
    render: function() { 
        return (
            <div>
                <h1>Fourth Try</h1>
                <p>Maybe you prefer a hello from Jed</p>
            </div>
            );
    }
}); 

ReactDOM.render(<Hello/>, document.getElementById('react-target'));