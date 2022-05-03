import { useEffect, useRef } from 'react';

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
  const blacklistedCategories = await getBlacklistedCategories();
  if (!blacklistedCategories.find((c) => category.title === c.title)) {
    blacklistedCategories.push(category);
  }
  return saveBlacklistedCategories(blacklistedCategories);
}

export async function getBlacklistedRestaurants() {
  return (await getFromStorage('dinnerroulette-blacklisted-restaurants')) || [];
}

export function saveBlacklistedRestaurants(restaurants) {
  return setToStorage('dinnerroulette-blacklisted-restaurants', restaurants);
}

export async function blacklistRestaurant(restaurant) {
  const blacklistedRestaurants = await getBlacklistedRestaurants();
  if (!blacklistedRestaurants.find((r) => restaurant.id === r.id)) {
    blacklistedRestaurants.push(restaurant);
  }
  return saveBlacklistedRestaurants(blacklistedRestaurants);
}

export async function getMarkedCategories() {
  return (await getFromStorage('dinnerroulette-marked-categories')) || [];
}

export function saveMarkedCategories(categories) {
  return setToStorage('dinnerroulette-marked-categories', categories);
}

export async function markCategory(category) {
  const markedCategories = await getMarkedCategories();
  if (!markedCategories.find((c) => category.title === c.title)) {
    markedCategories.push(category);
  }
  return saveMarkedCategories(markedCategories);
}

export async function getMarkedRestaurants() {
  return (await getFromStorage('dinnerroulette-marked-restaurants')) || [];
}

export function saveMarkedRestaurants(restaurants) {
  return setToStorage('dinnerroulette-marked-restaurants', restaurants);
}

export async function markRestaurant(restaurant) {
  const markedRestaurants = await getMarkedRestaurants();
  if (!markedRestaurants.find((r) => restaurant.id === r.id)) {
    markedRestaurants.push(restaurant);
  }
  return saveMarkedRestaurants(markedRestaurants);
}

export function getTour() {
  return getFromStorage('dinnerroulette-tour');
}

export function setTour() {
  return setToStorage('dinnerroulette-tour', true);
}

export function useBlacklists() {
  const blacklistedCategoryMap = useRef({});
  const blacklistedRestaurantMap = useRef({});

  useEffect(() => {
    const blacklistPromises = [
      getBlacklistedCategories(),
      getBlacklistedRestaurants(),
    ];

    Promise.all(blacklistPromises).then(([blCategories, blRestaurants]) => {
      blCategories.forEach((blCategory) => {
        blacklistedCategoryMap.current[blCategory.title] = blCategory;
      });
      blRestaurants.forEach((blRestaurant) => {
        blacklistedRestaurantMap.current[blRestaurant.id] = blRestaurant;
      });
    });
  });

  return {
    blacklistedCategoryMap,
    blacklistedRestaurantMap,
  };
}
