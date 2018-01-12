function getProjects(sort="", limit=10, offset=0) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'get',
            url: config.url + "/products",
            data: {
                sort: sort,
                limit: limit,
                offset: offset
            },
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}
``
function getProjectById(proId) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'get',
            url: config.url + "/products/" + proId,
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}