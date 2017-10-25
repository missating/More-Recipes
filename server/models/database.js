const db = [];

db.reviews = [];

db.recipes = [{
  id: 1,
  ownerId: 1,
  name: 'Boiled Yam',
  ingredients: ['rice', 'beans', 'yam', 'salt'],
  description: 'Boil everything together',
  downVote: 7,
  upVote: 25
},

{
  id: 2,
  ownerId: 1,
  name: 'Paster',
  ingredients: ['spaghetti', 'beans', 'yam', 'salt'],
  description: 'Add tomatoes to everything',
  downVote: 30,
  upVote: 28
},
{
  id: 3,
  ownerId: 1,
  name: 'Yam and bread',
  ingredients: ['oil', 'water', 'yam', 'pepper'],
  description: 'Add salt and maggi to everything',
  downVote: 70,
  upVote: 6
}

];

export default db;
