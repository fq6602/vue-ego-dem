<template>
  <el-upload
  class="upload-demo"
  ref="upload"
  :on-success="handleSuccess"
  :action="url"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</template>

<script>
import base from '../../api/config'
 export default {
    data() {
      return {
        fileList: [],
        url:base.baseUrl+base.uploadUrl
      };
    },
    methods: {
      submitUpload() {//提交上传的事件
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleSuccess(response, file, fileList){
          console.log(response.url);
          //传递图片路径
          console.log(base.baseUrl+'/'+response.url.slice(7));
          let imgUrl=base.baseUrl+'/'+response.url.slice(7)
          this.$emit('showImg',imgUrl)
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style>

</style>