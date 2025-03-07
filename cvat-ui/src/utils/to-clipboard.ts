// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

export function toClipboard(text: string): void {
    const fallback = (): void => {
        // eslint-disable-next-line
        window.prompt('浏览器剪贴板API不允许，请手动复制', text);
    };

    if (window.isSecureContext) {
        window.navigator.clipboard.writeText(text).catch(fallback);
    } else {
        fallback();
    }
}
