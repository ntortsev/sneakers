import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    axios.get('https://62ce972f826a88972dfe904a.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://62ce972f826a88972dfe904a.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://62ce972f826a88972dfe904a.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCard = async(items) => {
    await axios.post('https://62ce972f826a88972dfe904a.mockapi.io/cart', items);
    setCartItems((prev) => [...prev, items]);
  };

  const onRemoveItem = async(id) => {
    await axios.delete(`https://62ce972f826a88972dfe904a.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((obj) => obj.id !== id));
  };

  const onAddToFavorite = async(item) => {
    try {
			if (favorites.find((favItem) => favItem.id === item.id)) {
				axios.delete(`https://62ce972f826a88972dfe904a.mockapi.io/favorites/${item.id}`);
			} else {
				const { data } = await axios.post(
					'https://62ce972f826a88972dfe904a.mockapi.io/favorites',
					item,
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			console.log('вот тут че то не то происходит!')
		}
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCard={onAddToCard}
              onAddToFavorite={onAddToFavorite}
              onChangeSearchInput={onChangeSearchInput}
            />
          }
        />

        <Route
          path="/favorites"
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
        />
      </Routes>
    </div>
  );
}

export default App;
