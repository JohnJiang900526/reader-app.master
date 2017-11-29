$.get("/ajax/index", function(data) {
    var result = JSON.parse(data);
    console.log(result.items);
    var windowWidth = $(window).width();
    if (windowWidth < 320) {
        windowWidth = 320;
    }

    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    new Vue({
        el: "#app",
        data: {
            top: result.items[0].data.data,
            hot: result.items[1].data.data,
            recommend: result.items[2].data.data,
            female: result.items[3].data.data,
            male: result.items[4].data.data,
            free: result.items[5].data.data,
            topic: result.items[6].data.data,
            tab_1_class: true,
            tab_2_class: false,
            animation: {},
            animationContent: {}
        },
        methods: {
            tabSwitch: function(pos) {
                this.animation = {
                    transform: "translate3d(" + offset.width * pos + "px,0px,0px)",
                };
                this.animationContent = {
                    transform: "translate3d(" + -windowWidth * pos + "px,0px,0px)",
                };
                if (pos === 1) {
                    this.tab_1_class = false;
                    this.tab_2_class = true;
                } else if (pos === 0) {
                    this.tab_1_class = true;
                    this.tab_2_class = false;
                }
            }
        }
    });
});