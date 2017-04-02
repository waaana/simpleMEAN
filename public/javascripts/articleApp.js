var app = angular.module('articleApp', ['ui.router', 'ngResource'/*, 'ngMock'*/]);

app.run(($http, $rootScope) => {
    $rootScope.authenticated = false;
    $rootScope.current_user = 'Guest';

    $rootScope.signout = () =>{
        $http.get('auth/signout');
        $rootScope.authenticated = false;
        $rootScope.current_user = 'Guest';
    }
})
app.factory('articleService', ['$resource', ($resource)=> {
    return $resource('api/articles/:articleId', {articleId:'@id'}, {update: {method:'PUT'}})
}])

app.controller('mainController',['$scope', '$http', '$state','$rootScope', 'articleService', ($scope, $http, $state, $rootScope, articleService) => {
    $scope.articles = [];
    $scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
    $scope.editMode = false;

    /*$http.get('/api/articles').then(res => {
        $scope.articles = res.data;
    })*/
    $scope.articles = articleService.query();

    $scope.post = () =>{
        $scope.newArticle.timestamp = Date.now();
        $scope.newArticle.username = $rootScope.current_user;
        articleService.save($scope.newArticle, (res)=>{
        //$http.post('/api/articles', $scope.newArticle).then(res=>{
            if (res.status === 'Authentication Failure') {
                $state.go('signin');
            }
            //$scope.articles.push(res.data);
            $scope.articles = articleService.query();
            $scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
        })
    }
    $scope.edit = (article) => {
        $scope.editMode = true;
        $scope.newArticle = articleService.get({articleId: article._id});
    }

    $scope.update = (article) => {
        $scope.newArticle.timestamp = Date.now();
        articleService.update($scope.newArticle, (res) => {
            if (res.status === 'Authentication Failure') {
                $state.go('signin');
            } else{
                $scope.articles = articleService.query();
                $scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
            }
            $scope.editMode = false;
        })
    }
    $scope.del = (article) => {
        if(confirm('Are you sure you want to delete the article?')){
            articleService.delete({articleId: article._id}, (res) => {
                if (res.status === 'Authentication Failure') {
                    $state.go('signin');
                } else {
                    $scope.articles = articleService.query();
                    $scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
                }
            })
        }
    }

}]);