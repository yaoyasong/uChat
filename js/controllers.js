angular.module('starter.controllers', ['ionic','firebase'])

.controller('ChatCtrl', function($scope, $ionicActionSheet, $timeout, Chats, $ionicLoading) {
	
	$scope.chats = Chats.top(10);
	$scope.doRefresh = function() {
  	$scope.chats = Chats.all();
  	$scope.$broadcast('scroll.refreshComplete');
  };
	
	// Triggered on a button click, or some other target
 	$scope.showMenu = function() {

	   // Show the action sheet
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '直接回复' },
	       { text: '查看' }
	     ],
	     destructiveText: '删除',
	     titleText: '选择',
	     cancelText: '取消',
	     cancel: function() {
	          // add cancel code..
	        },
	     buttonClicked: function(index) {
	       return true;
	     }
	   });
	
	   // For example's sake, hide the sheet after two seconds
	   $timeout(function() {
	     hideSheet();
	   }, 5000);
  };
  
  $scope.remove = function(chat) {
  	$scope.chats.splice($scope.chats.indexOf(chat),1);
  	$ionicLoading.show({ template: '记录已删除.', noBackdrop: true, duration: 2000 });	
  }
})

.controller('ChatDetailCtrl', function($scope) {
	var chats = [
    { id: 0, text: 'Yo', from: 'testUser1', date: '10月10 14点'},
    { id: 1, text: '喂~~~', from: 'testUser2', date: '9月18 18点'},
    { id: 2, text: '干什么呢？', from: 'testUser1', date: '7月22 4点' },
    { id: 3, text: '哈哈', from: 'testUser1', date: '2月18 10点'},
    { id: 4, text: '去睡觉奥', from: 'testUser2', date: '2月18 10点'},
    { id: 5, text: '88', from: 'testUser2', date: '2月18 10点'}
  ];
  
  $scope.setStyle = function(chat){
  	if(chat.from == 'testUser1') {
  		return '{float:left}';
  	}
  	return '{float:right}';
  };
	$scope.chats = chats;
})

.controller('FriendsCtrl', function($scope, Friends, $location, $ionicLoading) {
  $scope.friends = Friends.top(10);
  $scope.go = function(path) {
  	$location.path(path);
  };
  
  $scope.doRefresh = function() {
  	$scope.friends = Friends.all();
  	$scope.$broadcast('scroll.refreshComplete');
  };
  $scope.trigger = function(friend) {
  	friend.added=!friend.added;
  	var triggerMsg = friend.added?"添加":"删除";
  	$ionicLoading.show({ template: '朋友已'+triggerMsg, noBackdrop: true, duration: 2000 });
  };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('MsgListCtrl', function($scope, $firebase,Msglist, $ionicLoading) {
		var ref = new Firebase("https://incandescent-heat-1100.firebaseio.com/msglist");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.msglist = sync.$asArray();
    //$scope.msglist = Msglist.all();
    $scope.inputShow = "false";    
    
    $scope.showAddMsg = function() {
    	$scope.newMsg = new Object();
    	$scope.inputShow = "true";
    }
    
    $scope.save = function(msg) {
    	$scope.msglist.$add(msg).then(function() {
    		$ionicLoading.show({ template: '信息已添加.', noBackdrop: true, duration: 2000 });
    		$scope.inputShow = "false";
    	});    	
    }
    
    $scope.remove = function(msg) {
    	$scope.msglist.$remove(msg).then(function() {
    		$ionicLoading.show({ template: '信息已删除.', noBackdrop: true, duration: 2000 });
    	});
    }
})

.controller('SettingCtrl', function($scope, $firebase, $ionicLoading) {
	var ref = new Firebase("https://incandescent-heat-1100.firebaseio.com/account");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.account = sync.$asObject();
    
    $scope.save = function() {
    	$scope.account.$save().then(function(){
    		$ionicLoading.show({ template: '设置已保存.', noBackdrop: true, duration: 2000 });	
    	});
    }
})
;
