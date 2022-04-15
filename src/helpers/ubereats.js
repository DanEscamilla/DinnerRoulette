export async function getCategories() {
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

export function getCategoryFromPath() {
  const categoriesRegex = /(?:&|\?)q=([^&?]+)/;
  return (window.location.href.match(categoriesRegex) || [])[1];
}

export function validateCategory(category) {
  return getRestaurants(category).then((restaurants) => restaurants.length > 0);
}

export function getRestaurants(category) {
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
          fi.analyticsLabel === 'SEARCH_STORE_DISH_RESULTS' &&
          !/cornershopapp/.test(fi.store.actionUrl)
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
