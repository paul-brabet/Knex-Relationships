
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 99901, name: 'Ambitious Aardvark', title: 'First blog', content: 'My little microblog! Penis. Hahah'},
        {user_id: 99901, name: 'Ambitious Aardvark', title: 'Redaction', content: 'I take my last blog back. I\'m actually really ambitious and proper'},
        {user_id: 99902, name: 'Bamboozled Baboon', title: 'Reflections', content: 'I\'m so confused'}
      ])
    })
}
