var app = angular.module('articleApp', ['ui.router']);

app.controller('mainController',['$scope', '$http', ($scope, $http) => {
    $scope.articles = [];
    $scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

    $http.get('/api/articles').then(res => {
        $scope.articles = res.data;
    })
    $scope.post = () =>{
        $scope.newArticle.timestamp = Date.now();
        $http.post('/api/articles', $scope.newArticle).then(res=>{
            $scope.articles.push(res.data);
            $scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
        })
    }

}]);