(function ($) {
    Snow = function (e, settings) {
        this.settings = settings,
            this.items = [],
            this.itemCount = settings.count,
            this.init(e)
    };
    //雪花对象重绘  
    Snow.prototype.init = function (e) {
        this.canvas = e.get(0)
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.items = [];
        for (var i = 0; i < this.itemCount; i++) {
            var x = Math.floor(Math.random() * this.canvas.width),
                y = Math.floor(Math.random() * this.canvas.height),
                size = Math.floor(100 * Math.random()) % this.settings.size + 2,
                speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * size / 10 + .5,
                windPower = this.settings.windPower
            this.items.push({
                speed: speed,
                velY: speed,
                velX: windPower,
                x: x,
                y: y,
                size: size,
                stepSize: Math.random() / 30,
                step: 0
            })
        }

        this.snow();
    }
    //雪花运动相关  
    Snow.prototype.snow = function () {
        var thiz = this,
            render = function () {
                thiz.ctx.clearRect(0, 0, thiz.canvas.width, thiz.canvas.height);
                for (var i = 0; i < thiz.itemCount; i++) {
                    var item = thiz.items[i];
                    item.y += item.velY,
                        item.x += item.velX,
                        (item.y >= thiz.canvas.height || item.y <= 0) && thiz.resetItem(item),
                        (item.x >= thiz.canvas.width || item.x <= 0) && thiz.resetItem(item)
                    var grd = thiz.ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, item.size - 1);
                    grd.addColorStop(0, thiz.settings.startColor),
                        grd.addColorStop(1, thiz.settings.endColor),
                        thiz.ctx.fillStyle = grd, thiz.ctx.beginPath(),
                        thiz.ctx.arc(item.x, item.y, item.size, 0, 2 * Math.PI),
                        thiz.ctx.fill()
                }
                window.cancelAnimationFrame(render)
                window.requestAnimationFrame(render)
            };
        render()
    }
    //重置单个雪花  
    Snow.prototype.resetItem = function (item) {
        item.x = Math.floor(Math.random() * this.canvas.width),
            item.y = 0,
            item.size = Math.floor(100 * Math.random()) % this.settings.size + 2,
            item.speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * item.size / 10 + .5,
            item.velY = item.speed,
            item.velX = item.velX
    };

    //初始化雪花对象  
    $.fn.snow = function () {
        $(this).each(function (i, e) {
            var scope = {};
            $.each(e.attributes, function (index, key) {
                scope[$.camelCase(key.name)] = Number(Number(key.value)) ? Number(key.value) : key.value
            });

            new Snow($(e), {
                speed: scope.speed || 0.1,
                size: scope.size || 2,
                count: scope.count || 20,
                startColor: "#fff",
                endColor: "rgba(255, 255, 255, .3)",
                windPower: scope.windPower || 0
            });
        });
    };

    $(".xf_canvas").snow();
})(jQuery);