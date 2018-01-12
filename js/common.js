// main nav hover
$('.main-nav li').hover(function() {
    var index = $(this).index();
    var dist = parseInt(index) * 118;
    $('.active-line').stop(true,true).animate({
        left: dist,
    }, 500);
});


var currentUserId = "";
var currentUserName = "";

var userinfo = $('#userinfo');

var btnLogin = $('#btn-login'); 
var loginNameInput = $('#login-username'); 
var loginPwdInput = $('#login-userpwd'); 

var btnSignup = $('#btn-signup');
var signupCodeDiv = $('.signup-code-text');  //验证码div
var signupCodeInput = $('#signup-code');
var signupNameInput = $('#signup-username');
var signupPwdInput = $('#signup-userpwd');
var signupEmailInput = $('#signup-email');

// 显示验证码


function getCode() {
    var code = createCode();
    signupCodeDiv.html(code);
} 
signupCodeDiv.click(function() {
    getCode();
});

// 弹出登录
$('.a-login').click(function() {
    $('#signup-modal').removeClass('is-active');
    $('#login-modal').addClass('is-active');
});

// 点击登录
btnLogin.click(function() {
    var name = loginNameInput.val();
    var pwd = loginPwdInput.val();
    login(name, pwd);
})

function login(name, pwd) {
    loginUser(name, pwd).then((data) => {
        console.log('data', data)
        if (data["code"] == 1) {
            console.log('session userid',)
            setCookie("userId", data["user"].id);
            setCookie("userName", data["user"].username);
            window.location.reload();
        } else {
            swal({
                text: "用户名或密码错误, 请重新输入",
                icon: "warning",
                button: "确定"
            }).then(() => {
                loginNameInput.val('');
                loginPwdInput.val('');
            })
        }
    });
}

// 退出
function logout() {
    logoutUser().then((data) => {
        if (data["code"] == 1) {
            setCookie("userId", "", -1);
            setCookie("userName", "", -1);
            window.location.href="index.html";
        }
    })
}

if (getCookie("userId")) {
    currentUserId = getCookie("userId");
    currentUserName = getCookie("userName");
    userinfo.html(`
        <a href="#" id="btn-user">${currentUserName}</a>
        <a href="#" id="btn-logout" onclick="logout()">退出</a>
    `);
}

// 弹出 注册
$('.a-signup').click(function() {
    $('#login-modal').removeClass('is-active');
    getCode();
    $('#signup-modal').addClass('is-active');
})

$('.modal-close').click(function() {
    $(this).closest('.modal').removeClass('is-active');
});

// ---------------------------- 注册检验 ---------------------
signupEmailInput.blur(() => checkEmail());
signupNameInput.blur(() => checkUsername());
signupPwdInput.blur(() => checkUserpwd());


// 点击注册 
btnSignup.click(function (){
    var email = signupEmailInput.val();
    var username = signupNameInput.val();
    var userpwd = signupPwdInput.val();
    checkEmail();
    checkUsername();
    checkUserpwd();
    checkCode(); 

    if ($('#signup-box').find('.error').length > 0) {
        return ;
    } else {
        createUser(email, username, userpwd).then((data) => {
            if (data["code"] == 1) {
                swal({
                text: "注册成功",
                icon: "success",
                button: "确定"
                }).then(() => {
                    login(email, userpwd);
                })
            }
        }); 
    }
});

function checkEmail() {
    var EMAIL_REG = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    var email = signupEmailInput.val();
    if (email.match(EMAIL_REG)) {
        getUserBy("email", email).then((data) => {
            if (data["code"] ==1 ) {
                signupEmailInput.css('border', "1px solid red").addClass('error');
                signupEmailInput.next('span').html("已注册").css("color", "red");
            } else {
                signupEmailInput.next('span').html("√").css("color", "green");
                signupEmailInput.css("border", "1px solid #dcdcdc").removeClass("error");
            }
        })
    } else {
        signupEmailInput.css('border', "1px solid red").addClass('error');
        signupEmailInput.next('span').html("格式错误").css("color", "red");
    }
}

function checkUsername(){
    var username = signupNameInput.val();
    if (username.length <= 2) {
        signupNameInput.css('border', "1px solid red").addClass('error');
        signupNameInput.next('span').html("至少两位").css("color", "red");
    } else {
        getUserBy("username", username).then((data) => {
            if (data["code"] == 1) {
                signupNameInput.css('border', "1px solid red").addClass('error');
                signupNameInput.next('span').html("已注册").css("color", "red");
            } else {
                signupNameInput.next('span').html("√").css("color", "green");
                signupNameInput.css("border", "1px solid #dcdcdc").removeClass('error');
            }
        })
    }
}

function checkUserpwd() {
    var pwd = signupPwdInput.val();
    if (pwd.length<6) {
        signupPwdInput.css('border', "1px solid red").addClass('error');
        signupPwdInput.next('span').html("至少为6位").css("color", "red");
    } else {
        signupPwdInput.next('span').html("√").css("color", "green");
        signupPwdInput.css("border", "1px solid #dcdcdc").removeClass('error');
    }
}

function checkCode() {
    var codetext = signupCodeDiv.html();
    var code = signupCodeInput.val();
    if (codetext.toUpperCase() != code.toUpperCase()) {
        signupCodeInput.css('border', "1px solid red").addClass('error');
        signupCodeInput.nextAll('span').html("不正确").css("color", "red");
        createCode();
    } else {
        signupCodeInput.nextAll('span').html("√").css("color", "green");
        signupCodeInput.css("border", "1px solid #dcdcdc").removeClass('error');
    }
}



function showCartNumber() {
    var count = 0;
    if (!currentUserId) {// 未登录 显示 cookie 里面的数量
        var cookie = document.cookie;
        var list = cookie.split(';');
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var name = item.split('=')[0].trim();
            if (name.startsWith('pro_')) {
                // console.log(name)
                var itemcount = getCookie(name);
                count += parseInt(itemcount);
            }
        }
        if (count > 0) {
            $('.cart-number').html(count).css('display', 'block');
        } else {
            $('.cart-number').html(count).css('display', 'none');
        }
    } else {
        getCartItems().then(data => {
            // console.log(data)
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                count += parseInt(item["count"]);
            }
            if (count > 0) {
                $('.cart-number').html(count).css('display', 'block');
            } else {
                $('.cart-number').html(count).css('display', 'none');
            }
        })
    }
}

// num 1, -1  增加 或减少
function addPro(id, num) {
    if (!currentUserId) { // 未登录
        if (getCookie(`pro_${id}`)) {
            setCookie(`pro_${id}`, parseInt(getCookie(`pro_${id}`)) + num);
        } else {
            setCookie(`pro_${id}`, num);
            swal({
                title: "添加商品成功",
                icon: "success",
                button: "确定",
            }).then(() => {  // 购物车图标
                showCartNumber();
            });
        }
        showCartNumber();
    } else { //已登录
        getCartItemBy(id).then((data) => {
            if (data) {
                updateCartItem(data, num).then(function(){
                    // swal({
                    //     title: "添加商品成功",
                    //     icon: "success",
                    //     button: "确定",
                    // }).then(() => {  // 购物车图标
                        showCartNumber();
                    // });
                })
            } else {
                addCartItem(id, num).then(() => {
                    swal({
                        title: "添加商品成功",
                        icon: "success",
                        button: "确定",
                    }).then(() => {  // 购物车图标
                        showCartNumber();
                    });
                })
            }
        })
    }
}



// 二级菜单
$('.fenlei,.level-2').hover(function() {
    $('.level-2').css('display', "block");
}, function() {
    $('.level-2').css('display', "none");
})

var top1 = $('.header');
var top2 = $('.top-2');
// 滚动
var isDown = false;
window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 130) {
        if (!isDown) {
            top1.css({
                position: "fixed",
                top: "-100px",
                'z-index': 10
            });
            top2.css({
                position: "fixed",
                top: "-200px",
                'z-index': 5
            });
           
            top1.animate({
                top: 0
            }, 1500)
            top2.animate({
                top: 60
            }, 2500)
            isDown = true
        }
    }
    if (scrollTop <= 3) {
        if (isDown) {
            top1.css({
                position: "static",
            });
            top2.css({
                position: "static",
            });
            isDown = false;
        }
    }
}

// 轮播图倒计时
var hSpan = $('.time-hour');
var mSpan = $('.time-minutes');
var sSpan = $('.time-seconds');
var timer = null;
clearInterval(timer);
timer = setInterval(function() {
    var h = parseInt(hSpan.html());
    var m = parseInt(mSpan.html());
    var s = parseInt(sSpan.html());
    s--;
    if (s < 0) {
        s = 59;
        m--;
        if (m < 0){
            m = 59;
            h--;
        }
    } 
    s = s < 10 ? '0' + s : s;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    hSpan.html(h);
    mSpan.html(m);
    sSpan.html(s);
}, 1000)
