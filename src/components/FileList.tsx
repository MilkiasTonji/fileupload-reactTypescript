import { Table } from 'antd';
import React from 'react'

const FileList = () => {

    const [pageSize, setPageSize] = React.useState(5)
    const [page, setPage] = React.useState(1)

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ]

    const [total, setTotal] = React.useState(dataSource.length)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ]


    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                // pagination={{
                //     pageSize: pageSize,
                //     total: total,
                //     onChange: (page, pageSize) => {
                //         setPage(page)
                //         setPageSize(pageSize)
                //     }
                // }}
            />
        </div>
    )
}

export default FileList