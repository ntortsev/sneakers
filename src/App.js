import Card from './components/Card';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    axios.get('https://62ce972f826a88972dfe904a.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://62ce972f826a88972dfe904a.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCard = (items) => {
    axios.post('https://62ce972f826a88972dfe904a.mockapi.io/cart', items);
    setCartItems((prev) => [...prev, items]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://62ce972f826a88972dfe904a.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
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
      <div className="content p-40">
        <div className="d-flex justify-between align-center pb-40">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="./img/search.svg" alt="поиск" />
            <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..." />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="removeBtn"
                src="./img/btn-remove.svg"
                alt="clear"
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue))
            .map((item) => (
              <Card
                key={item.imageUrl}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={(item) => onAddToCard(item)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
