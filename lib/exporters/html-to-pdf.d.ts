/// <reference types="node" />
import { PdfBrowser, PdfOptions } from "./types.js";
export declare class Html2Pdf {
    private _browser;
    private _externalBrowser;
    private _options;
    constructor(options?: PdfOptions, browser?: PdfBrowser);
    _initBrowser(): Promise<void>;
    createPdf(html: string): Promise<Buffer>;
    release(): Promise<void>;
}
export declare function launchSharedBrowser(): Promise<PdfBrowser>;
export declare function html2Pdf(html: string): void;
