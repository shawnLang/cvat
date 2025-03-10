// Copyright (C) 2021-2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

const validationPatterns = {
    validatePasswordLength: {
        pattern: /(?=.{8,})/,
        message: '密码必须至少包含 8 个字符',
    },

    passwordContainsNumericCharacters: {
        pattern: /(?=.*[0-9])/,
        message: '密码必须至少包含 1 个数字',
    },

    passwordContainsUpperCaseCharacter: {
        pattern: /(?=.*[A-Z])/,
        message: '密码必须至少包含 1 个大写字母',
    },

    passwordContainsLowerCaseCharacter: {
        pattern: /(?=.*[a-z])/,
        message: '密码必须至少包含 1 个小写字母',
    },

    validateUsernameLength: {
        pattern: /(?=.{2,})/,
        message: '用户名必须至少包含 2 个字符',
    },

    validateUsernameCharacters: {
        pattern: /^[a-zA-Z0-9_\-.\u4e00-\u9fa5]{2,}$/,
        message: '仅限字符 (a-z), (A-Z), (0-9), -, _, . 和中文字符可用',
    },

    /*
        \p{Pd} - dash connectors
        \p{Pc} - connector punctuations
        \p{Cf} - invisible formatting indicator
        \p{L} - any alphabetic character
        Useful links:
        https://stackoverflow.com/questions/4323386/multi-language-input-validation-with-utf-8-encoding
        https://stackoverflow.com/questions/280712/javascript-unicode-regexes
        https://stackoverflow.com/questions/6377407/how-to-validate-both-chinese-unicode-and-english-name
    */
    validateName: {
        // eslint-disable-next-line
        pattern: /\S+/,
        message: '名称无效',
    },

    validateAttributeName: {
        pattern: /\S+/,
        message: '名称无效',
    },

    validateLabelName: {
        pattern: /\S+/,
        message: '名称无效',
    },

    validateAttributeValue: {
        pattern: /\S+/,
        message: '属性值无效',
    },

    validateURL: {
        // eslint-disable-next-line
        pattern: /^(https?:\/\/)[^\s$.?#].[^\s]*$/, // url, ip
        message: 'URL 无效',
    },

    validateOrganizationSlug: {
        pattern: /^[a-zA-Z\d]+$/,
        message: '只允许使用拉丁字符和数字',
    },

    validatePhoneNumber: {
        pattern: /^[+]*[-\s0-9]*$/g,
        message: '输入的电话号码不正确',
    },
};

export default validationPatterns;
