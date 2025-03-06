// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Modal from 'antd/lib/modal';
import { LoadingOutlined } from '@ant-design/icons';
import { exportActions } from 'actions/export-actions';
import { deleteJobAsync } from 'actions/jobs-actions';
import { importActions } from 'actions/import-actions';
import { Job, JobType } from 'cvat-core-wrapper';
import Menu, { MenuInfo } from 'components/dropdown-menu';
import { mergeConsensusJobsAsync } from 'actions/consensus-actions';
import { CombinedState } from 'reducers';
import { makeKey } from 'reducers/consensus-reducer';

interface Props {
    job: Job;
    consensusJobsPresent?: boolean;
}

export enum Actions {
    TASK = 'task',
    PROJECT = 'project',
    BUG_TRACKER = 'bug_tracker',
    IMPORT_JOB = 'import_job',
    EXPORT_JOB = 'export_job',
    VIEW_ANALYTICS = 'view_analytics',
    MERGE_SPECIFIC_CONSENSUS_JOBS = 'merge_specific_consensus_jobs',
    DELETE = 'delete',
}

function JobActionsMenu(props: Props): JSX.Element {
    const { job, consensusJobsPresent } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const onClickMenu = useCallback(
        (action: MenuInfo) => {
            if (action.key === Actions.TASK) {
                history.push(`/tasks/${job.taskId}`);
            } else if (action.key === Actions.PROJECT) {
                history.push(`/projects/${job.projectId}`);
            } else if (action.key === Actions.BUG_TRACKER) {
                if (job.bugTracker) {
                    window.open(job.bugTracker, '_blank', 'noopener noreferrer');
                }
            } else if (action.key === Actions.IMPORT_JOB) {
                dispatch(importActions.openImportDatasetModal(job));
            } else if (action.key === Actions.EXPORT_JOB) {
                dispatch(exportActions.openExportDatasetModal(job));
            } else if (action.key === Actions.VIEW_ANALYTICS) {
                history.push(`/tasks/${job.taskId}/jobs/${job.id}/analytics`);
            } else if (action.key === Actions.MERGE_SPECIFIC_CONSENSUS_JOBS) {
                Modal.confirm({
                    title: '共同作业将被合并',
                    content: '父作业中的现有标注将被更新。继续？',
                    className: 'cvat-modal-confirm-consensus-merge-job',
                    onOk: () => {
                        dispatch(mergeConsensusJobsAsync(job));
                    },
                    okButtonProps: {
                        type: 'primary',
                        danger: true,
                    },
                    okText: 'Merge',
                });
            } else if (action.key === Actions.DELETE) {
                Modal.confirm({
                    title: `作业 ${job.id} 将被删除`,
                    content: `所有相关数据 (标注) 都会丢失.继续?`,
                    className: 'cvat-modal-confirm-delete-job',
                    onOk: () => {
                        dispatch(deleteJobAsync(job));
                    },
                    okButtonProps: {
                        type: 'primary',
                        danger: true,
                    },
                    okText: '删除',
                    cancelText: '取消',
                });
            }
        },
        [job],
    );

    const mergingConsensus = useSelector((state: CombinedState) => state.consensus.actions.merging);
    const isInMergingConsensus = mergingConsensus[makeKey(job)];

    return (
        <Menu
            className='cvat-job-item-menu'
            onClick={onClickMenu}
        >
            <Menu.Item key={Actions.TASK} disabled={job.taskId === null}>前往任务</Menu.Item>
            <Menu.Item key={Actions.PROJECT} disabled={job.projectId === null}>前往项目</Menu.Item>
            <Menu.Item key={Actions.BUG_TRACKER} disabled={!job.bugTracker}>前往问题追踪</Menu.Item>
            <Menu.Item key={Actions.IMPORT_JOB}>导入标注</Menu.Item>
            <Menu.Item key={Actions.EXPORT_JOB}>导出标注</Menu.Item>
            <Menu.Item key={Actions.VIEW_ANALYTICS}>查看分析</Menu.Item>
            {consensusJobsPresent && job.parentJobId === null && (
                <Menu.Item
                    key={Actions.MERGE_SPECIFIC_CONSENSUS_JOBS}
                    disabled={isInMergingConsensus}
                    icon={isInMergingConsensus && <LoadingOutlined />}
                >
                    合并共同作业
                </Menu.Item>
            )}
            <Menu.Divider />
            <Menu.Item
                key={Actions.DELETE}
                disabled={job.type !== JobType.GROUND_TRUTH}
            >
                删除
            </Menu.Item>
        </Menu>
    );
}

JobActionsMenu.defaultProps = {
    consensusJobsPresent: false,
};

export default React.memo(JobActionsMenu);
