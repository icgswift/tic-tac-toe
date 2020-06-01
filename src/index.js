import React, { Component } from 'react'
import { render } from 'react-dom'
import './index.css'

class Squares extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null,
            xIsNext: true
        }
    }
    render() {
        return (
            <div>
                <button
                    className="square"
                    // 只能修改子组件自身的状态 影响不到其他子组件的状态
                    onClick={() => this.setState({ value: this.state.xIsNext ? 'x' : 'o', xIsNext: !this.state.xIsNext })}>
                    {this.state.value}
                </button>
            </div>
        )
    }
}

//状态提升 将子组件的state交给父组件管理
//第一次状态提升：子组件中只能管理各自状态，这里子组件之间的状态互相影响
class Board extends Component {

    render() {
        return (
            <div>
                <div className='board-row'>
                    <Squares value={0} />
                    <Squares value={1} />
                    <Squares value={2} />
                </div>
                <div className='board-row'>
                    <Squares value={3} />
                    <Squares value={4} />
                    <Squares value={5} />
                </div>
                <div className='board-row'>
                    <Squares value={6} />
                    <Squares value={7} />
                    <Squares value={8} />
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



