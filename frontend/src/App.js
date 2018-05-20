import React, { Component } from 'react';

class App extends Component {
  state = {
    menuitems: []
  };

  async componentDidMount(){
    try {
      const res = await fetch('http://192.168.1.159:8000/api/menuitem/');
      const menuitems = await res.json();
      this.setState({
        menuitems
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.menuitems.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.cost}</span>
            <button>+1</button>
          </div>
        ))}
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;