$(function () {
    var imgs = [
        'http://i2.hoopchina.com.cn/user/308/15960308/13383588090.jpg',
        'http://img.article.pchome.net/00/44/23/20/pic_lib/wm/2.jpg',
        'http://lcd.yesky.com/imagelist/2009/044/404q4y8g4m0p.jpg',
        'http://lcd.yesky.com/imagelist/2009/044/cgro54wt2t2x.jpg'
    ]

    var index = 0
    var progress = $('.progress')

    // 调用定义好的方法
    $.preload(imgs, {
        each: function (count, len) {
            progress.html(Math.round((count + 1) / len * 100) + '%')
        },
        all: function () {
            $('.loading').hide()
        }
    })

    // 切换图片
    $('.btn').on('click', function () {
        if ($(this).data('control') === 'prev') {
            index = Math.max(0, --index)

        } else {
            index = Math.min(imgs.length - 1, ++index)

        }
        $('#img').attr('src', imgs[index])
    })
})