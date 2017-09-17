$(function () {
    // 图片预加载
    function Preload(imgs, options) {
        this.imgs = typeof imgs === 'string' ? [imgs] : imgs
        this.options = $.extend({}, Preload.DEFAULT, options)
        // 调用原型链方法
        if (this.options.order === 'ordered') {
        	// 有序
            this._ordered()
        } else {
        	// 无序
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

        function orderedLoad() {
            var imgObj = new Image()

            $(imgObj).on('load error', function () {
            	// 传出内部变量count
                options.each && options.each(count)
                if (count >= len) {
                    options.all && options.all()
                } else {
                	// 递归调用加载图片
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