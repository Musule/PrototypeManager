<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="upload"
      name="prototypeFile"
      accept=".zip"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-remove="beforeRemove"
      :limit="1"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">支持zip，建议不超过100MB</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      upload: `${this.GLOBAL.server_url}${this.GLOBAL.upload_zip}`,
      files_path: "",
      files_name: "",
      fileList: [],
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      console.log("res---" + JSON.stringify(res));
      this.files_path = res.prototypeFile.path.replace("prototypeFile\\", "");
      this.files_name_zip = res.prototypeFile.name;
      this.files_name = res.prototypeFile.name.replace(".zip", "");
      var arr = [
        this.GLOBAL.server_url + this.files_name_zip,
        this.files_name,
        this.GLOBAL.server_url + "/" + this.files_name + "/index.html",
      ];
      this.$emit("ChildByValueZipFileUploadEdit", arr);
      console.log(arr);
      // 消息提示（成功）
      this.$message({
          message: '上传成功',
          type: 'success'
        });
    },
    handleAvatarError(err, file, fileList) {
      // 消息提示（失败）
       this.$message.error(`上传失败${err}`);
    },
  },
};
</script>
<style lang="">
</style>
