describe('articleApp module', () => {
    var mainModule;

    beforeEach(() => {
        mainModule = angular.module('mainModule');
    });

    it('should be registered' ,() => {
        expect(mainModule).toBeDefined();
    });
});

describe('CategoryService', () => {
    beforeEach(module('mainModule'));

    var $httpBackend;

    beforeEach(inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', '/categories/categories.json').respond([{id: 1, name:'bla'}, {id:2, name: 'bla2'}]);

    }));

    describe('Get request for category list', () => {
        var $scope
        beforeEach(inject(function ($rootScope, $controller){
            $scope = $rootScope.$new();
            //controller = $controller('UserRegistrationController', {$scope: $scope});
            //$httpBackend.when('GET', '/categories/categories.json').respond([{id: 1, name:'bla'}, {id:2, name: 'bla2'}]);

            $controller('CategoryController', {$scope: $scope});
        }));

        it('returns the list of categories', () => {
            $httpBackend.flush();
            expect($scope.categories.length).toBe(2);
            expect($scope.categories[0].name).toBe('bla');
            expect($scope.categories[1].name).toBe('bla2');
        });
    })
})





describe('User reg controller', () => {
    //beforeEach(module('mainModule'));
    /*beforeEach(inject((_$controller_) => {
        $controller = _$controller_;
    }));*/

    describe('$scope.passwordStrength', () => {
        var $scope;
        beforeEach(module('mainModule'));
        
        beforeEach(inject(function ($rootScope, $controller){
            $scope = $rootScope.$new();
            //controller = $controller('UserRegistrationController', {$scope: $scope});
            $controller('UserRegistrationController', {$scope: $scope});
        }));
        it('sets strength to "strong" if pwd is more than 9 chars', () => {
            $scope.password = 'abcdefghijklm';
            $scope.passwordStrength();
            expect($scope.strength).toEqual('strong');
        });

        it('sets strength to "weak" if pwd is less than 4 chars', () => {
            $scope.password = 'abc';
            $scope.passwordStrength();
            expect($scope.strength).toEqual('weak');
        });

        it('sets strength to "medium" if pwd is 4-9 chars', () => {
            $scope.password = 'abcde';
            $scope.passwordStrength();
            expect($scope.strength).toEqual('medium');
        });


    })
})