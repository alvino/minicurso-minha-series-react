import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';


import Home from './pages/Home'
import Series from './pages/Series'
import EditSeries from './pages/EditSeries'
import NewSeries from './pages/NewSeries'
import About from './pages/About'

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                        <div className="container">
                            <div className="navbar-header page-scroll">
                                <a className="navbar-brand page-scroll" href="#page-top">
                                    <img src="/images/logo.png" height="30" />
                                </a>
                            </div>

                            <div className="collapse navbar-collapse navbar-ex1-collapse">
                                <ul className="nav navbar-nav">
                                    <li> <Link to='/'>Home</Link> </li>
                                    <li> <Link to='/new'>Nova Série</Link> </li>
                                    <li> <Link to='/about'>About</Link> </li>
                                </ul>
                            </div>

                        </div>
                    </nav>

                    <Route exact path='/' component={Home} />
                    <Route exact path='/new' component={NewSeries} />
                    <Route exact path='/series/:genre' component={Series} />
                    <Route exact path='/series/edit/:id' component={EditSeries} />
                    <Route exact path='/about' component={About} />

                </div>
            </BrowserRouter>
        )
    }
}

export default App;
