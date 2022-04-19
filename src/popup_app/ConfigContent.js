import {
  getBlacklistedCategories,
  getBlacklistedRestaurants,
} from '../helpers/localstorage';
import BlackList from './BlackList';

function ConfigContent() {
  const blacklistedCategories = getBlacklistedCategories();
  const blacklistedRestaurants = getBlacklistedRestaurants();

  return (
    <div>
      <BlackList
        label='Blacklisted Categories'
        options={blacklistedCategories}
      />
      <BlackList
        label='Blacklisted Restaurant'
        options={blacklistedRestaurants}
      />
    </div>
  );
}

export default ConfigContent;
