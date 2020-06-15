import React, { Component } from 'react'
import { render } from 'react-dom'
import './index.css'

function Squares(props) {
    return (
        <div>
            <button
                className="square"
                onClick={props.onclick}>
                {props.value}
            </button>
        </div>
    )
}

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{ value: Array(9).fill(null) }],
            xIsNext: true,
            renderNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history
        const renderStep = history[this.state.renderNumber]
        const value = renderStep.value.slice()

        if (calculateWinner(value) || value[i]) {
            return
        }

        value[i] = this.state.xIsNext ? 'X' : 'O'
        debugger
        this.setState({
            history: [...history, { value }],
            xIsNext: !this.state.xIsNext,
            renderNumber: this.state.history.length
        })
    }

    renderSquares(i) {
        const history = this.state.history
        const renderStep = history[this.state.renderNumber]
        return (
            < Squares
                value={renderStep.value[i]}
                onclick={() => this.handleClick(i)} />
        )
    }

    showHistory(index) {

        this.setState({
            renderNumber: index,
            xIsNext: index % 2 === 0
        })
    }

    render() {
        let status
        const history = this.state.history
        const renderStep = history[this.state.renderNumber]

        const winner = calculateWinner(renderStep.value)
        if (winner) {
            status = `WINNER:${winner}`
        } else {
            status = `now player:${this.state.xIsNext ? 'X' : 'O'}`
        }

        const moves = history.map((list, index) => (
            <li key={index}>
                {/* 这里只涉及到对history的读取，使用index作为下标 */}
                <button onClick={() => this.showHistory(index)}>
                    跳转至{index ? `第${index}步` : '开始'}
                </button>
            </li>
        ))

        return (
            <div>
                <h1>{status}</h1>
                <div className='board-row'>
                    {this.renderSquares(0)}
                    {this.renderSquares(1)}
                    {this.renderSquares(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquares(3)}
                    {this.renderSquares(4)}
                    {this.renderSquares(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquares(6)}
                    {this.renderSquares(7)}
                    {this.renderSquares(8)}
                </div>
                <section>
                    <ul>
                        {moves}
                    </ul>
                </section>
            </div >
        )
    }
}

class Game extends Component {
    render() {
        return (
            <div>
                <Board />
            </div>
        )
    }
}

render(<Game />, document.getElementById('root'))



function calculateWinner(value) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (var i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (value[a] && value[a] === value[b] && value[a] === value[c]) {
            return value[a]
        }
    }
    return
}

