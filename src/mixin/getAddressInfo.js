import { getScript } from "@utils"
export default {
    methods: {
        citychoose(cb) {
            
            //选择城市
            if (document.querySelector("#a1b1") && !window.citychooseObj1) {
                var that = this;
                getScript(
                "//js.3conline.com/pcautonew2/wap/common/js/xchoose3.2.js",
                () => {
                    
                    let iframe = null;
                    setTimeout(function() {
                    if (document.getElementsByTagName("iframe").length > 0) {
                        iframe = document.getElementsByTagName("iframe")[0];
                    }
                    }, 800);
                    window.citychooseObj1 = new xchoose({
                    id: "a1b1",
                    dw: '2',
                    location: true,
                    locationBack: function(data) {
                        if (typeof cb == 'function') {
                            cb(data)
                        }
                    },
                    area: {
                        show: true,
                        cookie: true,
                        callback: function(data) {
                            if (typeof cb == 'function') {
                                cb(data)
                            }

                            let iframe = document.getElementsByTagName("iframe")[0];
                            if (iframe) {
                                iframe.style.display = "block";
                            }
                        }
                    },
                    openBack: function() {
                        if (iframe) {
                            iframe.style.display = "none";
                        }
                    },
                    closeBack: function() {
                        if (iframe) {
                            iframe.style.display = "block";
                        }
                    }
                    });
                });
            }
        }
    }
}