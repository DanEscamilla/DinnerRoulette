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

// function sendRequestToScript(request) {
//   if (!chrome.tabs) return;

//   return new Promise((res) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, request, function (response) {
//         res(response);
//       });
//     });
//   });
// }

// export function requestCategories() {
//   return sendRequestToScript({ type: 'GET_CATEGORIES' });
// }

// export function requestRestaurants() {
//   return sendRequestToScript({ type: 'GET_RESTAURANTS' });
// }

// export function requestSaveCategories(categories) {
//   return sendRequestToScript({ type: 'SAVE_CATEGORIES', action: categories });
// }

// export function requestSaveRestaurants(restaurants) {
//   return sendRequestToScript({ type: 'SAVE_RESTAURANTS', action: restaurants });
// }

// export function attachExtensionMessageListeners() {
//   if (!chrome.runtime.onMessage) return;

//   chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
//     switch (request.type) {
//       case 'GET_RESTAURANTS':
//         sendResponse(getBlacklistedRestaurants());
//         break;
//       case 'GET_CATEGORIES':
//         sendResponse(getBlacklistedCategories());
//         break;
//       case 'SAVE_CATEGORIES':
//         saveBlacklistedCategories(request.payload);
//         break;
//       case 'SAVE_RESTAURANTS':
//         saveBlacklistedRestaurants(request.payload);
//         break;
//       default:
//         sendResponse({ error: 'Unknown request type' });
//         break;
//     }
//   });
// }
