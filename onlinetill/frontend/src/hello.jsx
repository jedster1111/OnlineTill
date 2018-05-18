var Hello = React.createClass({ 
    render: function() { 
        return (
            <div>
                <h1>Fourth Try</h1>
                <p>Maybe you prefer a hello from Jed</p>
                <p>This page uses a compiled js file served statically, so runs faster than jsx page.</p>
                <p>babel --presets es2015,react --watch src/ --out-dir static/frontend/lib/</p>
            </div>
            );
    }
}); 

ReactDOM.render(<Hello/>, document.getElementById('react-target'));