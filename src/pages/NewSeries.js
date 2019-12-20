import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assitir'
}

export default class NewSeries extends Component {

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            series: {
                name: '',
                status: 'watched',
                genre: '',
                comments: ''
            },
            isLoading: false,
            redirect: false
        }

    }

    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadGenres().then((res) => {
            this.setState({
                isLoading: false,
                genres: res.data,
                series: {
                    ...this.state.series,
                    genre: res.data[0],
                }
            })
        })
    }

    handleSaveSerie = (e) => {

        api.newSeries(this.state.series).then(
            res => {
                this.setState({ redirect: true })
            })

    }

    onChange(field, e) {
        const { series } = this.state;
        series[field] = e.target.value;
        this.setState({ series });

        console.log(this.state.series);
    }

    renderRedirect = () => {
        if (this.state.redirect) return <Redirect to={`/series/${this.state.series.genre}`} />
    }

    render() {
        return (
            <section id="intro" className="intro-section">
                {
                    this.renderRedirect()
                }
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Novas Series</h1>
                            <form>
                                Name:
                                <input type='text' onChange={this.onChange.bind(this, 'name')} value={this.state.series.name}  className='form-control' /> <br />
                                Status:
                                <select onChange={this.onChange.bind(this, 'status')} value={this.state.series.status} className='form-control'>
                                    {
                                        Object.keys(statuses).map(
                                            key => <option key={key} value={key}>{statuses[key]}</option>
                                        )
                                    }
                                </select> <br />
                                Genre:
                                <select onChange={this.onChange.bind(this, 'genre')} value={this.state.genre} className='form-control'>
                                    {
                                        this.state.genres.map(
                                            (genre) => <option key={genre} value={genre}>{genre}</option>
                                        )
                                    }
                                </select> <br />
                                Comments:
                                <textarea onChange={this.onChange.bind(this, 'comments')} value={this.state.series.comments} className='form-control' > </textarea> <br />
                                <button type='button' onClick={this.handleSaveSerie} >Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
