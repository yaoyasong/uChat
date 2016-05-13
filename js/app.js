// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(['$ionicPlatform', '$ionicPopup','$rootScope','$location', function($ionicPlatform, $ionicPopup, $rootScope, $location) {
  $ionicPlatform.ready(function() {  	
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  setTimeout(function(){
  	navigator.splashscreen.hide();	
  },3000);
  
  //主页面显示退出提示框
  $ionicPlatform.registerBackButtonAction(function (e) {

    e.preventDefault();

    function showConfirm() {
      var confirmPopup = $ionicPopup.confirm({
        title: '<strong>退出应用?</strong>',
        template: '你确定要退出应用吗?',
        okText: '退出',
        cancelText: '取消'
      });

      confirmPopup.then(function (res) {
        if (res) {
          ionic.Platform.exitApp();
        } else {
          // Don't close
        }
      });
    }

    // Is there a page to go back to?
    if ($location.path() == '/tab/chat' ) {
      showConfirm();
    } else if ($rootScope.$viewHistory.backView ) {
      console.log('currentView:', $rootScope.$viewHistory.currentView);
      // Go back in history
      $rootScope.$viewHistory.backView.go();
    } else {
      // This is the last page: Show confirmation popup
      showConfirm();
    }

    return false;
  }, 101);
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "views/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.chat', {
      url: '/chat',
      views: {
        'tab-chat': {
          templateUrl: 'views/tab-chat.html',
          controller: 'ChatCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chat/:chatId',
      views: {
        'tab-chat': {
          templateUrl: 'views/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'views/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'views/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'views/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    
    .state('tab.about', {
      url: '/about',
      views: {
        'tab-account': {
          templateUrl: 'views/tab-about.html'
        }
      }
    })
    
    .state('tab.msglist', {
      url: '/msglist',
      views: {
        'tab-account': {
          templateUrl: 'views/tab-msglist.html',
          controller: 'MsgListCtrl'
        }
      }
    })
    
    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-account': {
          templateUrl: 'views/tab-setting.html',
          controller: 'SettingCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chat');

});

