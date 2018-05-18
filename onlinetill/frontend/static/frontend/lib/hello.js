'use strict';

var Hello = React.createClass({
    displayName: 'Hello',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Fourth Try'
            ),
            React.createElement(
                'p',
                null,
                'Maybe you prefer a hello from Jed'
            ),
            React.createElement(
                'p',
                null,
                'This page uses a compiled js file served statically, so runs faster than jsx page.'
            ),
            React.createElement(
                'p',
                null,
                'babel --presets es2015,react --watch src/ --out-dir static/frontend/lib/'
            )
        );
    }
});

ReactDOM.render(React.createElement(Hello, null), document.getElementById('react-target'));