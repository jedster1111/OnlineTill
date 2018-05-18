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
            )
        );
    }
});

ReactDOM.render(React.createElement(Hello, null), document.getElementById('react-target'));