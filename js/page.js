function setpage(ele) {
    this.ele = document.querySelector(ele);
    this.pageindex = 1;
    this.option = {
        count: 100,
        shownum: 10,
        showpage: 5,
        prev: "上一页",
        next: "下一页"
    }
}
setpage.prototype.page = function (option) {
    this.extend(option);//初始化参数数据
    this.create();//构建分页插件的主体结构
    this.initData();//往主体结构里面填充内容
}
setpage.prototype.extend = function (option) {
    for (var i in option) {
        this.option[i] = option[i];
    }
}
setpage.prototype.create = function () {
    this.prevBtn = document.createElement("span");
    this.prevBtn.className = "page_prev";
    this.prevBtn.innerHTML = this.option["prev"];
    this.ele.appendChild(this.prevBtn);

    this.pageContent = document.createElement("ul");
    this.pageContent.className = "page_content";
    this.ele.appendChild(this.pageContent);

    this.nextBtn = document.createElement("span");
    this.nextBtn.className = "page_next";
    this.nextBtn.innerHTML = this.option["next"];
    this.ele.appendChild(this.nextBtn);
}
setpage.prototype.prevfn = function () {
    this.pageindex--;
    this.initData();
}
setpage.prototype.nextfn = function () {
    this.pageindex++;
    this.initData();
}
setpage.prototype.initData = function () {
    var countpage = Math.ceil(this.option["count"] / this.option["shownum"]);
    var start = 1;
    var end = countpage;
    var showpage = this.option["showpage"];
    if (this.pageindex < showpage / 2) {//表示页码是前面两个的时候
        start = 1;
        end = showpage > countpage ? countpage : showpage;
    }
    if (this.pageindex > showpage / 2) {//表示中间
        start = this.pageindex - Math.floor(showpage / 2);
        end = this.pageindex + Math.floor(showpage / 2);
    }
    if (this.pageindex > (countpage - (Math.floor(showpage / 2)))) {//表示到达了最后两个
        start = countpage - showpage + 1;
        end = countpage;
    }
    start = start > 1 ? start : 1;
    end = end > countpage ? countpage : end;
    var that = this;
    this.pageContent.innerHTML = "";
    for (var i = start; i <= end; i++) {
        var li = document.createElement("li");
        li.innerHTML = i;
        if (this.pageindex == i) {
            li.className = "selected";
        }
        li.index = i;
        li.onclick = function () {
            that.pageindex = this.index;
            that.initData();

        }
        this.pageContent.appendChild(li);
    }
    this.prevBtn.onclick = null;
    this.nextBtn.onclick = null;
    if (this.pageindex > 1) {
        this.prevBtn.onclick = function () {
            that.prevfn();
        }
    }
    if (this.pageindex < countpage) {
        this.nextBtn.onclick = function () {
            that.pageindex++;
            that.initData();
        };
    }
    if (this.option["callback"]) {
        this.option["callback"](this.pageindex);
    }

}


function Page(ele) {
    return new setpage(ele);
}
