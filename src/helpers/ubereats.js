import { mockCategories } from './mocks';

const restaurantLinkRegexp = /store\//g;

export async function fetchCategories() {
  return fetch('https://www.ubereats.com/api/getSearchHomeV2', {
    method: 'POST',
    headers: {
      'x-csrf-token': 'x',
    },
  })
    .then((response) => response.json())
    .then(({ data }) => {
      return data.browseHomeFeed.reduce((categories, section) => {
        if (section.itemType === 'CATEGORY') {
          return [...categories, ...section.items];
        }
        return categories;
      }, []);
    });
}

export function saveSessionCategories(categories) {
  sessionStorage.setItem(
    'dinnerroulette-categories',
    JSON.stringify(categories)
  );
}

export function getSessionCategories() {
  const rawCategories = sessionStorage.getItem('dinnerroulette-categories');
  try {
    const parsedCategories = JSON.parse(rawCategories);
    if (Array.isArray(parsedCategories)) {
      return parsedCategories;
    }
  } catch {
    return null;
  }
}

export async function getCategories() {
  const sessionCategories = getSessionCategories();
  if (sessionCategories) {
    return sessionCategories;
  } else {
    try {
      const categories = await fetchCategories();
      saveSessionCategories(categories);
      return categories;
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error(e);
        return mockCategories;
      }
    }
  }
}

export function isCategoryLocation() {
  const categoriesRegex = /(?:&|\?)q=/g;
  return categoriesRegex.test(window.location.pathname);
}

export function getRestaurants() {
  fetch(`/q?=`)
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const anchors = Array.from(doc.getElementsByTagName('a'));
      const restaurantAnchors = anchors.filter(
        (a) =>
          /store\//.test(a.getAttribute('href')) &&
          !/http/.test(a.getAttribute('href'))
      );
      window.location.href =
        restaurantAnchors[
          Math.floor(Math.random() * restaurantAnchors.length - 1)
        ].getAttribute('href');
    })
    .catch(function (err) {
      console.log('Failed to fetch page: ', err);
    });
}
