import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from '../Api'

export default class Series extends Component {

    constructor(props) {
        super(props)

        this.state = {
            series: [],
            isLoading: false
        }

        this.deleteSerie = this.deleteSerie.bind(this)
        this.renderSeries = this.renderSeries.bind(this)
    }

    loadData = () => {
        this.setState({ isLoading: true })
        api.loadSeriesByGenre(this.props.match.params.genre).then((res) => {
            this.setState({
                isLoading: false,
                series: res.data
            })
        })
    }

    componentDidMount() {
        this.loadData()
    }

    deleteSerie = (id) => {
        api.deleteSeries(id).then(
            res => {
                console.log(res)
                this.loadData()
            }
        )
    }

    renderSeries = (serie) => {
        return (

            <div key={serie.id} className="item  col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {serie.name}</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {serie.genre} / {serie.status}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-success" to={`edit/${serie.id}`}>Editar</Link>
                                <button type="button" className="btn btn-danger" onClick={() => this.deleteSerie(serie.id)} >Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section id="intro" className="intro-section">
                <div className="container">
                    <div className="row">
                        {
                            !this.state.isLoading && this.state.series.length === 0 &&
                            <div className="alert alert-info">Nenhuma serie cadastrada.</div>
                        }
                        <div className="col-lg-12">
                            <h1>Series {this.props.match.params.genre}</h1>
                            {
                                this.state.isLoading &&
                                <span>Aguarde, carregando series ....</span>
                            }

                            <div id="series" className="row list-group">

                                {
                                    !this.state.isLoading &&
                                    this.state.series.map(this.renderSeries)

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}
