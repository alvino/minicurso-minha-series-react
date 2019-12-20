import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Home from './pages/Home'
import Series from './pages/Series'
import EditSeries from './pages/EditSeries'
import NewSeries from './pages/NewSeries'
import About from './pages/About'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/new' component={NewSeries} />
            <Route exact path='/series/:genre' component={Series} />
            <Route exact path='/series/edit/:id' component={EditSeries} />
            <Route exact path='/about' component={About} />
        </Switch>
    </BrowserRouter>
)

export default Routes
