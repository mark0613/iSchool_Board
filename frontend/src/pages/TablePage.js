import { useState } from 'react';
import {
    Affix,
    Button,
    Col,
    Empty,
    List,
    Modal,
    Row,
    Space,
    Tabs,
    Typography,
} from 'antd';

import { EmptyIcon } from '../components/icons';
import { Spinner } from '../components/spinners';
import { Template } from './Template';

export const TablePage = ({ dataStatus, student, courses, homeworks, save }) => {
    const [showHomeworkDetails, setShowHomeworkDetails] = useState(false);
    const openHomeworkDetailsModal = () => setShowHomeworkDetails(true);
    const closeHomeworkDetailsModal = () => setShowHomeworkDetails(false);

    const content = dataStatus.isEmpty ? (
        <Empty image={<EmptyIcon />} description="" />
    ) : (
        <>
            <Row>
                <Col span={6}>
                    <Button onClick={openHomeworkDetailsModal}>作業</Button>
                    <Modal
                        title={courses.default}
                        open={showHomeworkDetails}
                        footer={null}
                        closable={false}
                        onCancel={closeHomeworkDetailsModal}
                    >
                        <List
                            size="small"
                            itemLayout="horizontal"
                            dataSource={homeworks}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.date}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Modal>
                </Col>
                <Col span={12} style={{ textAlign: 'center' }}>
                    <Space size="large">
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {student.id.toUpperCase()}
                        </Typography.Title>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {student.name}
                        </Typography.Title>
                    </Space>
                </Col>
                <Col span={6}>
                    <Affix offsetTop={64} style={{ position: 'absolute', right: 10 }}>
                        <Button type="primary" loading={save.isSaving} onClick={save.onSave}>儲存</Button>
                    </Affix>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Tabs
                        defaultActiveKey={courses.default}
                        items={courses.tabsData}
                        onChange={courses.onChange}
                    />
                    <div style={{ height: '50px' }} />
                </Col>
            </Row>
        </>
    );

    return <Template content={dataStatus.isLoading ? <Spinner size={100} /> : content} />;
};
