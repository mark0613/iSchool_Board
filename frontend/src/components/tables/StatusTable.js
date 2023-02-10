import { useState } from 'react';
import { Button, Input, Table } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

import { DateFormatter } from '../../utils/formatters/DateFormatter';

const RegisterColumn = ({ inputValue, week, onWrite }) => {
    const [value, setValue] = useState(inputValue);
    const [status, setStatus] = useState('');

    const changeValue = (dateText) => {
        if (dateText === inputValue) {
            setStatus('');
        }
        else {
            setStatus('warning');
            onWrite({ week, dateText });
        }
        setValue(dateText);
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Input
                status={status}
                style={{ minWidth: '80px' }}
                value={value}
                onChange={(e) => changeValue(e.target.value)}
            />
            <Button
                type="primary"
                ghost
                icon={<CheckCircleOutlined />}
                onClick={() => changeValue(DateFormatter.monthAndDay(new Date()))}
            />
        </div>
    );
};

export const StatusTable = ({ data, onWrite }) => {
    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            align: 'center',
        },
        {
            title: '登記',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: ({ week, status }) => (
                <RegisterColumn
                    inputValue={status}
                    week={week}
                    onWrite={onWrite}
                />
            ),
        },
    ];
    return (
        <Table dataSource={data} columns={columns} pagination={false} />
    );
};
