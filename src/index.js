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
        const value = this.state.value.slice()    //不要修改原数据
        if (value[i]) {
            return
        }
        value[i] = this.state.xIsNext ? 'x' : 'o'
        this.setState({
            value,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquares(i) {
        return (
            < Squares
                value={this.state.value[i]}
                onclick={() => this.handleClick(i)} />           //调用之前便传递了参数   参考bind
        )
    }

    render() {
        let status = `now player:${this.state.xIsNext ? 'X' : 'O'}`
        return (
            <div>
                <h1>{status}</h1>
                <div className='board-row'>
                    {/* <Squares value={this.state.value} onclick={() => this.handleClick()} /> */}
                    {/* <Squares value={this.state.value} onclick={() => this.handleClick()} /> */}
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



