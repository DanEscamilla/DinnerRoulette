async function getFromStorage(key) {
  return new Promise((res) => {
    chrome.storage.sync.get([key], (result) => {
      res(result[key]);
    });
  });
}

async function setToStorage(key, val) {
  return new Promise((res) => {
    chrome.storage.sync.set({ [key]: val }, res);
  });
}

export async function getBlacklistedCategories() {
  return (await getFromStorage('dinnerroulette-blacklisted-categories')) || [];
}

export function saveBlacklistedCategories(categories) {
  return setToStorage('dinnerroulette-blacklisted-categories', categories);
}

export async function blacklistCategory(category) {
  const blacklistedCategories = new Set(await getBlacklistedCategories());
  blacklistedCategories.add(category);
  return saveBlacklistedCategories(Array.from(blacklistedCategories));
}

export async function getBlacklistedRestaurants() {
  return (await getFromStorage('dinnerroulette-blacklisted-restaurants')) || [];
}

export function saveBlacklistedRestaurants(restaurants) {
  return setToStorage('dinnerroulette-blacklisted-restaurants', restaurants);
}

export async function blacklistRestaurant(restaurant) {
  const blacklistedRestaurants = new Set(await getBlacklistedRestaurants());
  blacklistedRestaurants.add(restaurant);
  return saveBlacklistedRestaurants(Array.from(blacklistedRestaurants));
}

export async function getMarkedCategories() {
  return (await getFromStorage('dinnerroulette-marked-categories')) || [];
}

export function saveMarkedCategories(categories) {
  return setToStorage('dinnerroulette-marked-categories', categories);
}

export async function markCategory(category) {
  const markedCategories = new Set(await getMarkedCategories());
  markedCategories.add(category);
  return saveMarkedCategories(Array.from(markedCategories));
}

export async function getMarkedRestaurants() {
  return (await getFromStorage('dinnerroulette-marked-restaurants')) || [];
}

export function saveMarkedRestaurants(restaurants) {
  return setToStorage('dinnerroulette-marked-restaurants', restaurants);
}

export async function markRestaurant(restaurant) {
  const markedRestaurants = new Set(await getMarkedRestaurants());
  markedRestaurants.add(restaurant);
  return saveMarkedRestaurants(Array.from(markedRestaurants));
}
