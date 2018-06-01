import React from 'react';

class Square extends React.Component {
    render() {
        return(
            <button className = "square">
                X
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare = (i) => {
        return (
            <Square 
                key={i}
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

class Tictactoe extends React.Component {
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>    
        );
    }
}

export default Tictactoe;