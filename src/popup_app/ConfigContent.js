import { useEffect, useState } from 'react';
import {
  getBlacklistedCategories,
  getBlacklistedRestaurants,
  saveBlacklistedCategories,
  saveBlacklistedRestaurants,
} from '../helpers/localstorage';
import BlackList from './BlackList';

function ConfigContent() {
  const [blacklistedCategories, setBlacklistedCategories] = useState([]);
  const [blacklistedRestaurants, setBlacklistedRestaurants] = useState([]);

  useEffect(() => {
    const loadInitialValues = async () => {
      const blacklistedCategories = await getBlacklistedCategories();
      const blacklistedRestaurants = await getBlacklistedRestaurants();
      console.log(blacklistedCategories);
      console.log(blacklistedRestaurants);
      setBlacklistedCategories(blacklistedCategories);
      setBlacklistedRestaurants(blacklistedRestaurants);
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
        options={[]}
      />
      <BlackList
        label='Blacklisted Restaurant'
        multiple
        value={blacklistedRestaurants}
        onChange={blacklistedRestaurantsChanged}
        options={[]}
      />
    </div>
  );
}

export default ConfigContent;
