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
            /*   每个子组件的状态都不同，使用数组来保存,  且需要为子组件添加各自的标识
                       1 子传父   子触发父通过props传来的函数，传递参数
                       2 父在渲染子时对其进行标识   调用另定义的函数来渲染子组件  
                                                                            1 使用标识来匹配状态数组            value
                                                                            2 并给传递的函数添加了标识作为参数()   onclick
                                                                                                                    */
            value: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i) {
        const value = this.state.value.slice()

        /*不要直接修改原数据（!this.state.xIsNext同理）     注意下面修改value时(value[i]) 与this.state.value没有关联
                        1.简化复杂的功能
                        2.跟踪数据的改变
                        3.确定在Reac 中何时重新渲染  构建pure components
                                                                                            */
        //两种情况下阻止点击响应   1、一方获胜后 再点击时   2、位置已落子 再次落子
        if (calculateWinner(this.state.value) || value[i]) {
            return
        }
        value[i] = this.state.xIsNext ? 'x' : 'o'
        this.setState({
            value,
            xIsNext: !this.state.xIsNext
        })

        // calculateWinner(this.state.value)    注意此时拿不到setstate后的值
    }

    renderSquares(i) {
        return (
            < Squares
                value={this.state.value[i]}
                onclick={() => this.handleClick(i)} />           //调用之前便传递了参数   参考bind
        )
    }

    render() {
        // render函数中可以确定this.setstate已执行完毕，此时可以得到setstate后的数据,在渲染DOM之前
        let status
        const winner = calculateWinner(this.state.value)
        if (winner) {
            status = `WINNER:${winner}`
        } else {
            status = `now player:${this.state.xIsNext ? 'X' : 'O'}`
        }
        // debugger
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


// 定义判断胜者的函数   在状态变化后将数组传递进函数进行判断

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
    // 思路：将所有获胜条件和状态数组进行比对，满足其一
    for (var i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (value[a] && value[a] === value[b] && value[a] === value[c]) {
            return value[a]
        }
    }
    return
}

