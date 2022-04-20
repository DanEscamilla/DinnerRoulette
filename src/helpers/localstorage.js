export function getBlacklistedCategories() {
  return (
    JSON.parse(localStorage.getItem('dinnerroulette-blacklisted-categories')) ||
    []
  );
}

export function saveBlacklistedCategories(categories) {
  localStorage.setItem(
    'dinnerroulette-blacklisted-categories',
    JSON.stringify(categories)
  );
}

export function blacklistCategory(category) {
  const blacklistedCategories = new Set(getBlacklistedCategories());
  blacklistedCategories.add(category);
  saveBlacklistedCategories(Array.from(blacklistedCategories));
}

export function getBlacklistedRestaurants() {
  return (
    JSON.parse(localStorage.getItem('dinnerroulette-blacklisted-restaurant')) ||
    []
  );
}

export function saveBlacklistedRestaurants(restaurants) {
  localStorage.setItem(
    'dinnerroulette-blacklisted-restaurants',
    JSON.stringify(restaurants)
  );
}

export function blacklistRestaurant(restaurant) {
  const blacklistedRestaurants = new Set(getBlacklistedRestaurants());
  blacklistedRestaurants.add(restaurant);
  saveBlacklistedRestaurants(Array.from(blacklistedRestaurants));
}
