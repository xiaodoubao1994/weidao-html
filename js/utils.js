const config = {
    url: 'https://weidao.herokuapp.com' 
    // url: 'http://192.168.71.203:3000' 

};


const codeList = [];
for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++ ) {
    var char = String.fromCharCode(i);
    codeList.push(char);
    codeList.push(char.toUpperCase());
}

for (let i = 0; i <= 9; i++) {
    codeList.push(String(i));
}

function createCode() {
    let str = "";
    for(let i = 0; i < 4; i++) {
        var index = Math.round(Math.random() * codeList.length);
        str += codeList[index];
    }
    return str;
}

// ----------- Cookie ----------------------------
function getCookie(name) {
    var cookie = document.cookie;
    var list = cookie.split(';');
    for (var i = 0; i < list.length; i++) {
        var item = list[i].trim();
        var cookiename = item.split('=')[0];
        if (cookiename == name){
            return item.split('=')[1];
        }
    }
    return "";
}

function setCookie(name, value, days) {
    var date = new Date();
    var day = days || 7;
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value};expires=${date}`;
}



