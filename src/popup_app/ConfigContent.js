import { useState } from 'react';
import {
  getBlacklistedCategories,
  getBlacklistedRestaurants,
  saveBlacklistedCategories,
  saveBlacklistedRestaurants,
} from '../helpers/localstorage';
import BlackList from './BlackList';

function ConfigContent() {
  const [blacklistedCategories, setBlacklistedCategories] = useState(
    getBlacklistedCategories()
  );
  const [blacklistedRestaurants, setBlacklistedRestaurants] = useState(
    getBlacklistedRestaurants()
  );

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
        value={blacklistedCategories}
        onChange={blacklistedCategoriesChanged}
        options={[]}
      />
      <BlackList
        label='Blacklisted Restaurant'
        value={blacklistedRestaurants}
        onChange={blacklistedRestaurantsChanged}
        options={[]}
      />
    </div>
  );
}

export default ConfigContent;
