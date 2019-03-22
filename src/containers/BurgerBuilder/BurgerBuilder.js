import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axiosOrders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 1.0
}
class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalIngredients: 0,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount () {
    axios.get('https://react-my-burger-70f19.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        this.setState({
          error: true
        })
      });
  }

  updatePurchaseState (ingredients) {
    this.setState({ purchasable: ingredients > 0 });
  }

  addIngredientHandler = (type) => {
    if(this.state.ingredients[type] === 3) { return; }
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIgredients = {
      ...this.state.ingredients
    };
    updatedIgredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    const updatedTotalIngredients = this.state.totalIngredients + 1;
    this.setState({
      ingredients: updatedIgredients,
      totalPrice: newPrice,
      totalIngredients: updatedTotalIngredients
    });
    this.updatePurchaseState(updatedTotalIngredients);
  }

  removeIngredientHandler = (type) => {
    if(this.state.ingredients[type] === 0) { return; }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    const updatedTotalIngredients = this.state.totalIngredients - 1;
    this.setState({
      ingredients: updatedIngredients ,
      totalPrice: newPrice,
      totalIngredients: updatedTotalIngredients
    });
    this.updatePurchaseState(updatedTotalIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Vicente Santos',
        address: {
          street: 'Test St 1',
          zipCOde: '41242',
          country: 'Brazil'
        },
        email: 'vicentesantos@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
      });
  }

  render() {
    const disabledLessInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledLessInfo) {
      disabledLessInfo[key] = disabledLessInfo[key] <= 0
    }

    const disabledMoreInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledMoreInfo) {
      disabledMoreInfo[key] = disabledMoreInfo[key] === 3
    }

    let burger = this.state.error ? <p style={{alignText: 'center'}}>Ingredients cant be loaded</p> : <Spinner />;

    let orderSummary = null;

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger
            ingredients = {this.state.ingredients}
            totalIngredients = {this.state.totalIngredients}/>
          <BuildControls
            price = {this.state.totalPrice}
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabledLess = {disabledLessInfo}
            disabledMore = {disabledMoreInfo}
            purchasable = {this.state.purchasable}
            ordered = {this.purchaseHandler}/>
        </Aux>
      );

      orderSummary = <OrderSummary
        totalPrice = {this.state.totalPrice}
        purchaseCanceled = {this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler }
        ingredients = {this.state.ingredients}/>
    }

    if(this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
