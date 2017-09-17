$(function () {
    // 无序图片预加载
    function Preload(imgs, options) {
        this.imgs = typeof imgs === 'string' ? [imgs] : imgs
        this.options = $.extend({}, Preload.DEFAULT, options)
        // 调用原型链方法
        if (this.options.order === 'ordered') {
            this._ordered()
        } else {
            this._unordered()
        }
    }

    Preload.prototype._unordered = function () {
        var imgs = this.imgs
        var options = this.options
        var count = 0
        var len = imgs.length

        $(imgs).each(function (index, item) {
            var imgObj = new Image()
            imgObj.src = item
            $(imgObj).on('load error', function () {
                // 传出内部变量count
                options.each && options.each(count, len)
                if (count >= len - 1) {
                    options.all && options.all()
                }
                count++
            })
        })
    }

    Preload.prototype._ordered = function () {
        var imgs = this.imgs
        var options = this.options
        var count = 0
        var len = imgs.length

        orderedLoad()

        // 有序预加载
        function orderedLoad() {
            var imgObj = new Image()

            $(imgObj).on('load error', function () {
                options.each && options.each(count)
                if (count >= len) {
                    // 所有加载完毕后做的事
                    options.all && options.all()
                } else {
                    orderedLoad()
                }

                count++
            })

            imgObj.src = imgs[count]
        }
    }

    Preload.DEFAULT = {
        each: null,
        all: null,
        order: 'unordered'
    }

    // 增加jquery方法
    $.extend({
        preload: function (imgs, options) {
            new Preload(imgs, options)
        }
    })
});