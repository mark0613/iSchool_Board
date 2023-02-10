import { SmileOutlined } from '@ant-design/icons';

export const EmptyIcon = ({ text = 'Data Not Found' }) => (
    <div style={{ textAlign: 'center', margin: '50px' }}>
        <SmileOutlined style={{ fontSize: 50 }} />
        <p>{text}</p>
    </div>
);
