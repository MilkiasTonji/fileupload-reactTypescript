import { Button } from 'antd'
import React from 'react'
import FileList from './FileList'

const FileUpload = () => {
  return (
    <div className='w-full h-screen flex items-start justify-center p-4 bg-blue-500'>
        <div className='w-1/2 h-full bg-gray-100 flex-col shadow-md rounded-md p-3'>
            <div className='flex items-center justify-between'>
             <h1>File Upload</h1>
             <Button type='primary' className='bg-blue-500'>Upload</Button>
            </div>
            <FileList />
        </div>
    </div>
  )
}

export default FileUpload