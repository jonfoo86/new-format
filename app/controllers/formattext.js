function valiJson(jsonString) {
    try {
        JSON.parse(jsonString);
        return true;
    }
    catch (err) {
        // try to throw a more detailed error message using validate
        //  validateJson(jsonString);

        // rethrow the original error

    }

    return false;
};
function looks_like_html(source) {
    // <foo> - looks like html
    // <!--\nalert('foo!');\n--> - doesn't look like html

    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}

app.controller('FormatTextCtrl', ['$scope', '$http', '$timeout', '$sce', '$location', function ($scope, $http, $timeout, $sce, $location) {
    $scope.isVisible = false;
    $scope.class = "col-md-12";

    $timeout(function () {
        var strs = $location.absUrl().split("/"); //字符分割
        var currentpath = strs[strs.length - 1];
        var elem = document.getElementById(currentpath);
        if (elem) {
            elem.className = "active";
            $scope.formatbk = currentpath;
        }
        else {
            elem = document.getElementById("json_format");
            if (elem) {
                elem.className = "active";
            }
            $scope.formatbk = "json_format";
        }
    }, 2);

    $scope.formatfc = function () {

        $scope.isVisible = true;
        $scope.class = "col-md-6 col-sm-6";
        $scope.destext = "格式化中...";

        if (1 || valiJson($scope.orgtext)) {
            var default_opts = {
                indent_size: 4,
                indent_char: ' ',
                preserve_newlines: true,
                jslint_happy: false,
                keep_array_indentation: false,
                brace_style: 'collapse',
                space_before_conditional: true,
                break_chained_methods: false,
                selector_separator: '\n',
                end_with_newline: false
            };
            var opts = JSON.parse(JSON.stringify(default_opts));
            var beautifycode = $scope.orgtext;
            var result = null;
            if (looks_like_html(beautifycode)) {
                beautifycode = html_beautify(beautifycode, opts);
                result = hljs.highlightAuto(beautifycode, ['xml']);
            }
            else {
                beautifycode = js_beautify(beautifycode, opts);
                result = hljs.highlightAuto(beautifycode, ['json', 'javascript']);
            }

            var replacestr = result.value.replace(/\r/g, '·')
                .replace(/\n/g, '<br>');
            $scope.myHTML = $sce.trustAsHtml(replacestr);
        }
        else {
            $http.post('/vidadateJson', {'date': $scope.orgtext})
                .success(function (data, status, headers, config) {
                    $scope.destext = data;
                })
                .error(function () {
                    $scope.destext = "检查远程调用失败";
                });
        }


    };
}]);

