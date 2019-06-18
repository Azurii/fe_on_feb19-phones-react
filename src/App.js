import  React from 'react';

import { getAll, getById } from './api/phone'
import Basket from './components/Basket'
import Filter from './components/Filter'
import Catalog from './components/Catalog'
import Viewer from './components/Viewer'

import './App.css';



let basket = {
  'samsund-galaxy': 5,
  'motorola-xoom': 2,
};

function addItem(phoneId) {
  this.setState(prevState => {
    const copy = { ...prevState.basket };
    const count = copy[phoneId] || 0;
    copy[phoneId] = count + 1;

    return { basket: copy };
  })
}

function removeItem(phoneId) {
  this.setState(prevState => {
    const copy = { ...prevState.basket };
    const count = copy[phoneId] || 0;

    if (count > 1) {
      copy[phoneId] = count - 1;
    } else {
      delete copy[phoneId];
    }

    return { basket: copy };
  })
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phones: getAll(),
      selectedPhone: null,
      basketItems: {
        samsung: 3,
        motorola: 1
      },
    };

    this.addItem = (phoneId) => {
      this.setState(prevState => {
        const quantity = prevState.basketItems[phoneId] || 0;
        const copy = { ...prevState.basketItems };
        copy[phoneId] = quantity + 1;

        return { basketItems: copy };
      })
    };

    this.removeItem = (phoneId) => {
      this.setState(prevState => {
        const copy = { ...prevState.basketItems };
        const count = copy[phoneId] || 0;

        if (count > 1) {
          copy[phoneId] = count - 1;
        } else {
          delete copy[phoneId];
        }

        return { basketItems: copy };
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
