import React from 'react';
import socketIOClient from "socket.io-client";

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
                <h3>
                    You are player {myTeam} <br/>
                    {status}
                </h3>
                <button onClick = {this.props.onResetClick}>reset</button>
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
        this.returnWinningLines = this.returnWinningLines.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
        this.handleResetButton = this.handleResetButton.bind(this);
        this.isWinner = this.isWinner.bind(this);

        this.state = {
            response:false,
            endpoint: "192.168.197.14:4001",
            squares: Array(9).fill(null),
            isXNext: true,
            isWinner: false,
            myTeam: "X",
            lobbyName: "Test",
            lobbyNameConfirmed:"Test",
            socket: null,
        };
    }

    componentDidMount() {
        this.initSocket();
        //const {endpoint} = this.state;
        //const socket = socketIOClient(endpoint);
        //socket.on("roomChanged", function(){console.log("Room was changed")});
    }

    initSocket = () => {
        const {endpoint, squares} = this.state;
        const socket = socketIOClient(endpoint);
        var {winner} = this.state;
        //const room = this.state.lobbyNameConfirmed;

        socket.on('connect', ()=>{
            console.log("Connected");
            socket.emit('joinRoom', this.state.lobbyNameConfirmed);
        })
        socket.on('newSquares', (data) => {
            const winningLines=this.returnWinningLines(data.squares);
            if(winningLines.length > 0){
                this.setState({isWinner: true});
            } 
            this.setState({
                squares: data.squares,
                isXNext: data.isXNext,
            });
        });
        socket.on('someOneJoined', () => {
            const data = {squares: this.state.squares, isXNext: this.state.isXNext};
            socket.emit('startingData', data);
        })

        socket.on('reset', () => {
            this.setState({
                squares: Array(9).fill(null),
                isXNext: true,
                isWinner:false,
            });
        });
        this.setState({socket});
    }

    handleResetButton() {
        const {socket} = this.state;
        socket.emit('reset');
        this.setState({
            squares: Array(9).fill(null),
            isXNext: true,
            isWinner: false,
        });
    }

    isWinner(squares) {
        const winningLines = this.returnWinningLines(squares);
        const isWinner = (winningLines.length > 0);
        return isWinner;
        }

    returnWinningLines(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const winningLines = [];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                winningLines.push(lines[i]);
            }
        }
        return winningLines;
    }

    calculateWinner() {
        let winner = null;
        if(this.state.isWinner){
            winner = this.state.isXNext ? "O" : "X";
        }
        return winner;
    }

    handleSquareClick(i) {
        const {isXNext, myTeam, socket} = this.state;
        const nextPlayer = isXNext ? 'X' : 'O';
        const squares = this.state.squares.slice();
        
        if(this.state.isWinner || squares[i]){
            return; //game is won or square already has a value so do nothing
        }        
        
        squares[i] = nextPlayer;
        this.setState(prevState => ({
            squares: squares,
            isXNext: !prevState.isXNext,
        }));
        const data = {squares: squares, isXNext: isXNext};
        console.log(data);
        socket.emit('newSquares', data);
        const winningLines = this.returnWinningLines(squares);
        if(winningLines.length > 0){
            this.setState({
                isWinner: true,
            });
            return;
        }
    }

    handleLobbyNameChange(lobbyName){
        this.setState({lobbyName});
    }

    handleLobbyNameSubmit(event){
        this.setState({
            lobbyNameConfirmed: this.state.lobbyName,
        }, this.joinRoom);
        event.preventDefault();
    }

    joinRoom(){
        //this.socket.emit("subscribe", { room: "global"});
        const {socket} = this.state;
        const room = this.state.lobbyNameConfirmed;
        socket.emit("joinRoom", room);
        console.log("just emitted subscribe");
    }

    render(){
        let status = null;
        let {myTeam} = this.state;
        if(this.state.isWinner){
            status = this.calculateWinner() + " is the winner!";
        } else if (!this.state.squares.includes(null)) {
            status = "It's a draw!";
        } 
        else {
            status = "It is " + (this.state.isXNext ? "X" : "O") + "'s turn!";
        }
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
                        myTeam={myTeam}
                        onResetClick={this.handleResetButton}
                    />
                </div>
            </div>    
        );
    }
}

export default Tictactoe;