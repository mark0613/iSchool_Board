import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Spinner = ({ size = 24 }) => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin
            style={{ fontSize: 24 }}
            tip="Loading..."
            indicator={<LoadingOutlined style={{ fontSize: size }} spin />}
        />
    </div>
);
