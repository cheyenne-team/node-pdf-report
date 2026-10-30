"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html2Pdf = exports.Html2Pdf = void 0;
var Html2Pdf = /** @class */ (function () {
    function Html2Pdf(options) {
        this._options = options || {
            format: "A4",
            headerTemplate: '<p style="font-size:10px !important; color:#808080; padding-left:10px">Html to pdf</p>',
            footerTemplate: '<p style="font-size:10px !important; color:#808080; padding-left:10px">Luong Phung @2020</p>',
            displayHeaderFooter: true,
            margin: {
                top: "100px",
                bottom: "200px",
                right: "30px",
                left: "30px",
            },
            //   printBackground: true,
            path: "data.pdf",
        };
    }
    Html2Pdf.prototype._initBrowser = async function () {
        const { default: puppeteer } = await import("puppeteer");
        this._browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--single-process",
                "--no-zygote",
                "--disable-extensions",
                "--disable-dev-tools",
                "--no-first-run",
                "--no-default-browser-check",
                "--disable-background-networking",
                "--disable-background-timer-throttling",
                "--disable-breakpad",
                "--disable-domain-reliability",
                "--disable-component-update",
                "--disable-sync",
                "--mute-audio"
            ],
            headless: "shell",
            defaultViewport: null,
        });
    };
    Html2Pdf.prototype.createPdf = async function (html) {
        this._options.path = null;
        if (this._browser == null) {
            await this._initBrowser();
        }
        const $page = await this._browser.newPage();
        try {
            await $page.setJavaScriptEnabled(false);
            await $page.emulateMediaType("screen");
            await $page.setContent(html, { waitUntil: "load" });
            const pdf = await $page.pdf({ tagged: false, ...this._options });
            return Buffer.from(pdf.buffer, pdf.byteOffset, pdf.byteLength);
        } finally {
            await $page.close();
        }
    };
    Html2Pdf.prototype.release = async function () {
        if (this._browser != null) {
            await this._browser.close();
            delete this._browser;
        }
    };
    return Html2Pdf;
}());
exports.Html2Pdf = Html2Pdf;
function html2Pdf(html) { }
exports.html2Pdf = html2Pdf;
//# sourceMappingURL=html-to-pdf.js.map