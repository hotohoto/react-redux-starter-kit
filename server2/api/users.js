import parse from 'co-body';
import monk from 'monk';
import wrap from 'co-monk';
import co from 'co';

export default class Users {};

var db = monk('dev:1234@ds021694.mlab.com:21694/mini_project');
var users = wrap(db.get('users'));

co(function * () {
  var users = yield users.find({});
});

Users.test = function * test(next) {
  this.body = this;
};

Users.login = function * login(next) {
  //parse parameters
  let data = yield parse(this, {
    limit: '1kb'
  });
  
  //validate parameters
  if (!data.id || !data.password) {
    this.body = {
      result:'failed'
    };   
    return;
  }
  
  let userList = yield users.find({id: data.id, password: data.password});

  if (userList.length) {
    this.body = {
      result:'success',
      userKey: createUserKey(data.id)
    };
  } else {
    this.body = {
      result:'failed'
    };
  }
};


Users.addUser = function * addUser(next) {
  let user = yield parse(this, {
    limit: '1kb'
  });
  
  //validate parameters
  if (!user || !user.id || !user.password || !user.name || !user.email) {
    this.body = {
      result:'failed'
    };   
    return;
  }
  
  //check duplicate id
  let oldUser = yield users.find({id:user.id});
  if (oldUser.length) {
    this.body = {
      result:'failed'
    };   
    return;
  }
  
  yield users.insert(user);
  this.body = {
    result:'success'
  };
};


Users.list = function * list(next) {

  //parse parameters
  let data = yield parse(this, {
    limit: '1kb'
  });
  
  if (!authenticate(data.userKey)) {
    return;
  }
  
  //check login status
  
  var userList = yield users.find({});
  this.body = userList;
};


Users.setUserPassword = function * setUserPassword(next) {
  //parse parameter
  let data = yield parse(this, {
    limit: '1kb'
  });
  
  //validate parameter
  if (!data.id || !data.password) {
    this.body = {
      result:'failed'
    };
    return;
  }

  var user = yield users.find({id:data.id});

  if (user.length === 0) {
    this.body = {
      result:'failed'
    };
    return;
  }

  var updated = users.update(user[0], {
    $set: data
  });

  if (!updated) {
    this.body = {
      result:'failed'
    };
    return;
  }
  
  this.body = {
      result:'success'
    };
};


function createUserKey(id) {
  //TODO implement JWT authentication key generation
  return id + "!!!"
}

/**
 * check if userKey is valid for authentication
 * @return true if userKey is valid.
 */
function authenticate(context, userKey) {
  //TODO implement JWT authentication key validation
  return true;
}
