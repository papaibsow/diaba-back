const sql = require("./db.js");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// constructor
const User = function(user) {
    this.email = user.email;
  this.password = bcrypt.hashSync(user.password, 12);
};
/* bcrypt.genSalt(12, (err, salt) => {
  bcrypt.hash(User.password, salt, (err, hash) => {
    User.password = hash;
  });
}); */
User.toJSON = function (newUser) {

  return _.pick(newUser, ['id', 'email']);
};
User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email=?,password = ? WHERE id =?",
    [user.email,user.password,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
User.loginCheck= (email,password, result) => {
    sql.query(`SELECT * FROM users WHERE email=?`,[email], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.length) {
        
        if(bcrypt.compareSync(password, res[0]["password"])){
          var userobject=User.toJSON(res[0]);
          console.log("found user: ", userobject);
          var access = 'auth';
          var token = jwt.sign({id: userobject["id"], access}, 'mysecret').toString();
          result(null, token);
          return
        }
        
        /* var token = jwt.sign(JSON.stringify(res[0]);ID, "secret",{expiresIn: '2h'}); */
        
        
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = User;
