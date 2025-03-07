// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import { AnyAction } from 'redux';

import { ServerError, RequestError, StorageLocation } from 'cvat-core-wrapper';
import { AuthActionTypes } from 'actions/auth-actions';
import { FormatsActionTypes } from 'actions/formats-actions';
import { ModelsActionTypes } from 'actions/models-actions';
import { TasksActionTypes } from 'actions/tasks-actions';
import { ProjectsActionTypes } from 'actions/projects-actions';
import { AboutActionTypes } from 'actions/about-actions';
import { AnnotationActionTypes } from 'actions/annotation-actions';
import { NotificationsActionType } from 'actions/notification-actions';
import { BoundariesActionTypes } from 'actions/boundaries-actions';
import { UserAgreementsActionTypes } from 'actions/useragreements-actions';
import { ReviewActionTypes } from 'actions/review-actions';
import { CloudStorageActionTypes } from 'actions/cloud-storage-actions';
import { OrganizationActionsTypes } from 'actions/organization-actions';
import { JobsActionTypes } from 'actions/jobs-actions';
import { WebhooksActionsTypes } from 'actions/webhooks-actions';
import { InvitationsActionTypes } from 'actions/invitations-actions';
import { ServerAPIActionTypes } from 'actions/server-actions';
import { RequestsActionsTypes } from 'actions/requests-actions';
import { ImportActionTypes } from 'actions/import-actions';
import { ExportActionTypes } from 'actions/export-actions';
import { ConsensusActionTypes } from 'actions/consensus-actions';
import { getInstanceType } from 'actions/common';

import config from 'config';
import { NotificationsState } from '.';

const shouldLog = (error: Error): boolean => {
    if (error instanceof ServerError) {
        const ignoredCodes = [0, 400, 401, 403, 404, 429, 500];
        return !ignoredCodes.includes(error.code);
    }

    return !(error instanceof RequestError);
};

const defaultState: NotificationsState = {
    errors: {
        auth: {
            authenticated: null,
            login: null,
            logout: null,
            register: null,
            changePassword: null,
            requestPasswordReset: null,
            resetPassword: null,
        },
        serverAPI: {
            fetching: null,
        },
        projects: {
            fetching: null,
            updating: null,
            deleting: null,
            creating: null,
            restoring: null,
            backuping: null,
        },
        tasks: {
            fetching: null,
            updating: null,
            dumping: null,
            loading: null,
            exportingAsDataset: null,
            deleting: null,
            creating: null,
            exporting: null,
            importing: null,
            moving: null,
            mergingConsensus: null,
        },
        jobs: {
            updating: null,
            fetching: null,
            creating: null,
            deleting: null,
        },
        formats: {
            fetching: null,
        },
        users: {
            fetching: null,
        },
        about: {
            fetching: null,
        },
        models: {
            starting: null,
            fetching: null,
            canceling: null,
            metaFetching: null,
            inferenceStatusFetching: null,
            creating: null,
            deleting: null,
        },
        annotation: {
            saving: null,
            jobFetching: null,
            jobUpdating: null,
            frameFetching: null,
            changingLabelColor: null,
            updating: null,
            creating: null,
            merging: null,
            grouping: null,
            joining: null,
            slicing: null,
            splitting: null,
            removing: null,
            propagating: null,
            collectingStatistics: null,
            savingJob: null,
            uploadAnnotations: null,
            removeAnnotations: null,
            fetchingAnnotations: null,
            undo: null,
            redo: null,
            search: null,
            deleteFrame: null,
            restoreFrame: null,
            savingLogs: null,
            canvas: null,
        },
        boundaries: {
            resetError: null,
        },
        userAgreements: {
            fetching: null,
        },
        review: {
            commentingIssue: null,
            finishingIssue: null,
            reopeningIssue: null,
            resolvingIssue: null,
            submittingReview: null,
            deletingIssue: null,
        },
        exporting: {
            dataset: null,
            annotation: null,
            backup: null,
        },
        importing: {
            dataset: null,
            annotation: null,
            backup: null,
        },
        cloudStorages: {
            creating: null,
            fetching: null,
            updating: null,
            deleting: null,
        },
        organizations: {
            fetching: null,
            creating: null,
            updating: null,
            activation: null,
            deleting: null,
            leaving: null,
            inviting: null,
            updatingMembership: null,
            removingMembership: null,
            deletingInvitation: null,
        },
        webhooks: {
            fetching: null,
            creating: null,
            updating: null,
            deleting: null,
        },
        analytics: {
            fetching: null,
            fetchingSettings: null,
            updatingSettings: null,
        },
        invitations: {
            fetching: null,
            acceptingInvitation: null,
            decliningInvitation: null,
            resendingInvitation: null,
        },
        requests: {
            fetching: null,
            canceling: null,
            deleting: null,
        },
    },
    messages: {
        tasks: {
            loadingDone: null,
            importingDone: null,
            movingDone: null,
            mergingConsensusDone: null,
        },
        models: {
            inferenceDone: null,
        },
        auth: {
            changePasswordDone: null,
            registerDone: null,
            requestPasswordResetDone: null,
            resetPasswordDone: null,
        },
        projects: {
            restoringDone: null,
        },
        exporting: {
            dataset: null,
            annotation: null,
            backup: null,
        },
        importing: {
            dataset: null,
            annotation: null,
            backup: null,
        },
        invitations: {
            newInvitations: null,
            acceptInvitationDone: null,
            declineInvitationDone: null,
            resendingInvitation: null,
        },
    },
};

export default function (state = defaultState, action: AnyAction): NotificationsState {
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATED_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        authenticated: {
                            message: '无法在服务器上检查身份验证',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        login: {
                            message: '无法登录服务器',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-login-failed',
                        },
                    },
                },
            };
        }
        case AuthActionTypes.LOGOUT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        logout: {
                            message: '无法从服务器注销',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REGISTER_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        register: {
                            message: '无法在服务器上注册',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REGISTER_SUCCESS: {
            if (!action.payload.user.isVerified) {
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        auth: {
                            ...state.messages.auth,
                            registerDone: {
                                message: `要使用您的帐户，您需要确认邮件地址. \
                                我们已经发送了一封电子邮件，其中有一个确认链接到 ${action.payload.user.email}.`,
                            },
                        },
                    },
                };
            }

            return {
                ...state,
            };
        }
        case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    auth: {
                        ...state.messages.auth,
                        changePasswordDone: {
                            message: '已保存新密码.',
                        },
                    },
                },
            };
        }
        case AuthActionTypes.CHANGE_PASSWORD_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        changePassword: {
                            message: '无法更改密码',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-change-password-failed',
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REQUEST_PASSWORD_RESET_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    auth: {
                        ...state.messages.auth,
                        requestPasswordResetDone: {
                            message: `检查您的邮件链接重置您的密码.
                            如果它在几分钟内没有出现,请检查您的垃圾邮件文件夹.`,
                        },
                    },
                },
            };
        }
        case AuthActionTypes.REQUEST_PASSWORD_RESET_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        requestPasswordReset: {
                            message: '无法在服务器上重置密码.',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    auth: {
                        ...state.messages.auth,
                        resetPasswordDone: {
                            message: '已使用新密码重置密码.',
                        },
                    },
                },
            };
        }
        case AuthActionTypes.RESET_PASSWORD_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    auth: {
                        ...state.errors.auth,
                        resetPassword: {
                            message: '无法在服务器上设置新密码.',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ServerAPIActionTypes.GET_SERVER_API_SCHEMA_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    serverAPI: {
                        ...state.errors.serverAPI,
                        fetching: {
                            message: '无法接收服务器schema',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case InvitationsActionTypes.GET_INVITATIONS_SUCCESS: {
            if (action.payload.showNotification) {
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        invitations: {
                            ...state.messages.invitations,
                            newInvitations: {
                                message: '您收到了加入某个组织的邀请! [点击这里](/invitations) 了解详情.',
                            },
                        },
                    },
                };
            }
            return state;
        }
        case InvitationsActionTypes.GET_INVITATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    invitations: {
                        ...state.errors.invitations,
                        fetching: {
                            message: '没有收到邀请',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-get-invitations-failed',
                        },
                    },
                },
            };
        }
        case InvitationsActionTypes.ACCEPT_INVITATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    invitations: {
                        ...state.errors.invitations,
                        acceptingInvitation: {
                            message: '无法接受邀请',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-accept-organization-invitation-failed',
                        },
                    },
                },
            };
        }
        case InvitationsActionTypes.DECLINE_INVITATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    invitations: {
                        ...state.errors.invitations,
                        decliningInvitation: {
                            message: '不能拒绝邀请',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-decline-organization-invitation-failed',
                        },
                    },
                },
            };
        }
        case InvitationsActionTypes.RESEND_INVITATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    invitations: {
                        ...state.errors.invitations,
                        resendingInvitation: {
                            message: '不能重新发送邀请',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-resend-organization-invitation-failed',
                        },
                    },
                },
            };
        }
        case InvitationsActionTypes.RESEND_INVITATION_SUCCESS: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    invitations: {
                        ...state.messages.invitations,
                        resendingInvitation: {
                            message: '邀请函发送成功',
                        },
                    },
                },
            };
        }
        case ExportActionTypes.EXPORT_DATASET_FAILED: {
            const { instance, instanceType } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    exporting: {
                        ...state.errors.exporting,
                        dataset: {
                            message:
                                '无法导出数据集 ' +
                                `[${instanceType} ${instance.id}](/${instanceType}s/${instance.id})`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ExportActionTypes.EXPORT_DATASET_SUCCESS: {
            const {
                instance, instanceType, resource, target,
            } = action.payload;
            let description = `导出 ${resource} 从 ${instanceType} ${instance.id} 完成. `;
            if (target === StorageLocation.LOCAL) {
                description += '你可以 [在此下载](/requests).';
            } else if (target === StorageLocation.CLOUD_STORAGE) {
                description =
                    `导出 ${resource} 从 ${instanceType} ${instance.id} 已上传到云存储.`;
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    exporting: {
                        ...state.messages.exporting,
                        dataset: {
                            message: '导出完成',
                            duration: config.REQUEST_SUCCESS_NOTIFICATION_DURATION,
                            description,
                        },
                    },
                },
            };
        }
        case ExportActionTypes.EXPORT_BACKUP_FAILED: {
            const { instance, instanceType } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    exporting: {
                        ...state.errors.exporting,
                        backup: {
                            message:
                                `无法导出 ${instanceType} №${instance.id}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ExportActionTypes.EXPORT_BACKUP_SUCCESS: {
            const {
                instance, instanceType, target,
            } = action.payload;
            let description = `备份从 ${instanceType} ${instance.id} 完成. `;
            if (target === StorageLocation.LOCAL) {
                description += '你可以 [在此下载](/requests).';
            } else if (target === StorageLocation.CLOUD_STORAGE) {
                description =
                    `备份从 ${instanceType} ${instance.id} 已上传到云存储.`;
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    exporting: {
                        ...state.messages.exporting,
                        backup: {
                            message: '备份导出完成',
                            duration: config.REQUEST_SUCCESS_NOTIFICATION_DURATION,
                            description,
                        },
                    },
                },
            };
        }
        case ImportActionTypes.IMPORT_DATASET_SUCCESS: {
            const { instance, resource } = action.payload;
            let description = resource === 'annotation' ?
                '标注已加载到 ' :
                '数据集已导入到 ';
            const instanceType = getInstanceType(instance);
            if (instanceType === 'project') {
                description += `[项目 ${instance.id}](/projects/${instance.id})`;
            } else if (instanceType === 'task') {
                description += `[任务 ${instance.id}](/tasks/${instance.id})`;
            } else {
                description += `[作业 ${instance.id}](/jobs/${instance.id})`;
            }

            return {
                ...state,
                messages: {
                    ...state.messages,
                    importing: {
                        ...state.messages.importing,
                        [resource]: {
                            message: '标注导入完成',
                            duration: config.REQUEST_SUCCESS_NOTIFICATION_DURATION,
                            description,
                        },
                    },
                },
            };
        }
        case ImportActionTypes.IMPORT_DATASET_FAILED: {
            const { instance, resource } = action.payload;
            const message = resource === 'annotation' ?
                '无法上传标注 ' +
                `[任务 ${instance?.taskId || instance.id}](/tasks/${instance?.taskId || instance.id})` :
                `无法导入数据集到 [项目 ${instance.id}](/projects/${instance.id})`;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    importing: {
                        ...state.errors.importing,
                        dataset: {
                            message,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-' +
                                `${resource === 'annotation' ? 'load-annotation' : 'import-dataset'}-failed`,
                        },
                    },
                },
            };
        }
        case ImportActionTypes.IMPORT_BACKUP_SUCCESS: {
            const { instanceId, instanceType } = action.payload;
            const description = `已成功恢复 ${instanceType}.
                点击 [这里](/${instanceType}s/${instanceId}) 打开`;
            return {
                ...state,
                messages: {
                    ...state.messages,
                    importing: {
                        ...state.messages.importing,
                        backup: {
                            message: '导入备份完成',
                            duration: config.REQUEST_SUCCESS_NOTIFICATION_DURATION,
                            description,
                        },
                    },
                },
            };
        }
        case ImportActionTypes.IMPORT_BACKUP_FAILED: {
            const { instanceType } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    importing: {
                        ...state.errors.importing,
                        backup: {
                            message:
                                `无法恢复 ${instanceType} 备份.`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case TasksActionTypes.GET_TASKS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        fetching: {
                            message: '无法获取任务',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case TasksActionTypes.DELETE_TASK_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        deleting: {
                            message: `无法删除 [任务 ${taskID}](/tasks/${taskID})`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-delete-task-failed',
                        },
                    },
                },
            };
        }
        case ConsensusActionTypes.MERGE_CONSENSUS_JOBS_SUCCESS: {
            const { instance } = action.payload;
            let message = '';
            const instanceType = getInstanceType(instance);
            if (instanceType === 'job') {
                message =
                    `共同 [作业 #${instance.id}](/tasks/${instance.taskId}/jobs/${instance.id}) 已经合并`;
            } else if (instanceType === 'task') {
                message = `共同工作 [任务 #${instance.id}](/tasks/${instance.id}) 已经合并`;
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    tasks: {
                        ...state.messages.tasks,
                        mergingConsensusDone: {
                            message,
                        },
                    },
                },
            };
        }
        case ConsensusActionTypes.MERGE_CONSENSUS_JOBS_FAILED: {
            const { instance } = action.payload;
            let message = '';
            const instanceType = getInstanceType(instance);
            if (instanceType === 'job') {
                message =
                    `无法合并 [作业 #${instance.id}](/tasks/${instance.taskId}/jobs/${instance.id})`;
            } else if (instanceType === 'task') {
                message = `无法合并 [任务 ${instance.id}](/tasks/${instance.id})`;
            }
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        mergingConsensus: {
                            message,
                            reason: action.payload.error,
                            shouldLog: !(action.payload.error instanceof ServerError),
                            className: 'cvat-notification-notice-consensus-merge-task-failed',
                        },
                    },
                },
            };
        }
        case TasksActionTypes.CREATE_TASK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    tasks: {
                        ...state.errors.tasks,
                        creating: {
                            message: '无法创建任务',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-create-task-failed',
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.GET_PROJECTS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        fetching: {
                            message: '无法获取项目',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.CREATE_PROJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        creating: {
                            message: '无法创建项目',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-create-project-failed',
                        },
                    },
                },
            };
        }
        case ProjectsActionTypes.DELETE_PROJECT_FAILED: {
            const { projectId } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    projects: {
                        ...state.errors.projects,
                        updating: {
                            message: `无法删除 [项目 ${projectId}](/project/${projectId})`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-delete-project-failed',
                        },
                    },
                },
            };
        }
        case FormatsActionTypes.GET_FORMATS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    formats: {
                        ...state.errors.formats,
                        fetching: {
                            message: '无法从服务器获取格式',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AboutActionTypes.GET_ABOUT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    about: {
                        ...state.errors.about,
                        fetching: {
                            message: '无法获取有关服务器的信息',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.GET_INFERENCE_STATUS_SUCCESS: {
            if (action.payload.activeInference.status === 'finished') {
                const { taskID } = action.payload;
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        models: {
                            ...state.messages.models,
                            inferenceDone: {
                                message: '自动标注任务完成 ' +
                                `[任务 ${taskID}](/tasks/${taskID})`,
                            },
                        },
                    },
                };
            }

            return {
                ...state,
            };
        }
        case ModelsActionTypes.FETCH_META_FAILED: {
            if (action.payload.error.code === 403) {
                return state;
            }

            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        metaFetching: {
                            message: '无法获取模型元信息',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.GET_INFERENCE_STATUS_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        inferenceStatusFetching: {
                            message: `获取推理状态 [任务 ${taskID}](/tasks/${taskID})`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.GET_MODELS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        fetching: {
                            message: '无法从服务器获取模型',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.START_INFERENCE_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        starting: {
                            message: `模型无法识别 [task ${taskID}](/tasks/${taskID})`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ModelsActionTypes.CANCEL_INFERENCE_FAILED: {
            const { taskID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    models: {
                        ...state.errors.models,
                        canceling: {
                            message: `无法取消模型识别 [task ${taskID}](/tasks/${taskID})`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.GET_JOB_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        jobFetching: {
                            message: '获取作业时出错',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-fetch-job-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.CHANGE_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        frameFetching: {
                            message: `无法接收帧 ${action.payload.number}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SAVE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        saving: {
                            message: '无法保存标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-save-annotations-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UPDATE_CURRENT_JOB_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        saving: {
                            message: '无法更新标注作业',
                            reason: action.payload.error,
                            shouldLog: !(action.payload.error instanceof ServerError),
                            className: 'cvat-notification-notice-update-current-job-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UPDATE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        updating: {
                            message: '无法更新标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-update-annotations-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.CREATE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        creating: {
                            message: '无法创建标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.MERGE_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        merging: {
                            message: '无法合并标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.GROUP_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        grouping: {
                            message: '无法分组标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.JOIN_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        joining: {
                            message: '无法作业标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SLICE_ANNOTATIONS_FAILED:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        slicing: {
                            message: '无法切割对象',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        case AnnotationActionTypes.SPLIT_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        splitting: {
                            message: '无法分割轨道',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.REMOVE_OBJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        removing: {
                            message: '无法删除对象',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-remove-object-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.PROPAGATE_OBJECT_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        propagating: {
                            message: '无法传播对象',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.COLLECT_STATISTICS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        collectingStatistics: {
                            message: '无法收集标注统计信息',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UPLOAD_JOB_ANNOTATIONS_FAILED: {
            const { job, error } = action.payload;

            const {
                id: jobID,
                taskId: taskID,
            } = job;

            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        uploadAnnotations: {
                            message:
                                `无法上传标注 [job ${jobID}](/tasks/${taskID}/jobs/${jobID})`,
                            reason: error.toString(),
                            className: 'cvat-notification-notice-upload-annotations-fail',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.REMOVE_JOB_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        removeAnnotations: {
                            message: '无法删除标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.FETCH_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        fetchingAnnotations: {
                            message: '无法获取标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.REDO_ACTION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        redo: {
                            message: '无法恢复',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.UNDO_ACTION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        undo: {
                            message: '无法撤销',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SEARCH_ANNOTATIONS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        search: {
                            message: '无法执行搜索标注',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.SAVE_LOGS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        savingLogs: {
                            message: '无法将日志发送到服务器',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case BoundariesActionTypes.THROW_RESET_ERROR: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    boundaries: {
                        ...state.errors.annotation,
                        resetError: {
                            message: '无法重置状态',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case UserAgreementsActionTypes.GET_USER_AGREEMENTS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    userAgreements: {
                        ...state.errors.userAgreements,
                        fetching: {
                            message: '无法从服务器获取用户协议',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.FINISH_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        finishingIssue: {
                            message: '无法打开新问题',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.RESOLVE_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        resolvingIssue: {
                            message: '无法解决问题',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.REOPEN_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        reopeningIssue: {
                            message: '无法重新打开问题',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case RequestsActionsTypes.GET_REQUESTS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    requests: {
                        ...state.errors.requests,
                        fetching: {
                            message: '无法从服务器获取请求',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case RequestsActionsTypes.CANCEL_REQUEST_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    requests: {
                        ...state.errors.requests,
                        canceling: {
                            message: '无法取消请求',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case RequestsActionsTypes.DELETE_REQUEST_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    requests: {
                        ...state.errors.requests,
                        deleting: {
                            message: '无法删除请求',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.COMMENT_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        commentingIssue: {
                            message: '无法评论问题',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.SUBMIT_REVIEW_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        submittingReview: {
                            message: `无法提交作业审查 ${action.payload.jobId}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case ReviewActionTypes.REMOVE_ISSUE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    review: {
                        ...state.errors.review,
                        deletingIssue: {
                            message: '无法从服务器中删除问题',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case NotificationsActionType.RESET_ERRORS: {
            return {
                ...state,
                errors: {
                    ...defaultState.errors,
                },
            };
        }
        case NotificationsActionType.RESET_MESSAGES: {
            return {
                ...state,
                messages: {
                    ...defaultState.messages,
                },
            };
        }
        case AnnotationActionTypes.GET_DATA_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        jobFetching: {
                            message: '无法接收图像数据',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-fetch-frame-data-from-the-server-failed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.CANVAS_ERROR_OCCURRED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        canvas: {
                            message: '发生 Canvas 错误',
                            reason: action.payload.error,
                            shouldLog: true,
                            className: 'cvat-notification-notice-canvas-error-occurreed',
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.DELETE_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        deleteFrame: {
                            message: '无法删除帧',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case AnnotationActionTypes.RESTORE_FRAME_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    annotation: {
                        ...state.errors.annotation,
                        restoreFrame: {
                            message: '无法恢复帧',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.GET_CLOUD_STORAGE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: '无法获取云存储',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.CREATE_CLOUD_STORAGE_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        creating: {
                            message: '无法创建云存储',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-create-cloud-storage-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.UPDATE_CLOUD_STORAGE_FAILED: {
            const { cloudStorage, error } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        updating: {
                            message: `无法更新云存储 #${cloudStorage.id}`,
                            reason: error.toString(),
                            className: 'cvat-notification-notice-update-cloud-storage-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.DELETE_CLOUD_STORAGE_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        deleting: {
                            message:
                                `无法删除云存储 ${cloudStorageID}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-delete-cloud-storage-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.LOAD_CLOUD_STORAGE_CONTENT_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: `无法获取云存储的内容 #${cloudStorageID}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-fetch-cloud-storage-content-failed',
                        },
                    },
                },
            };
        }
        case CloudStorageActionTypes.GET_CLOUD_STORAGE_STATUS_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: `无法获取云存储 #${cloudStorageID} 状态`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-fetch-cloud-storage-status-failed',
                        },
                    },
                },
            };
        }

        case CloudStorageActionTypes.GET_CLOUD_STORAGE_PREVIEW_FAILED: {
            const { cloudStorageID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    cloudStorages: {
                        ...state.errors.cloudStorages,
                        fetching: {
                            message: `无法获取云存储的预览 #${cloudStorageID}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-fetch-cloud-storage-preview-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.CREATE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        creating: {
                            message: `无法创建组织 ${action.payload.slug}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-create-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.UPDATE_ORGANIZATION_FAILED: {
            const { slug } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        updating: {
                            message: `无法更新组织 "${slug}"`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-update-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.ACTIVATE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        activation: {
                            message: `无法激活组织 ${action.payload.slug || ''}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-activate-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.REMOVE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        deleting: {
                            message: `无法删除组织 ${action.payload.slug}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-remove-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.INVITE_ORGANIZATION_MEMBERS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        inviting: {
                            message: '无法邀请组织成员',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-invite-organization-members-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.INVITE_ORGANIZATION_MEMBER_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        inviting: {
                            message: `无法邀请此成员 "${action.payload.email}" 到组织`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-invite-organization-member-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.LEAVE_ORGANIZATION_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        leaving: {
                            message: '无法离开组织',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-leave-organization-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.REMOVE_ORGANIZATION_MEMBER_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        removingMembership: {
                            message: `无法从组织中删除成员 "${action.payload.username}"`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-remove-organization-member-failed',
                        },
                    },
                },
            };
        }
        case OrganizationActionsTypes.UPDATE_ORGANIZATION_MEMBER_FAILED: {
            const { role, username } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    organizations: {
                        ...state.errors.organizations,
                        updatingMembership: {
                            message: `无法将角色 "${role}" 分配给用户 "${username}"`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-update-organization-membership-failed',
                        },
                    },
                },
            };
        }
        case JobsActionTypes.GET_JOBS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    jobs: {
                        ...state.errors.jobs,
                        fetching: {
                            message: '无法获取作业列表',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-get-jobs-failed',
                        },
                    },
                },
            };
        }
        case JobsActionTypes.CREATE_JOB_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    jobs: {
                        ...state.errors.jobs,
                        creating: {
                            message: '无法创建作业',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-create-job-failed',
                        },
                    },
                },
            };
        }
        case JobsActionTypes.UPDATE_JOB_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    jobs: {
                        ...state.errors.jobs,
                        updating: {
                            message: '无法更新作业',
                            reason: action.payload.error.toString(),
                            className: 'cvat-notification-notice-update-job-failed',
                        },
                    },
                },
            };
        }
        case JobsActionTypes.DELETE_JOB_FAILED: {
            const { jobID } = action.payload;
            return {
                ...state,
                errors: {
                    ...state.errors,
                    jobs: {
                        ...state.errors.jobs,
                        deleting: {
                            message: `无法删除作业 #${jobID}`,
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-delete-job-failed',
                        },
                    },
                },
            };
        }
        case WebhooksActionsTypes.GET_WEBHOOKS_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    webhooks: {
                        ...state.errors.webhooks,
                        fetching: {
                            message: '无法获取webhooks列表',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-get-webhooks-failed',
                        },
                    },
                },
            };
        }
        case WebhooksActionsTypes.CREATE_WEBHOOK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    webhooks: {
                        ...state.errors.webhooks,
                        creating: {
                            message: '无法创建webhook',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-create-webhook-failed',
                        },
                    },
                },
            };
        }
        case WebhooksActionsTypes.UPDATE_WEBHOOK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    webhooks: {
                        ...state.errors.webhooks,
                        updating: {
                            message: '无法更新webhook',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-update-webhook-failed',
                        },
                    },
                },
            };
        }
        case WebhooksActionsTypes.DELETE_WEBHOOK_FAILED: {
            return {
                ...state,
                errors: {
                    ...state.errors,
                    webhooks: {
                        ...state.errors.webhooks,
                        deleting: {
                            message: '无法删除webhook',
                            reason: action.payload.error,
                            shouldLog: shouldLog(action.payload.error),
                            className: 'cvat-notification-notice-delete-webhook-failed',
                        },
                    },
                },
            };
        }
        case BoundariesActionTypes.RESET_AFTER_ERROR:
        case AuthActionTypes.LOGOUT_SUCCESS: {
            return { ...defaultState };
        }
        default: {
            return state;
        }
    }
}
