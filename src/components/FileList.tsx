import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'

interface DataType {
    key: React.Key,
    fileName: string,
    fileSize: string,
    uploadedDate: any
}

const FileList: React.FC = () => {

    const [pageSize, setPageSize] = React.useState(5)
    const [page, setPage] = React.useState(1)
    const today: any = new Date().toDateString()

    const data: DataType[] = [
        {
            key: '1',
            fileName: 'Mike',
            fileSize: "10",
            uploadedDate: today,
        },
        {
            key: '2',
            fileName: 'John',
            fileSize: "42",
            uploadedDate: today,
        },
        {
            key: '3',
            fileName: 'Mike',
            fileSize: "32",
            uploadedDate: today,
        },
        {
            key: '4',
            fileName: 'John',
            fileSize: "42",
            uploadedDate: today,
        },
    ]

    const [total, setTotal] = React.useState(data.length)

    const columns: ColumnsType<DataType> = [
        {
            title: 'fileName',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'fileSize',
            dataIndex: 'fileSize',
            key: 'fileSize',
            render: (_, record) => (
                <div>
                    {record.fileSize}MB
                </div>
            )
        },
        {
            title: 'uploadedDate',
            dataIndex: 'uploadedDate',
            key: 'uploadedDate',
            render: (_, record) => (
                <div>
                    <p>{record.uploadedDate}</p>
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'id',
            render: (_, record) => (
                <div className='flex items-center justify-center gap-3'>
                    <Button>Edit</Button>
                    <Button danger>Delete</Button>
                </div>
            )
        },
    ]


    return (
        <div>
            <Table
                dataSource={data}
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