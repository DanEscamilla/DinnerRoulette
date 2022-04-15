import { mockCategories } from './mocks';

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

export function getCategoryFromPath() {
  const categoriesRegex = /(?:&|\?)q=([^&\?]+)/;
  return (window.location.href.match(categoriesRegex) || [])[1];
}

export function getRestaurants(category = 'Desserts') {
  return fetch(`https://www.ubereats.com/api/getFeedV1?localeCode=mx`, {
    method: 'POST',
    headers: {
      'x-csrf-token': 'x',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      userQuery: category,
      pageInfo: {
        offset: 0,
        pageSize: 1000,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then(function ({ data }) {
      const openRestaurants = data.feedItems.filter(
        (fi) =>
          fi.store &&
          !fi.store.imageOverlay &&
          fi.analyticsLabel == 'SEARCH_STORE_DISH_RESULTS'
      );
      console.log(data, openRestaurants);
      return openRestaurants.map(({ store }) => ({
        title: store.title.text,
        img: store.image.items[store.image.items.length - 1].url,
        url: store.actionUrl,
        id: store.uuid,
      }));
    })
    .catch(function (err) {
      console.log('Failed to fetch page: ', err);
    });
}
