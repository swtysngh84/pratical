import React from 'react'
import { Table, Card } from 'antd';

const CustomTable = ({title, dataSource, columns,pagination }) => {
    return (
        <div>
            <Card title={title} style={{ width: 800 }}>
            <Table dataSource={dataSource} columns={columns} pagination={pagination}/>
            </Card>
        </div>
    );
}

export default CustomTable;
