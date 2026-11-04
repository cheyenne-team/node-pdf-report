export interface PdfOptions {
    scale?: number;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    printBackground?: boolean;
    landscape?: boolean;
    pageRanges?: string;
    format?: string;
    width?: string | number;
    height?: string | number;
    preferCSSPageSize?: boolean;
    margin?: {
        top?: string | number;
        bottom?: string | number;
        left?: string | number;
        right?: string | number;
    };
    path?: string;
    omitBackground?: boolean;
    tagged?: boolean;
    timeout?: number;
}
export interface PdfBrowser {
    close(): Promise<void>;
}
