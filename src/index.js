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
            // 新建一个数组用于添加历史记录
            history: [{ value: Array(9).fill(null) }],
            xIsNext: true
        }
    }

    handleClick(i) {
        // 获取数组中最近添加的一组对象
        const history = this.state.history
        const current = history[history.length - 1]
        // 新建一个副本，修改该副本
        const value = current.value.slice()
        // 判断是否修改
        if (calculateWinner(value) || value[i]) {
            return
        }
        value[i] = this.state.xIsNext ? 'x' : 'o'
        this.setState({
            history: [...history, { value }],             //history.concat({value})
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquares(i) {
        // 读取最近一组对象的值
        const history = this.state.history
        const current = history[history.length - 1]
        return (
            < Squares
                value={current.value[i]}
                onclick={() => this.handleClick(i)} />
        )
    }

    render() {
        // 读取最近一组对象（点击之后）的值并计算
        const history = this.state.history
        const current = history[history.length - 1]
        let status
        const winner = calculateWinner(current.value)
        if (winner) {
            status = `WINNER:${winner}`
        } else {
            status = `now player:${this.state.xIsNext ? 'X' : 'O'}`
        }
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

