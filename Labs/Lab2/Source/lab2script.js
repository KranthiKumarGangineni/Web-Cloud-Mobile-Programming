angular.module('lab2App', ['ngSanitize'])
    .controller('lab2Controller', function($scope, $http, $location) {

        $scope.getYouTubeDetails = function() {
            // Hiding all errors first
            $scope.errorText = "";

            // Fetching the Text
            var youTubeText = $scope.youtubeText;

            // Making Sure Input Text is Not empty
            if (youTubeText == null || $.trim(youTubeText) == ''){
                // Throw error
                $scope.errorText = "Input Text should not be empty !!";
                // Stop flow
                return false;
            }
            $scope.youTubeVideos = [];
            $http.get('https://www.googleapis.com/youtube/v3/search?q='+youTubeText+'&part=snippet&type=video&key=AIzaSyDgLXofeY2ecQUQQ-6qU2-2rPHq5Uurcgg').success(function (data) {
                $scope.youTubeVideos = data.items;
                // If No Videos from API
                if($scope.youTubeVideos.length < 1){
                    // Throw Error
                    $scope.errorText = "No YouTube search records found for the input text : "+youTubeText;
                    // Stop flow
                    return false;
                }
            })
        }

        // Tic Tac Toe

        // Cell Style of 3 * 3 Grid
        $scope.cellStyle= {
            'height': '100px',
            'width': '100px',
            'border': '2px solid black',
            'text-align': 'center',
            'vertical-align': 'middle',
            'cursor': 'pointer'
        };

        // Resetting the Complete Board using Spaces as shown Below
        $scope.reset = function() {
            $scope.board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            $scope.nextMove = 'X';
            $scope.winner = '';
            setUrl();
        };

        $scope.dropPiece = function(row, col) {
            // If there is No winner Yet and player not clicking on existing row, Column this condition is called
            if (!$scope.winner && !$scope.board[row][col]) {
                // Setting the Value on the Board who made a Move
                $scope.board[row][col] = $scope.nextMove;
                // Setting Next Move based on the recent players move
                $scope.nextMove = $scope.nextMove == 'X' ? 'O' : 'X';
                // Setting the Moves in the URL, which will be changed in the Browser URL
                setUrl();
            }
        };

        $scope.reset();
        $scope.$watch(function() { return $location.search().board;}, readUrl);

        function setUrl() {
            var rows = [];
            // Pushing to rows array for each Board Iteration
            angular.forEach($scope.board, function(row) {
                rows.push(row.join(','));
            });
            $location.search({board: rows.join(';') + '/' + $scope.nextMove});
        }

        function checkWinner() {
            var b = $scope.board;
            // Determining the winner based on the rules
            $scope.winner =
                row(0) || row(1) || row(2) ||
                col(0) || col(1) || col(2) ||
                diagonal(-1) || diagonal(1);
            function row(row) { return same(b[row][0], b[row][1], b[row][2]);}
            function col(col) { return same(b[0][col], b[1][col], b[2][col]);}
            function diagonal(i) { return same(b[0][1-i], b[1][1], b[2][1+i]);}
            function same(a, b, c) { return (a==b && b==c) ? a : '';};
            // If there is a winner, showing alert box
            if($scope.winner){
                alert("Player : "+ $scope.winner+" won !!!")
            }
        }

        // Reading the URL
        function readUrl(value) {
            if (value) {
                // If any thing present, then splitting it by '/' and determing the next persons move
                value = value.split('/');
                $scope.nextMove = value[1];
                angular.forEach(value[0].split(';'), function(row, col){
                    $scope.board[col] = row.split(',');
                });
                // Checking if there is a winner
                checkWinner();
            }
        }

        $scope.getTwitterFriends = function (callback) {
            var twitterName = $scope.twitterName;
                $http.get('http://127.0.0.1:8080/get/'+twitterName)
                    .success(function(data){
                        console.log("Successfully got"+ data);
                    });
        };
    });