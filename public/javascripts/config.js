app.config(($stateProvider, $urlRouterProvider) =>{

$urlRouterProvider.otherwise("404");
$stateProvider
.state('home', {
    	  url: "/",
    	  templateUrl: "main.html",
        controller: "mainController"
      })
      .state('empty', {
    	  url: "",
    	  templateUrl: "main.html",
        controller: "mainController"
      })
      .state('about', {
    	  url: "/about",
    	  templateUrl: "about.html",
      })
      .state('signup', {
    	  url: "/signup",
    	  templateUrl: "signup.html",
        controller: "authController"
      })
      .state('signin', {
    	  url: "/signin",
    	  templateUrl: "signin.html",
        controller: "authController"
      })
      .state('404', {
    	  url: "/404",
    	  templateUrl: "404.html"
      });

});