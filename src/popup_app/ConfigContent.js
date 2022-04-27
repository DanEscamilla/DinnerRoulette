import { useEffect, useState } from 'react';
import {
  getMarkedCategories,
  getMarkedRestaurants,
  getBlacklistedCategories,
  getBlacklistedRestaurants,
  saveBlacklistedCategories,
  saveBlacklistedRestaurants,
} from '../helpers/storage';
import BlackList from './BlackList';

function ConfigContent() {
  const [blacklistedCategories, setBlacklistedCategories] = useState([]);
  const [markedRestaurants, setMarkedRestaurants] = useState([]);
  const [blacklistedRestaurants, setBlacklistedRestaurants] = useState([]);
  const [markedCategories, setMarkedCategories] = useState([]);

  useEffect(() => {
    const loadInitialValues = async () => {
      const blacklistedCategories = await getBlacklistedCategories();
      const blacklistedRestaurants = await getBlacklistedRestaurants();
      const markedCategories = await getMarkedCategories();
      const markedRestaurants = await getMarkedRestaurants();

      setBlacklistedCategories(blacklistedCategories);
      setBlacklistedRestaurants(blacklistedRestaurants);
      setMarkedCategories(markedCategories);
      setMarkedRestaurants(markedRestaurants);
    };
    loadInitialValues();
  }, []);

  const blacklistedCategoriesChanged = (_, newValue) => {
    setBlacklistedCategories(newValue);
    saveBlacklistedCategories(newValue);
  };
  const blacklistedRestaurantsChanged = (_, newValue) => {
    setBlacklistedRestaurants(newValue);
    saveBlacklistedRestaurants(newValue);
  };

  return (
    <div>
      <BlackList
        label='Blacklisted Categories'
        multiple
        value={blacklistedCategories}
        onChange={blacklistedCategoriesChanged}
        options={markedCategories}
        noOptionsText={'Explore the extension to see options!'}
      />
      <BlackList
        label='Blacklisted Restaurant'
        multiple
        value={blacklistedRestaurants}
        onChange={blacklistedRestaurantsChanged}
        options={markedRestaurants}
        noOptionsText={'Explore the extension to see options!'}
      />
    </div>
  );
}

export default ConfigContent;
