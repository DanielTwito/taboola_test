/*class that represent item*/
function Item() {

    /*handle taboola api can be change in the future*/
    Item.prototype.taboola_api_parse = function (json) {
        this.img_url = json["thumbnail"][0]["url"];
        this.title = json["name"];
        this.brand = json["branding"];
        this.img_title = json["categories"] === undefined ? "no category" : json["categories"].join(", ");
        this.refernce_path = json["url"];
    };

    /*return html item to show*/
    /*to support internet explorer comment this function*/
    Item.prototype.create_html_item = function () {
        let heb = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "ב", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
        let align = new RegExp(heb.join("|")).test(this.title) ? "text-align:right" : "text-align:left";
        let card =
            `<div class="cell">
                 <a href="${this.refernce_path}"><img class="thumbnail" src=${this.img_url}> </a>
                 <div class="overlay">${this.img_title}</div>
                 <a class="widget_title" style=${align} href="${this.refernce_path}">${this.title}</a>
                 <footer class="footer"><a href="${this.refernce_path}" class="brand">${this.brand}</a></footer>
              </div>`;
        return card;


    };

    /*return html item to show - support all browsers include internet explorer */
    /*support internet explorer*/

    Item.prototype.create_html_item_include_ie = function () {
        let heb = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "ב", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת"];
        let cell = document.createElement("div");
        let img = document.createElement("img");
        let img_href = document.createElement("a");
        let title = document.createElement("a");
        let brand = document.createElement("a");
        let footer = document.createElement("footer");
        img_href.href = this.refernce_path;
        img.title = this.img_title;
        img_href.appendChild(img);
        cell.classList.add("cell");
        img.classList.add("thumbnail");
        img.src = this.img_url;
        title.classList.add("widget_title");
        /*if hebrew title text align to the right else to the left*/
        let align = new RegExp(heb.join("|")).test(this.title) ? "text-align:right" : "text-align:left";
        title.setAttribute("style", align);
        title.innerText = this.title;
        title.href = this.refernce_path;
        brand.innerText = this.brand;
        brand.href = this.refernce_path;
        cell.appendChild(img_href);
        let img_title = document.createElement("div");
        img_title.innerText = this.img_title;
        img_title.classList.add("overlay");
        cell.appendChild(img_title);
        cell.appendChild(title);
        footer.classList.add("footer");
        footer.appendChild(brand);
        brand.classList.add("brand");
        cell.appendChild(footer);
        return cell;

    }
}
