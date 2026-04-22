"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.html2Pdf = exports.Html2Pdf = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
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
        this._browser = await puppeteer_1.default.launch({
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
            headless: true,
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
            await $page.emulateMediaType("screen");
            await $page.setContent(html, { waitUntil: "load" });
            return await $page.pdf(this._options);
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