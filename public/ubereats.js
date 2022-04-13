// if (!dinnerRoulette) {
//   var dinnerRoulette = {};

//   dinnerRoulette.loadCategories = async () => {
//     const categories = await fetch(
//       'https://www.ubereats.com/api/getSearchHomeV2',
//       {
//         method: 'POST',
//         headers: {
//           'x-csrf-token': 'x',
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then(({ data }) => {
//         return data.browseHomeFeed.reduce((categories, section) => {
//           if (section.itemType === 'CATEGORY') {
//             return [...categories, ...section.items];
//           }
//           return categories;
//         }, []);
//       });

//     dinnerRoulette.categories = categories;

//     chrome.runtime.sendMessage({
//       type: 'categories-loaded',
//       options: {
//         categories,
//       },
//     });
//   };
// }
// if (!dinnerRoulette.categories) {
//   console.log(dinnerRoulette);
//   dinnerRoulette.loadCategories();
// }
