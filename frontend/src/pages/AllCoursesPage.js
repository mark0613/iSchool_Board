import { Typography } from 'antd';
import { Spinner } from '../components/spinners';
import { CourseTable } from '../components/tables';
import { Template } from './Template';

const { Title } = Typography;

export const AllCoursesPage = ({ dataStatus, allCoursesData }) => {
    const content = (
        <>
            <Title level={2} style={{ textAlign: 'center' }}>
                所有課程
            </Title>
            <CourseTable data={allCoursesData} />
        </>
    );
    return (
        <Template content={dataStatus.isLoading ? <Spinner size={100} /> : content} />
    );
};
