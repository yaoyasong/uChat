var app = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: '张三丰', added: 'true' },
    { id: 1, name: '虚竹',added: 'true' },
    { id: 2, name: '逍遥子' },
    { id: 3, name: '张无忌',added: 'true' }
  ];  
  
  for (var i=4;i<100;i++) {
  	friends.push({ id: i, name: '朋友-'+i });
  };

  return {
    all: function() {
      return friends;
    },
    top: function(count) {
      return friends.slice(0,count);
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});


app.factory('Msglist', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var msglist = [
    { id: 0, text: 'Yo'},
    { id: 1, text: '喂~~~'},
    { id: 2, text: '干什么呢？' },
    { id: 3, text: '哈哈'}
  ];
  
  return {
    all: function() {
      return msglist;
    },
    get: function(msgId) {
      // Simple index lookup
      return msglist[msgId];
    }
  }
});

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [
    { id: 0, text: 'Yo', from: 'testUser1', date: '10月10 14点'},
    { id: 1, text: '喂~~~', from: 'testUser2', date: '9月18 18点'},
    { id: 2, text: '干什么呢？', from: 'testUser1', date: '7月22 4点' },
    { id: 3, text: '哈哈', from: 'testUser1', date: '2月18 10点'}
  ];
  
  for (var i=4;i<100;i++) {
  	chats.push({ id: i, text: '聊天内容！~~~~' + i, from: 'testUser1', date: '2月18 10点'});
  };
  
  return {
    all: function() {
      return chats;
    },
    top: function(count) {
    	return chats.slice(0,count);
    },
    get: function(msgId) {
      // Simple index lookup
      return chats[msgId];
    }
  }
});
