// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons/lib/icons';
import Text from 'antd/lib/typography/Text';
import InputNumber from 'antd/lib/input-number';
import { Col, Row } from 'antd/lib/grid';
import Divider from 'antd/lib/divider';
import Form, { FormInstance } from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import CVATTooltip from 'components/common/cvat-tooltip';
import { QualitySettings, TargetMetric } from 'cvat-core-wrapper';
import { PointSizeBase } from 'cvat-core/src/quality-settings';

interface Props {
    form: FormInstance;
    settings: QualitySettings;
    onSave: () => void;
}

export default function QualitySettingsForm(props: Readonly<Props>): JSX.Element | null {
    const { form, settings, onSave } = props;

    const initialValues = {
        targetMetric: settings.targetMetric,
        targetMetricThreshold: settings.targetMetricThreshold * 100,

        maxValidationsPerJob: settings.maxValidationsPerJob,

        lowOverlapThreshold: settings.lowOverlapThreshold * 100,
        iouThreshold: settings.iouThreshold * 100,
        compareAttributes: settings.compareAttributes,
        emptyIsAnnotated: settings.emptyIsAnnotated,

        oksSigma: settings.oksSigma * 100,
        pointSizeBase: settings.pointSizeBase,

        lineThickness: settings.lineThickness * 100,
        lineOrientationThreshold: settings.lineOrientationThreshold * 100,
        orientedLines: settings.orientedLines,

        compareGroups: settings.compareGroups,
        groupMatchThreshold: settings.groupMatchThreshold * 100,

        checkCoveredAnnotations: settings.checkCoveredAnnotations,
        objectVisibilityThreshold: settings.objectVisibilityThreshold * 100,
        panopticComparison: settings.panopticComparison,
    };

    const targetMetricDescription = `${settings.descriptions.targetMetric
        .replaceAll(/\* [a-z` -]+[A-Z]+/g, '')
        .replaceAll(/\n/g, '')
    }`;

    const pointSizeBaseDescription = `${settings.descriptions.pointSizeBase
        .substring(0, settings.descriptions.pointSizeBase.indexOf('\n\n\n'))
        .replaceAll(/\n/g, ' ')
    }`;

    const makeTooltipFragment = (metric: string, description: string): JSX.Element => (
        <div>
            <Text strong>{`${metric}:`}</Text>
            <Text>
                {description}
            </Text>
        </div>
    );

    const makeTooltip = (jsx: JSX.Element): JSX.Element => (
        <div className='cvat-analytics-settings-tooltip-inner'>
            {jsx}
        </div>
    );

    const generalTooltip = makeTooltip(
        <>
            {makeTooltipFragment('目标量度', targetMetricDescription)}
            {makeTooltipFragment('Target metric threshold', settings.descriptions.targetMetricThreshold)}
            {makeTooltipFragment('Compare attributes', settings.descriptions.compareAttributes)}
            {makeTooltipFragment('Empty frames are annotated', settings.descriptions.emptyIsAnnotated)}
        </>,
    );

    const jobValidationTooltip = makeTooltip(
        makeTooltipFragment('Max validations per job', settings.descriptions.maxValidationsPerJob),
    );

    const shapeComparisonTooltip = makeTooltip(
        <>
            {makeTooltipFragment('Min overlap threshold (IoU)', settings.descriptions.iouThreshold)}
            {makeTooltipFragment('Low overlap threshold', settings.descriptions.lowOverlapThreshold)}
        </>,
    );

    const keypointTooltip = makeTooltip(
        makeTooltipFragment('Object Keypoint Similarity (OKS)', settings.descriptions.oksSigma),
    );

    const pointTooltip = makeTooltip(
        makeTooltipFragment('Point size base', pointSizeBaseDescription),
    );

    const linesTooltip = makeTooltip(
        <>
            {makeTooltipFragment('Line thickness', settings.descriptions.lineThickness)}
            {makeTooltipFragment('Check orientation', settings.descriptions.compareLineOrientation)}
            {makeTooltipFragment('Min similarity gain', settings.descriptions.lineOrientationThreshold)}
        </>,
    );

    const groupTooltip = makeTooltip(
        <>
            {makeTooltipFragment('Compare groups', settings.descriptions.compareGroups)}
            {makeTooltipFragment('Min group match threshold', settings.descriptions.groupMatchThreshold)}
        </>,
    );

    const segmentationTooltip = makeTooltip(
        <>
            {makeTooltipFragment('Check object visibility', settings.descriptions.checkCoveredAnnotations)}
            {makeTooltipFragment('Min visibility threshold', settings.descriptions.objectVisibilityThreshold)}
            {makeTooltipFragment('Match only visible parts', settings.descriptions.panopticComparison)}
        </>,
    );

    return (
        <Form
            form={form}
            layout='vertical'
            className='cvat-quality-settings-form'
            initialValues={initialValues}
        >
            <Row justify='end' className='cvat-quality-settings-save-btn'>
                <Col>
                    <Button onClick={onSave} type='primary'>
                        保存
                    </Button>
                </Col>
            </Row>
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    一般
                </Text>
                <CVATTooltip title={generalTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='targetMetric'
                        label='目标指标'
                        rules={[{ required: true }]}
                    >
                        <Select
                            style={{ width: '70%' }}
                            virtual={false}
                        >
                            <Select.Option value={TargetMetric.ACCURACY}>
                                准确性
                            </Select.Option>
                            <Select.Option value={TargetMetric.PRECISION}>
                                精度
                            </Select.Option>
                            <Select.Option value={TargetMetric.RECALL}>
                                召回
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='targetMetricThreshold'
                        label='目标度量阈值'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='compareAttributes'
                        valuePropName='checked'
                        rules={[{ required: true }]}
                    >
                        <Checkbox>
                            <Text className='cvat-text-color'>比较属性</Text>
                        </Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='emptyIsAnnotated'
                        valuePropName='checked'
                        rules={[{ required: true }]}
                    >
                        <Checkbox>
                            <Text className='cvat-text-color'>空帧被注释</Text>
                        </Checkbox>
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    作业验证
                </Text>
                <CVATTooltip title={jobValidationTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='maxValidationsPerJob'
                        label='每个作业的最大验证数'
                        rules={[{ required: true }]}
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            precision={0}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    形状比较
                </Text>
                <CVATTooltip title={shapeComparisonTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='iouThreshold'
                        label='最小重叠阈值 (%)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='lowOverlapThreshold'
                        label='低重叠阈值 (%)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    关键点比较
                </Text>
                <CVATTooltip title={keypointTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='oksSigma'
                        label='OKS sigma (bbox side %)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    点比较
                </Text>
                <CVATTooltip title={pointTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='pointSizeBase'
                        label='点大小基数'
                        rules={[{ required: true }]}
                    >
                        <Select
                            style={{ width: '70%' }}
                            virtual={false}
                        >
                            <Select.Option value={PointSizeBase.IMAGE_SIZE}>
                                图像大小
                            </Select.Option>
                            <Select.Option value={PointSizeBase.GROUP_BBOX_SIZE}>
                                Group bbox 大小
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    线比较
                </Text>
                <CVATTooltip title={linesTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='lineThickness'
                        label='相对厚度 (frame side %)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={1000} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='orientedLines'
                        rules={[{ required: true }]}
                        valuePropName='checked'
                    >
                        <Checkbox>
                            <Text className='cvat-text-color'>检查方向</Text>
                        </Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='lineOrientationThreshold'
                        label='最小相似度增益 (%)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    组比较
                </Text>
                <CVATTooltip title={groupTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='compareGroups'
                        valuePropName='checked'
                        rules={[{ required: true }]}
                    >
                        <Checkbox>
                            <Text className='cvat-text-color'>比较组</Text>
                        </Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='groupMatchThreshold'
                        label='最小组匹配阈值 (%)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Row className='cvat-quality-settings-title'>
                <Text strong>
                    细分比较
                </Text>
                <CVATTooltip title={segmentationTooltip} className='cvat-analytics-tooltip' overlayStyle={{ maxWidth: '500px' }}>
                    <QuestionCircleOutlined
                        style={{ opacity: 0.5 }}
                    />
                </CVATTooltip>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='checkCoveredAnnotations'
                        valuePropName='checked'
                        rules={[{ required: true }]}
                    >
                        <Checkbox>
                            <Text className='cvat-text-color'>检查对象可见性</Text>
                        </Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='objectVisibilityThreshold'
                        label='最小可见性阈值 (面积 %)'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={100} precision={0} />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='panopticComparison'
                        valuePropName='checked'
                        rules={[{ required: true }]}
                    >
                        <Checkbox>
                            <Text className='cvat-text-color'>仅匹配可见部分</Text>
                        </Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
