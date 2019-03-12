const handleProfileGet = (req, res, db) => {
  const { id } = req.params;

  db.select('*').from('users').where({ id })
  .then( user => {
    if(user.length){
      res.json(user[0])
    }else{
      res.json('not found')
    }
  })
  .catch( err => res.json('error getting user') )
}

module.exports = {
  handleProfileGet
};
