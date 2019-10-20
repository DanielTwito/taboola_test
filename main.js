const num_of_items = 6;
const api_request_url = "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=" + num_of_items + "&placement.name=Below%20Article%20Thumbnails&placemetnt.thumbnail.width=640&placement.thumbnail.height=480&user.session=init";
let data;

/**
 * fill the widget with items
 */
function fill_widget() {
    let box = document.getElementById("box");
    for (let i = 0; i < data.length; i++) {
        let item = new Item();
        item.taboola_api_parse(data[i]);/*extract relevant information from json*/
        //if you want to support internet explorer comment the next 2 line
        let card = item.create_html_item();/*create html item*/
        box.insertAdjacentHTML('beforeend', card);/*add the element to box div*/
        /*
         * to support internet explorer uncomment the next 2 lines and in item.js
         * comment the create_html_item function*/

        // let card_ie = item.create_html_item_include_ie();
        // box.appendChild(card_ie);/*to support internet explorer*/
    }
}

function init() {
    let client = new HttpClient();
    client.get(api_request_url, function (response) {
        data = JSON.parse(response)["list"];
        fill_widget();
    });
}

window.addEventListener("load", init, false);