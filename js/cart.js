function getCartItems() {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'get',
            url: config.url + "/users/" + currentUserId + "/cart_items",
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

function updateCartItem(cartItem, num) {
    cartId = cartItem["id"];
    cart_count = cartItem["count"]
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'patch',
            url: config.url + "/cart_items/" + cartId,
            data: {
                cart_item: {
                    count: parseInt(cart_count) + num
                }
            },
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

function addCartItem(proId, num = 1) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'post',
            url: config.url + "/users/" + currentUserId + "/cart_items",
            data: {
                cart_item: {
                    product_id: proId,
                    user_id: currentUserId,
                    count: num
                }
            },
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}

function getCartItemBy(proId) {
    var p = new Promise(function(resolve, reject) {
        $.ajax({
            type: 'get',
            url: config.url + "/get_cart_item",
            data: {
                cart_item: {
                    product_id: proId,
                    user_id: currentUserId
                }
            },
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        });
    });
    return p;
}


function deleteCartItem(itemId, proId) {
    var p = new Promise(function(resolve, reject) {
        if (currentUserId) {
            $.ajax({
                type: 'delete',
                url: config.url + "/cart_items/" + itemId,
                dataType: 'json',
                success: function(data) {
                    resolve(data);
                }
            });
        } else {
            setCookie(`pro_${proId}`, "", -1);
            resolve();
        }
    });
    return p;
}

function getCookieItems(callback) {
    var cookie = document.cookie;
    var list = cookie.split(';');
    var items = [];
    var prs = [];
    
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let name = item.split('=')[0].trim();
        if (name.startsWith('pro_')) {
            let proId = name.replace("pro_", "");
            let proNum = item.split('=')[1];
            let p = getProduct(proId).then((product) => {
                product["count"] = proNum;
                items.push(product);
            });
            prs.push(p);
        }
    }    
    Promise.all(prs).then(() => callback(items));
}

function getProduct(proId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: config.url + '/products/' + proId,
            dataType: 'json',
            success: function(data) {
                resolve(data);
            }
        })
    })
}