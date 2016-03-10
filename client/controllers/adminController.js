angular.module('jobsearch.admin', [])

  .controller('AdminController', ['$rootScope', '$scope', '$http', 'ApiCalls', function($rootScope, $scope, $http, ApiCalls) { 

  
    // if (!Auth.isAuth()) $location.path('/login')
    // $scope.comments = undefined;

    // $scope.link = {};
    // $scope.link.url = $window.localStorage.getItem("CommentUrl");
    // $scope.link.image = $window.localStorage.getItem("CommentImage");
    // $scope.link.title = $window.localStorage.getItem("CommentTitle");
    // $scope.link.description = $window.localStorage.getItem("CommentDescription");

    // Enables user to signout
    // $scope.signout = function () { Auth.signout() };

    // For the add link pop-up modal
    // $scope.modalShow = false;
    // $scope.changeModal = function() {
    //   $scope.modalShow = $scope.modalShow === false ? true : false;
    // }

    // get user and profile info to display when controller loads
    // $scope.getUserInfo();
    // $scope.getLinkComments();
  

  }])
