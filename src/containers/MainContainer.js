import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    filter: "",
    sort: "",
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then((res) => res.json())
      .then((stocks) => {
        this.setState({
          stocks: stocks,
        });
      });
  }

  addStock = (stock) => {
    if (!this.state.portfolio.includes(stock)) {
      this.setState({
        portfolio: [...this.state.portfolio, stock],
      });
    }
  };

  removeStock = (stock) => {
    this.setState({
      portfolio: this.state.portfolio.filter((pStock) => pStock !== stock),
    });
  };

  filterBy = (selection) => {
    this.setState({
      filter: selection,
    });
  };

  sortBy = (selection) => {
    this.setState({
      sort: selection,
    });
  };

  renderStocks = () => {
    let filteredStocks = [...this.state.stocks];
    if (this.state.filter !== "") {
      filteredStocks = filteredStocks.filter(
        (stock) => stock.type === this.state.filter
      );
    }

    switch (this.state.sort) {
      case "Alphabetically":
        return filteredStocks.sort((a, b) => (a.name > b.name ? 1 : -1));
      case "Price":
        return filteredStocks.sort((a, b) => (a.price > b.price ? 1 : -1));
      default:
        return filteredStocks;
    }
  };

  render() {
    const portfolioStocks = this.state.portfolio.map((id) =>
      this.state.stocks.find((stock) => stock.id === id)
    );
    return (
      <div>
        <SearchBar
          filter={this.state.filter}
          sort={this.state.sort}
          filterBy={this.filterBy}
          sortBy={this.sortBy}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.renderStocks()}
              addStock={this.addStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              myStocks={portfolioStocks}
              removeStock={this.removeStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
