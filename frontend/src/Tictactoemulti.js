import React from 'react';

class Square extends React.Component {
    render() {
        return(
            <button className = "square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare = (i) => {
        return (
            <Square 
                value = {this.props.squares[i]}
                key={i}
                onClick = {() => this.props.onClick(i)}
            />
        )
    }
    
    createTable = () => {
        let rows = [];
        for(let i=0; i < 3; i++){
            let columns = []
            for(let j=0; j<3; j++){
                columns.push(this.renderSquare(j+(i*3)));
            }
            rows.push(
                <div
                  className="board-row"
                  key={i}>
                    {columns}
                </div>)
        }
        return rows;
    }

    render() {
        return(
            <div>
                {this.createTable()}
            </div>
        );
    }
}

class LobbySelector extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onLobbyNameChange(e.target.value);
    }

    render() {
        const lobbyName = this.props.lobbyName;
        const lobbyNameConfirmed = this.props.lobbyNameConfirmed;
        return (
            <div>
                <form onSubmit={this.props.onLobbyNameSubmit}>
                    <label>
                    Enter lobby name <br/>
                        <input
                            value={lobbyName}
                            onChange={this.handleChange}
                            />
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    Your current lobby is {lobbyNameConfirmed}.
                </div>
            </div>
        )
    }
}

class GameInfo extends React.Component {
    render() {
        const {status, myTeam} = this.props;
        return(
            <div>
                {status}
            </div>
        );
    }
}

class Tictactoe extends React.Component {
    constructor(props){
        super(props);
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.handleLobbyNameChange = this.handleLobbyNameChange.bind(this);
        this.handleLobbyNameSubmit = this.handleLobbyNameSubmit.bind(this);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true,
            lobbyName: "Test",
            lobbyNameConfirmed:"Test",
        };
    }

    handleSquareClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState(prevState => ({
            squares: squares,
            isXNext: !prevState.isXNext,
        }));
    }

    handleLobbyNameChange(lobbyName){
        this.setState({lobbyName});
    }

    handleLobbyNameSubmit(event){
        alert("You submitted: " + this.state.lobbyName);
        this.setState(prevState => ({
            lobbyNameConfirmed: this.state.lobbyName,
        }));
        event.preventDefault();
    }

    render(){
        const status = "Your turn: " + (this.state.isXNext ? "X" : "O");
        const {squares, lobbyName, lobbyNameConfirmed} = this.state;
        return(
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {squares}
                        onClick = {this.handleSquareClick}
                    />
                </div>
                <div className="game-info">
                    <LobbySelector 
                        lobbyName={lobbyName}
                        lobbyNameConfirmed={lobbyNameConfirmed}
                        onLobbyNameChange={this.handleLobbyNameChange}
                        onLobbyNameSubmit={this.handleLobbyNameSubmit}
                    />
                    <GameInfo
                        status={status}
                    />
                </div>
            </div>    
        );
    }
}

export default Tictactoe;