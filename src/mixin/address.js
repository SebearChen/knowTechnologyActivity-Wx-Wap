import { getScript } from "@utils"
export default {
    data() {
        return {
            city: '',
            cityId: ''
        }
    },
    methods: {
        openCitychoose() {
            window.citychooseObj1.tcOpen();
        },
        citychoose(id="a1b1") {
            //选择城市
            if (document.querySelector(`#${id}`) && !window.citychooseObj1) {
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
                    id: id,
                    dw: '2',
                    location: true,
                    locationBack: function(data) {
                        let cityId = data.cityId,
                            city = data.city;

                        that.cityId = cityId;
                        that.city = city;
                        console.log('---getCity----36---address.js----', cityId, city)
                        that.$EventBus.$emit('getCity', cityId, city)
                    },
                    area: {
                        show: true,
                        cookie: true,
                        callback: function(data) {
                            let cityId = data.cityId,
                                city = data.city;

                            that.cityId = cityId;
                            that.city = city;
                            console.log('---getCity----48---address.js----', cityId, city)
                            that.$EventBus.$emit('getCity', cityId, city)
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
    },
}