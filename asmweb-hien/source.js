var app = angular.module("ASM", ["ngRoute"]);
app.controller("dsmonhoc", function ($scope, $http,$rootScope) {
    $scope.cacmonhoc = [];
    $http.get("./db/monhoc.js").then(function (d) { $scope.cacmonhoc = d.data; console.log(d.data) });
    $rootScope.index = 0;
    $scope.pageSize = 4;
    $scope.next = function () {
        if ($rootScope.index >= $scope.cacmonhoc.length - $scope.pageSize) {
            alert("Đã tới cuối trang");
            $scope.discuoi = "disabled";
        } else {
            $scope.disdau = "";
            $rootScope.index += $scope.pageSize;
        }
    };
    $scope.previous = function () {
        if ($rootScope.index <= 0) {
            alert("Đã tới đầu trang");
            $scope.disdau = "disabled";
        } else {
            $scope.disdau = "";
            $scope.discuoi = "";
            $rootScope.index -= $scope.pageSize;
        }
    };
    $scope.dau = function () {
        $rootScope.index = 0;
        $scope.disdau = "disabled";
        $scope.discuoi = "";
    }
    $scope.cuoi = function () {
        var sotrang = Math.ceil($scope.cacmonhoc.length / $scope.pageSize);
        $rootScope.index = (sotrang - 1) * $scope.pageSize;
        $scope.discuoi = "disabled"
        $scope.disdau = "";
    }
});
app.controller("caccauhoi", function ($scope, $http, $routeParams, $rootScope, $interval) {
    $rootScope.id = $routeParams.id;
    $rootScope.name = $routeParams.name;
    $rootScope.caccauhoi = [];
    $scope.pageSize = 1;
    $rootScope.start = 0;
    $rootScope.giatridiem;
    $rootScope.maxtn;
    $rootScope.socaudatduoc = 0;
    $http.get("/db/Quizs/" + $rootScope.id + ".js").then
        (function (d) {
            console.log(d.data);
            $rootScope.caccauhoi = d.data;
            $rootScope.maxtn = $rootScope.caccauhoi.length;
        }, function (d) {
            alert("error")
        });
    $scope.next = function () {
        if ($rootScope.start >= $rootScope.caccauhoi.length - $scope.pageSize) {
            alert("Đã tới cuối trang");
            $scope.discuoi = "disabled";
        } else {
            $scope.disdau = "";
            $rootScope.start += $scope.pageSize;
            if (isNaN($scope.idPa) == false) {
                $rootScope.diemtong += $rootScope.giatridiem;
                $rootScope.socaudatduoc += $scope.count;
                $scope.idPa = "resetID_PA";
            }

        }
    };
    $scope.previous = function () {
        if ($rootScope.start <= 0) {
            alert("Đã tới đầu trang");
            $scope.disdau = "disabled";
        } else {
            $scope.disdau = "";
            $scope.discuoi = "";
            $rootScope.start -= $scope.pageSize;
            console.log($rootScope.diemtong -= $rootScope.giatridiem);
            $rootScope.socaudatduoc = $rootScope.socaudatduoc - $scope.count;
        }
    };
    $scope.dau = function () {
        $rootScope.start = 0;
        $scope.disdau = "disabled";
        $scope.discuoi = "";
    }
    $scope.cuoi = function () {
        var sotrang = Math.ceil($rootScope.caccauhoi.length / $scope.pageSize);
        $rootScope.start = (sotrang - 1) * $scope.pageSize;
        $scope.discuoi = "disabled"
        $scope.disdau = "";
    }
    $rootScope.diemtong = 0;
    $rootScope.giatridiem = 0;
    $scope.idPa;
    $scope.count = 0;
    $scope.ktketqua = function (idPa, dapan) {
        $scope.idPa = idPa;
        console.log($scope.idPa);
        if (idPa == dapan) {
            $rootScope.giatridiem = Math.round(parseFloat((10 / $rootScope.caccauhoi.length)) * 100) / 100;
            $scope.count = 1;
        } else {
            $rootScope.giatridiem = 0;
            $scope.count = 0;
        }
    }

    $scope.submit = function () {
        if (isNaN($scope.idPa) == false) {
            $rootScope.diemtong = $rootScope.diemtong + $rootScope.giatridiem;
            $rootScope.socaudatduoc = $rootScope.socaudatduoc + $scope.count;
            $scope.idPa = "resetID_PA";
            $scope.stop();
        }
    }
    var promise;
    $rootScope.countDown = 600;
    $scope.timestart = function () {
        $scope.stop();
        promise = $interval(setRandomizedCollection, 1000);
    };
    $scope.stop = function () {
        $interval.cancel(promise);
        $rootScope.tgdalam = $scope.c
    };
    $scope.timestart();
    console.log($rootScope.countDown)
    $scope.$on('$destroy', function () {
        $scope.stop();
    });
    function setRandomizedCollection() {
        if ($rootScope.countDown == 0) {
            window.location = "http://127.0.0.1:5500/index.html#!/hoanthanh/ADAV/L%E1%BA%ADp%20tr%C3%ACnh%20Android%20n%C3%A2ng%20cao";
            $scope.stop();
        } else {
            $rootScope.countDown--;
            console.log($rootScope.countDown);
        }
    }
});
app.controller("hoanthanh", function ($scope, $http, $routeParams, $rootScope) {
    $scope.time = 900;
    $rootScope.idtl = $routeParams.idtrolai;
    $rootScope.nametl = $routeParams.nametrolai;
})
app.config(function ($routeProvider) {
    $routeProvider
        .when("/gioithieu", { templateUrl: "gioithieu.html" })
        .when("/lienhe", { templateUrl: "lienhe.html", })
        .when("/tracnghiem/:id/:name", { templateUrl: "tracnghiem.html", controller: "caccauhoi" })
        .when("/hoanthanh/:idtrolai/:nametrolai", { templateUrl: "hoanthanh.html", controller: "hoanthanh" })
        .otherwise({ templateUrl: "indexcontent.html" })
});
