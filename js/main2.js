$(function () {
    var btn = $('#face')
    var panel = $('.panel')
    var imgs = []

    for (var i = 0; i < 128; i++) {
        var insert = 'images/qqexpression/' + (i + 1) + '.gif'
        imgs.push(insert)
    }

    btn.on('click', function () {
        panel.show()

        $.preload(imgs, {
            all: function () {
                var html = '<ul>'
                for (var i = 0; i < imgs.length; i++) {
                    html += '<li><img src="' + imgs[i] + '"></li>'
                }
                html += '</ul>'
                panel.html(html)
            }
        })

    })
})