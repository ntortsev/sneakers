import Card from '../components/Card';
function Home({
  items,
  searchValue,
  setSearchValue,
  onAddToCard,
  onAddToFavorite,
  onChangeSearchInput,
}) {
  return (
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
              id={item.id}
              key={item.imageUrl}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(item) => onAddToFavorite(item)}
              onPlus={(item) => onAddToCard(item)}
            />
          ))}
      </div>
    </div>
  );
}
export default Home;
