import React, { Component } from "react";
import "./index.css";

class MovieList extends Component {
  state = {
    year: "",
    movieListObj: [],
    movieListMsg: false
  };

  handleInput = event => {
    this.setState({ year: event.target.value });
  };

  getMovieList = () => {
    // alert("test call")
    const { year } = this.state;
    this.setState({ movieListObj: [] });
    if (year !== "" && year !== undefined && year.length === 4) {
      fetch('https://jsonmock.hackerrank.com/api/movies?Year=' + year)
        .then(res => res.json())
        .then((response) => {
          if (response.data.length > 0) {
            this.setState({ movieListObj: response.data, movieListMsg: true })
          }
        })
        .catch("error")
    } else {
      alert("please enter a valid year")
    }

  }

  render() {
    const { year, movieListObj, movieListMsg } = this.state;
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="number" id="" className="large" placeholder="Enter Year eg 2015" value={year} onChange={this.handleInput} data-testid="app-input" />
          <button className="" data-testid="submit-button" onClick={this.getMovieList}>Search</button>
        </section>

        <div className="mt-50 slide-up-fade-in">
          {movieListObj.length > 0 ? movieListObj.map((data) => (
            <div className="user" data-testid="movieList">
              <ul className="mt-50 styled" data-testid="movieLists">
                <li className="slide-up-fade-in py-10">{data.Title}</li>
              </ul>
            </div>
          )) : movieListObj.length === 0 && movieListMsg ? <div data-testid="no-result">No Results Found</div> : null}

        </div>
      </div>
    );
  }
}

export default MovieList