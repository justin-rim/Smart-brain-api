const handleProfile = (db) => (req, res) => {
   const { id } = req.params;
   db.select('*').from('users').where({id})
      .then(user => {
         if(user.length) {
            res.json(user[0])
         } else {
            res.status(400).json('no user');
         }
   })
   .catch(err => res.status(400).json('No user found'))
}

module.exports = {
   handleProfile: handleProfile
}