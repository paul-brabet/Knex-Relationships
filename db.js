
module.exports = {
  getUser,
  getUsers,
  addUser,
  addProfile,
  getPosts
}

function getUsers (connection) {
  return connection('users').select()
}

function getUser (id, connection) {
  return connection('users').where('id', id)
}

function addUser (user, connection) {
  return connection('users')
    .insert(user)
}

function addProfile (profile, connection) {
  return connection('profiles')
    .insert(profile)
}

function getPosts (connection) {
  return connection('posts')
    .join('users', 'users.id', 'posts.user_id')
    .select('users.name', 'posts.title', 'posts.content')
}
