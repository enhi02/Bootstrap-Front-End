var app = angular.module("myapp",["ngRoute"]);

app.config(function($routeProvider){
   $routeProvider 
   .when("/",{templateUrl:"home.html", controller: 'home'})
   .when("/dangnhap",{templateUrl:"login.html", controller: 'taikhoan'})
    .when("/dangky",{templateUrl:"registeration.html", controller: 'taikhoan'})
   .when("/contact",{templateUrl:"bai3.html"})
   .when("/ketqua",{templateUrl:"ketqua.html"})
   .when("/danhsach",{
        templateUrl:"listsubject.html",
       controller:"subjectController"
   })
   
   .when("/exam/:mamh",{
    templateUrl:"thi.html",
    controller:"QuizController"
    })
   .otherwise({template: ''})
   app.controller("taikhoan",function($scope){
        console.log('chay 33');
    })
})

// var app = angular.module("myapp",["ngRoute"]);
//           app.config(function($routeProvider){
//             $routeProvider
//             .when("/login",{templateUrl:"login.html",controller:"myctrl"})
//             .when("/DangKi",{templateUrl:"Dangki.html",controller:"myctrl"})
//             .otherwise({templateUrl:"index.html",controller:"myExam"})
//           })
// app.controller("home",function($scope){
//     console.log('chay 33');
// })


app.controller("home",function($scope,$http){
    $http.get("../db/Subjects.js").then(function(res){
        $scope.listsub = res.data

    });
})
app.controller("QuizController",function($scope,$http,$routeParams){
   
    $scope.id = $routeParams.mamh;

    $http.get(`../db/Quizs/${$scope.id}.js`).then(function(response){
        $scope.listquiz=response.data;
        console.log($scope.listquiz);
    });

  
    $scope.Id=$routeParams.mamh;
    $scope.quizs;
    $scope.index=0;
    $scope.currentQuiz;
    $http.get(`../db/Quizs/${$scope.id}.js`).then(function(response){
        console.log(response.data)
        $scope.quizs=response.data;
        $scope.currentQuiz=$scope.quizs[$scope.index];
        //
        
        //next
        $scope.next=function(){
            $scope.index++;
            $scope.currentQuiz=$scope.quizs[$scope.index];
        }
        $scope.quaylai=function(){
            $scope.index--;
            if($scope.index=0){
                $scope.currentQuiz=$scope.quizs[0];
            }
            $scope.currentQuiz=$scope.quizs[$scope.index];
        }
      
    })
})
app.controller("subjectController",function($scope,$http,$routeParams){
    $scope.email = sessionStorage.getItem('email')
   
    $scope.subject;
    
    $http.get(`../db/Subjects.js`).then(function(response){
        $scope.subject=response.data
        
    });

  
    $scope.Id=$routeParams.mamh;
    $scope.quizs;
    $scope.index=0;
    $scope.currentQuiz;
    $http.get(`../db/Quizs/${$scope.id}.js`).then(function(response){
        console.log(response.data)
        $scope.quizs=response.data;
        $scope.currentQuiz=$scope.quizs[$scope.index];
        //
        
        //next
        $scope.next=function(){
            $scope.index++;
            $scope.currentQuiz=$scope.quizs[$scope.index];
        }
        $scope.quaylai=function(){
            $scope.index--;
            if($scope.index=0){
                $scope.currentQuiz=$scope.quizs[0];
            }
            $scope.currentQuiz=$scope.quizs[$scope.index];
        }
      
    })
})
