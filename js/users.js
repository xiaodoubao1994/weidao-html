function getUserBy(type, value) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'get',
            url: config.url + "/getuser",
            dataType: 'json',
            data: {
                type: type,
                value: value
            },
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

function createUser(email, username, userpwd) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'post',
            url: config.url + "/users",
            dataType: 'json',
            data: {
                user: {
                    email: email,
                    username: username,
                    userpwd: userpwd
                }
            },
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

function loginUser(name, userpwd) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'post',
            url: config.url + "/login",
            dataType: 'json',
            data: {
                name: name,
                userpwd: userpwd
            },
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

// 退出
function logoutUser() {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'delete',
            url: config.url + "/logout",
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

// 注册用户
function createUser(email, username, userpwd) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'post',
            url: config.url + "/users",
            dataType: 'json',
            data: {
                user: {
                    email: email,
                    username: username,
                    userpwd: userpwd
                }
            },
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}
