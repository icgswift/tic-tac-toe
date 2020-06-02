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
            xIsNext: true,
            /* 为正被渲染的数组添加标识，改变标识即可改变渲染的结果,  
                       因为想改变渲染结果必须通过render()函数，而调用render()函数的前提是setstate 
                       该标识的作用相当于是一个指针，指引render渲染history中的哪一个数组
                                                                                                       */
            renderNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history

        // 在renderNumber指针指向的数组基础上添加数据
        const current = history[this.state.renderNumber]

        const value = current.value.slice()
        if (calculateWinner(value) || value[i]) {
            return
        }
        value[i] = this.state.xIsNext ? 'x' : 'o'
        this.setState({
            history: [...history, { value }],
            xIsNext: !this.state.xIsNext,
            renderNumber: this.state.renderNumber + 1
        })
    }

    renderSquares(i) {
        // 渲染renderNumber指针指向的数组
        const history = this.state.history
        const current = history[this.state.renderNumber]
        return (
            < Squares
                value={current.value[i]}
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
        // 对renderNumber指针指向的数组（已响应点击）进行计算
        const history = this.state.history
        const current = history[this.state.renderNumber]
        let status

        const winner = calculateWinner(current.value)
        if (winner) {
            status = `WINNER:${winner}`
        } else {
            status = `now player:${this.state.xIsNext ? 'X' : 'O'}`
        }

        /* map函数使用callback对数组中每一个元素进行加工，callback返回加工后的元素 这里返回 li */
        const moves = history.map((list, index) => (

            <li key={index}>
                <button onClick={() => this.showHistory(index)}>
                    {/* 数字0表示false */}
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

