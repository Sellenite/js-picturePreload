$(function () {
    var imgs = []

    for (var i = 0; i < 15; i++) {
        var insert = 'http://45.34.137.202:8080/comicdata/12307/1/' + i + '.jpg'
        imgs.push(insert)
    }

    var index = 0

    $.preload(imgs, {
        each: function (count) {
            console.log('成功加载第' + count + '漫画')
        },
        all: function () {
            console.log('这集漫画已经加载完毕')
        },
        order: 'ordered'
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