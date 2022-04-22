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

function sendRequestToScript(request) {
  return new Promise((res) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request, function (response) {
        res(response);
      });
    });
  });
}

export function requestCategories() {
  return sendRequestToScript({ type: 'GET_CATEGORIES' });
}

export function requestRestaurants() {
  return sendRequestToScript({ type: 'GET_RESTAURANTS' });
}

export function requestSaveCategories(categories) {
  return sendRequestToScript({ type: 'SAVE_CATEGORIES', action: categories });
}

export function requestSaveRestaurants(restaurants) {
  return sendRequestToScript({ type: 'SAVE_RESTAURANTS', action: restaurants });
}

export function attachExtensionMessageListeners() {
  if (!chrome.runtime.onMessage) return;
  chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    switch (request.type) {
      case 'GET_RESTAURANTS':
        sendResponse(getBlacklistedRestaurants());
        break;
      case 'GET_CATEGORIES':
        sendResponse(getBlacklistedCategories());
        break;
      case 'SAVE_CATEGORIES':
        saveBlacklistedCategories(request.payload);
        break;
      case 'SAVE_RESTAURANTS':
        saveBlacklistedRestaurants(request.payload);
        break;
      default:
        sendResponse({ error: 'Unknown request type' });
        break;
    }
  });
}
