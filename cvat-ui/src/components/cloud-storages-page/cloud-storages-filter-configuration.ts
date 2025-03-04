// Copyright (C) 2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from '@react-awesome-query-builder/antd';
import asyncFetchUsers from 'components/resource-sorting-filtering/request-users';

export const config: Partial<Config> = {
    fields: {
        id: {
            label: 'ID',
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        provider_type: {
            label: '提供商类型',
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'AWS_S3_BUCKET', title: 'AWS S3' },
                    { value: 'AZURE_CONTAINER', title: 'Azure' },
                    { value: 'GOOGLE_CLOUD_STORAGE', title: 'Google cloud' },
                ],
            },
        },
        credentials_type: {
            label: '凭证类型',
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'KEY_SECRET_KEY_PAIR', title: '密钥&秘钥' },
                    { value: 'ACCOUNT_NAME_TOKEN_PAIR', title: '账号名&令牌' },
                    { value: 'ANONYMOUS_ACCESS', title: '匿名权限' },
                    { value: 'KEY_FILE_PATH', title: '密钥文件' },
                ],
            },
        },
        resource: {
            label: '资源名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        name: {
            label: '名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        description: {
            label: '描述',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        owner: {
            label: '主人',
            type: 'select',
            valueSources: ['value'],
            operators: ['select_equals'],
            fieldSettings: {
                useAsyncSearch: true,
                forceAsyncSearch: true,
                asyncFetch: asyncFetchUsers,
            },
        },
        updated_date: {
            label: '最近更新',
            type: 'datetime',
            operators: ['between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedCloudStoragesFilters';

export const predefinedFilterValues = {
    '归我所有': '{"and":[{"==":[{"var":"owner"},"<username>"]}]}',
    'AWS storages': '{"and":[{"==":[{"var":"provider_type"},"AWS_S3_BUCKET"]}]}',
    'Azure storages': '{"and":[{"==":[{"var":"provider_type"},"AZURE_CONTAINER"]}]}',
    'Google cloud storages': '{"and":[{"==":[{"var":"provider_type"},"GOOGLE_CLOUD_STORAGE"]}]}',
};
