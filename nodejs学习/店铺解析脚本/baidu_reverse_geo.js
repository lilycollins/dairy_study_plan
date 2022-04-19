const fs = require('fs')
const shops = require('./origin.json')
const bent = require('bent');
const getJson = bent('json');
const md5 = require('md5');
function get_sn(query_str) {
    let sk = "80n0GvQmGQpKHShgZ0pQgUGPXm88c0BI"
    let str = encodeURI(query_str) + sk
    result = md5(encodeURIComponent(str))
    return result

}
async function getGeo(city, address) {
    let url = "http://api.map.baidu.com"
    let query_str = "/geocoding/v3/?city=" + city + "&address=" + address + "&output=json&ak=vOd1HlnmUUl6ONSbyheWRjP1X83725ox"
    let x = await getJson(url + query_str + "&sn="+get_sn(query_str))
    console.log(x)
    return [x.result.location.lng, x.result.location.lat]
}

async function main() {
    for (var shop of shops) {
        shop.address = shop.address.replace('\n', '')
        ret = await getGeo(shop.city, shop.address)
        console.log(ret)
        shop.longitude = ret[0]
        shop.latitude = ret[1]
        if (shop.shop_type.length > 0) {
            shop.shop_type = parseInt(shop.shop_type)
        }
        if (shop.tel.length > 0) {
            shop.tel = parseInt(shop.tel)
        }
        console.log(shop)
    }
    let data = JSON.stringify(shops, null, 4);
    fs.writeFileSync('./result.json', data);
}


main()
