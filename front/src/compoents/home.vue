<template>
    <Upload
        multiple
        type="drag"
        action='http://localhost:3000/upload/filedata' name='avatar'>
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
</template>
