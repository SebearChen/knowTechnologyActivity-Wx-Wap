import axios from "axios";

axios.defaults.withCredentials = true

const instance = axios.create({
	baseURL: '',
	timeout: 30000,
	withCredentials: true
});

instance.interceptors.response.use(function(config){
  /* do something */
  return config
})

export default async function(url, data={}, method="") {
  const defaultMethod = {
    OPTIONS: "OPTIONS",
    GET: "GET",
    HEAD: "HEAD",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    TRACE: "TRACE",
    CONNECT: "CONNECT",
  };

  method = defaultMethod[method.toUpperCase()] ? defaultMethod[method.toUpperCase()] : "GET";
  const responseType = data["responseType"] ? data["responseType"] : "json";
  const headers = data["headers"] ? data["headers"] : { 'content-type': 'application/json' };

  data = data["params"] ? data["params"] : data;

  const requestObj = {url, headers, method, responseType};

  if(method == 'PUT' || method == 'POST' || method == 'PATCH') {
    requestObj.data = data;
  }else {
    requestObj.params = data;
  }

  return instance.request(requestObj).then((respone) => {
    return respone.data;
  });
}



