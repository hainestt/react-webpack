import React from 'react'
import ReactDOM from 'react-dom'
import tiger from '../../assets/tiger.png'
import './index.scss'

class Home extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            data: [
                {
                    name: 'home'
                },
                {
                    name: 'page'
                }
            ]
        }
    }

    componentDidMount () {

    }

    render () {
        let data = this.state.data.map((item, index) => {
            return (
                <div className="home-box" key={index}>
                    {item.name}
                </div>
            )
        })

        return (
            <div>
                <div className="home-content">
                    {data}
                </div>
                <img src={tiger}/>
            </div>
        )
    }
}

ReactDOM.render (
    <Home/>,
    document.querySelector('#app')
)