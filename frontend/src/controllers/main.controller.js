app.controller('MainController', ['$scope', 'mainFactory', async ($scope, mainFactory) => {
    $scope.todo = {}

    $scope.create = async () => {
        await mainFactory.create($scope.todo)
        alert('Todo successfully created')
        $scope.findAll()
    }

    $scope.findAll = async () => {
        $scope.todos = await mainFactory.findAll()
        $scope.$apply()
    }

    $scope.remove = async (_id) => {
        await mainFactory.remove(_id)
        alert('Todo completed. Removed from the list')
        $scope.findAll()
    }

}])