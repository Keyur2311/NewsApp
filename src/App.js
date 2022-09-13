import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={6} country="in" category="general" />}></Route>
            <Route exact path="/business" element={<News key="business" pageSize={6} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News key="general1" pageSize={6} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News key="health" pageSize={6} country="in" category="health" />}></Route>
            <Route exact path="/science" element={<News key="science" pageSize={6} country="in" category="science" />}></Route>
            <Route exact path="/sport" element={<News key="sport" pageSize={6} country="in" category="sport" />}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}

