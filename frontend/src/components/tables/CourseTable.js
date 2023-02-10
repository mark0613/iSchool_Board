import { Card, List, Typography } from 'antd';

const { Title } = Typography;

const CourseItem = ({ week, courseData }) => (
    <Card
        title={
            <Title level={4}>星期{week}</Title>
        }
        bordered={false}
    >
        <List
            dataSource={courseData}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </Card>
);

export const CourseTable = ({ data }) => (
    <List
        dataSource={data}
        renderItem={(item) => <CourseItem week={item.week} courseData={item.courses} />}
    />
);
