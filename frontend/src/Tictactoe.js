import React from 'react';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                key={i}
            />
        );
    }
  
    createTable = () => {
        let rows = []
        for(let i=0; i< 3; i++){           
            let columns =[]
            for(let j=0; j<3;j++){
                columns.push(this.renderSquare(j+(i*3)));
            }
            rows.push(<div className="board-row" key={i}>{columns}</div>)
        }
        return rows;
    }

    render() {
        

        return (
        /* Old hardcoded board */
        /*
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        */
        
        <div>
            {this.createTable()}
        </div>
      );
    }
}
  
function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            squaresClicked: [],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const squaresClicked = this.state.squaresClicked.slice(0, this.state.stepNumber);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            squaresClicked: squaresClicked.concat(i),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    calculateRowCol(pos){
        const position = [((pos % 3) + 1) , (Math.floor(pos/3) + 1)];
        return position;
    }

    render() {
        const history = this.state.history;
        const squaresClicked = this.state.squaresClicked;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const position = this.calculateRowCol(squaresClicked[move-1]);
            const desc = move ?
                'Go to move #' + move + ' : ' + position[0] + ',' + position[1] :
                'Go to game start';
            var isCurrentMove = this.state.stepNumber === move;
            if(isCurrentMove){
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)} style={{fontWeight: '700'}} >{desc}</button>
                    </li>
                );
            }
            else{
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        });

        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <div>{this.state.squareClicked}</div>
          </div>
        </div>
      );
    }
}
  
  // ========================================
  
export default Game;