import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from '../Api'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres().then((res) => {
            this.setState({
                isLoading: false,
                genres: res.data
            })
        })
    }

    renderGenreLink(genre, key) {
        return (
            <span key={key}>&nbsp;<Link to={`/series/${genre}`} >{genre}</Link>&nbsp;</span>
        )
    }

    render() {
        return (
            <div>
                <section id="intro" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1><img src="images/logo.png" /></h1>
                                <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="intro" className="intro-section">
                    {
                        this.state.isLoading &&
                        <span>Aguarde, carregando genêros ....</span>
                    }
                    {
                        !this.state.isLoading &&
                        <div>
                            Ver séries do genêro:
              {this.state.genres.map( (genre, key) => this.renderGenreLink(genre, key) )}
                        </div>
                    }
                </section>
            </div>
        )
    }
}
