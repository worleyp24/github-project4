import React, { useReducer } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
import Menu from "./pages/Menu";
import CartItem from "./pages/CartItem";
import Home from "./pages/Home";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const initialState = {
    products: [
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/ramen-seaMen.jpg"),
        name: "Seamen",
        category: ["Best Seller", "Ramen"],
        price: 345,
        description: "clear soy broth, clams, shrimp, onions, squid",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/ramen-communist.jpg"),
        name: "Communist",
        category: ["Ramen"],
        price: 450,
        description: "chashu, Szechuan peppers, sate, hotpot balls",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/ramen-hotjunk.jpg"),
        name: "Hot Junk",
        category: ["Ramen"],
        price: 450,
        description: "kimchi, Spam, sausage, tteokbokki, parmesan",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/ramen-krustysFuneral.jpg"),
        name: "Krusty's Funeral",
        category: ["Ramen"],
        price: 580,
        description: "softshell crab, crab fat, coconut milk, cilantro, chilis",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/ramen-FU.jpg"),
        name: "FU",
        category: ["Best Seller", "Ramen"],
        price: 490,
        description:
          "crispy bacon, Spam, crispy fried egg, black pepper, parmesan",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/side-spicyGyoza.jpg"),
        name: "Spicy Gyoza",
        category: ["Best Seller", "Side Dish"],
        price: 265,
        description: "deep fried dumplings, xo chili",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/side-redCowTamagoyaki.jpg"),
        name: "Red Cow Tamagoyaki",
        category: ["Side Dish", "New"],
        price: 280,
        description: "corned beef, shitake, tamago, fish sauce teriyaki glaze",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/side-chickenAkuma.jpg"),
        name: "Chicken Akuma",
        category: ["Side Dish"],
        price: 280,
        description: "crispy boneless chicken thigh, house buffalo sauce",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/side-ebiKorokke.jpg"),
        name: "Ebi Korroke",
        category: ["Side Dish", "New"],
        price: 270,
        description: "crispy croquette, minced shrimp",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/extra-runnyEgg.jpg"),
        name: "Runny Egg",
        category: ["Add-ons"],
        price: 55,
        description:
          "a perfectly cooked Japanese-style seasoned egg with a runny core",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/extra-friedEgg.jpg"),
        name: "Crispy Fried Egg",
        category: ["Add-ons"],
        price: 60,
        description: "sunny side up eggs with crispy edges",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/extra-chasu.jpg"),
        name: "Extra Chasu",
        category: ["Add-ons"],
        price: 60,
        description: "crispy chasu slice",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/dessert-poopOfTheGods.jpg"),
        name: "Poof of the Gods",
        category: ["Best Seller", "Desserts"],
        price: 60,
        description: "belgian chocolate with sea salt and olive oil",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/beverages-asahi.jpg"),
        name: "Asahi",
        category: ["Beverages"],
        price: 120,
        description: "japanese rice lager",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/beverages-kirin.jpg"),
        name: "Kirin",
        category: ["Beverages"],
        price: 120,
        description: "flavourful yet smooth beer",
      },
      {
        id: uuidv4(),
        discount: "",
        image: require("./images/beverages-sapporo.jpg"),
        name: "Sapporo",
        category: ["Beverages"],
        price: 120,
        description: "international pale lager style",
      },
    ],
    newItemForm: false,
    editItemForm: false,
    editItem: {
      id: "",
      discount: "",
      image: "",
      name: "",
      category: [],
      price: "",
      description: "",
    },
    editCartItem: {
      id: "",
      discount: "",
      image: "",
      name: "",
      category: [],
      price: "",
      description: "",
      quantity: "",
    },
    cartItem: [],
    cartItemForm: false,
    alertModal: { status: false, errorType: "", id: "", name: "" },
    devMode: false,
  };

  // const [cartItemForm, setCartItemForm] = useState(false);

  //Reducer Setup
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_NEW_ITEM": {
        return {
          ...state,
          products: [...state.products, action.payload.newItem],
          newItemForm: false,
        };
      }
      case "REMOVE_ITEM": {
        return {
          ...state,
          products: state.products.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      case "REMOVE_CART_ITEM": {
        return {
          ...state,
          cartItem: state.cartItem.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      }
      case "ADD_TO_CART": {
        const cartCopy = [...state.cartItem];
        let updatedCart = [];
        const tartgetItem = cartCopy.filter(
          (item) => item.id === action.payload.id
        );
        if (tartgetItem.length > 0) {
          updatedCart = cartCopy.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else {
          updatedCart = [...cartCopy, { ...action.payload, quantity: 1 }];
        }
        return {
          ...state,
          cartItem: updatedCart,
        };
      }
      case "ADD_ITEM_FORM": {
        return {
          ...state,
          newItemForm: action.payload,
        };
      }
      case "EDIT_ITEM_FORM": {
        return {
          ...state,
          editItemForm: action.payload,
        };
      }
      case "FOR_EDIT_ITEM": {
        return {
          ...state,
          editItem: { ...state.editItem, ...action.payload },
          editItemForm: true,
        };
      }
      case "FOR_EDIT_CART_ITEM": {
        const indexOfItem = state.cartItem.findIndex(
          (item) => item.id === action.payload.id
        );
        const quantity = state.cartItem[indexOfItem]?.quantity;
        const cartItem = { ...action.payload, quantity: quantity };
        return {
          ...state,
          editCartItem: { ...state.editCartItem, ...cartItem },
        };
      }
      case "EDIT_ITEM": {
        const indexOfItem = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        const productsCopy = [...state.products];
        productsCopy.splice(indexOfItem, 1, action.payload);
        return {
          ...state,
          products: [...productsCopy],
          editItemForm: false,
        };
      }
      case "EDIT_CART_ITEM": {
        const indexOfItem = state.cartItem.findIndex(
          (item) => item.id === action.payload.id
        );
        const cartItemCopy = [...state.cartItem];
        cartItemCopy.splice(indexOfItem, 1, action.payload);
        return {
          ...state,
          cartItem: [...cartItemCopy],
        };
      }
      case "CART_ITEM_FORM": {
        return {
          ...state,
          cartItemForm: action.payload,
        };
      }
      case "DEV_MODE": {
        return {
          ...state,
          devMode: action.payload,
        };
      }
      case "ALERT_MODAL": {
        return {
          ...state,
          alertModal: {
            ...state.alertModal,
            status: action.payload.status,
            errorType: action.payload.errorType,
            id: action.payload.id,
            name: action.payload.name,
          },
          newItemForm: action.payload.newItemForm,
          editItemForm: action.payload.editItemForm,
          cartItemForm: action.payload.cartItemForm,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <NavBar {...state} dispatchParent={dispatch} />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Menu/*"
          element={<Menu {...state} dispatchPL={dispatch} />}
        />
        <Route
          path="/Cart"
          element={<CartItem {...state} dispatchParent={dispatch} />}
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
