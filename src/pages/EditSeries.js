import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from '../Api'

const statuses = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assitir'
}

export default class EditSeries extends Component {

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            series: {
                name: '',
                status: '',
                genre: '',
                comments: ''
            },
            isLoading: false,
            redirect: false
        }

        this.handleSaveSerie = this.handleSaveSerie.bind(this)

    }

    componentDidMount() {
        this.setState({ isLoading: true })

        api.loadSeriesById(this.props.match.params.id).then(
            res => {
                console.log(res)
                this.setState({ series: res.data })
            }

        )

        api.loadGenres().then(
            res => {
                this.setState({
                    isLoading: false,
                    genres: res.data,
                })
            })
    }

    handleSaveSerie() {

        api.editSeries(this.state.series).then(
            res => {
                console.log(res);
                this.setState({ redirect: true })
            })

    }

    handleSeriesOnChange = (e) => {
        const { series } = this.state;
        series[e.target.name] = e.target.value;
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
                                <input type='text' name="name" onChange={this.handleSeriesOnChange} value={this.state.series.name}  className='form-control' /> <br />
                                Status:
                                <select name="status" onChange={this.handleSeriesOnChange} value={this.state.series.status} className='form-control'>
                                    {
                                        Object.keys(statuses).map(
                                            key => <option key={key} value={key}>{statuses[key]}</option>
                                        )
                                    }
                                </select> <br />
                                Genre:
                                <select name="genre" onChange={this.handleSeriesOnChange} value={this.state.series.genre} className='form-control'>
                                    {
                                        this.state.genres.map(
                                            (genre) => <option key={genre} value={genre}>{genre}</option>
                                        )
                                    }
                                </select> <br />
                                Comments:
                                <textarea name="comments" onChange={this.handleSeriesOnChange} value={this.state.series.comments} className='form-control' > </textarea> <br />
                                <button type='button' onClick={this.handleSaveSerie} >Salvar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
