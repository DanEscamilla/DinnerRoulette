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
