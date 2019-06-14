import React from 'react';

import { getAll, getById } from './api/phone'
import Basket from './components/Basket'
import Filter from './components/Filter'
import Catalog from './components/Catalog'
import Viewer from './components/Viewer'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: getAll(),
      selectedPhone: null,
      basketItems: [],
    };

    this.addItem = (phoneId) => {
      this.setState((prevState) => {
        return {
          basketItems: [
            ...prevState.basketItems,
            phoneId,
          ],
        };
      });
    };

    this.removeItem = (index) => {
      this.setState(prevState => {
        return {
          basketItems: [
            ...prevState.basketItems.slice(0, index),
            ...prevState.basketItems.slice(index + 1),
          ]
        };
      })
    };

    this.showCatalog = () => {
      this.setState({
        selectedPhone: null,
      });
    };
    this.selectPhone = (phoneId) => {
      this.setState({
        selectedPhone: getById(phoneId),
      });
    };
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Filter />
              <Basket
                items={this.state.basketItems}
                onRemove={this.removeItem}
              />
            </div>

            <div className="col-md-10">
              { this.state.selectedPhone ? (
                <Viewer
                  phone={this.state.selectedPhone}
                  onBack={this.showCatalog}
                />
              ) : (
                <Catalog
                  phones={this.state.phones}
                  onPhoneSelected={this.selectPhone}
                  onAdd={this.addItem}
                />
              ) }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
