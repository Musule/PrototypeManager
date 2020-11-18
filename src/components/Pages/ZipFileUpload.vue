<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="upload"
      name="prototypeFile"
      accept=".zip"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-remove="beforeRemove"
      :limit="1"
      :file-list="fileList"
      style="width: 400px"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        支持zip，建议不超过100MB
      </div>
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
      this.files_path = res.prototypeFile.path.replace("prototypeFile\\", "");
      this.files_name_zip = res.prototypeFile.name;
      this.files_name = res.prototypeFile.name.replace(".zip", "");
      var arr = [
        this.GLOBAL.server_url + this.files_name_zip,
        this.files_name,
        this.GLOBAL.server_url +
          "/" +
          this.files_name +
          "/index.html",
      ];
      this.$emit("ChildByValueZipFileUpload", arr);
      console.log(arr);
     
    },
    handleAvatarError(err, file, fileList) {
      alert("上传失败" + err);
    },
  },
};
</script>
<style lang="">
</style>
