export default {
    methods: {
        getPortrait(uid){
            if(uid == 0){
                return "";
            }
            var picPath = "//i6.3conline.com/images/upload/upc/face/";
            for(var i=0,s=(uid+"").length;i<s;i++){
                var k = (i+2)<=s?(i+2):(i+1);
                picPath += (uid+"").substring(i, k) +"/";
                i++;
            }
            return picPath+uid+"_150x150";
        }
    },
}