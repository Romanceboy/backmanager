<!--  -->
<template>
  <div class>
    <el-card class="box-card">
      <!-- 卡片头部面包屑部分 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input
        id="info"
        placeholder="请输入项目名搜索"
        v-model="search"
        class="searchInput"
      ></el-input>
      <el-button
        type="primary"
        style="float:left;margin-top:15px;margin-left:9px"
        @click="tosearch"
        >搜索
      </el-button>
      <el-table
        :data="tableDate"
        :border="flag3"
        style="color: #392C2C;width: 100%;text-align:center"
      >
        <el-table-column type="index" label="#" width="50px"></el-table-column>
        <el-table-column prop="name.type" label="项目名称"></el-table-column>
        <el-table-column prop="pmname.type" label="项目经理"></el-table-column>
        <el-table-column
          prop="assignee.type"
          label="研发责任人名称"
        ></el-table-column>
        <el-table-column
          prop="remark.type"
          label="项目信息"
          width="230"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <!-- 修改用户 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="modify(scope.row.name.id)"
              size="mini"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delet(scope.row.name.id)"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改弹窗 -->
    <el-dialog
      title="修改项目信息"
      :visible.sync="flag"
      @close="editDialogClosed"
    >
      <el-form :model="form" ref="change" class="demo-ruleForm" :rules="Rules">
        <el-form-item
          label="项目名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="项目信息"
          prop="remark"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            resize="none"
            :rows="5"
            v-model="form.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="okChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      Rules: {
        //添加用户表单验证规则
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "项目名称在4到10个字符之间",
            trigger: "blur"
          }
        ],
        remark: [
          { required: true, message: "请输入项目信息", trigger: "blur" },
          { min: 6, message: "项目信息不少于六个字符", trigger: "blur" }
        ]
      },
      flag: false,
      flag2: false,
      flag3: true,
      id: "",
      search: "",
      tableDate: [],
      tableDatafalse: [],
      form: {
        name: "",
        remark: ""
      },
      formLabelWidth: "120px",
      index: "",
      index1: ""
    };
  },
  watch: {
    search() {
      //监听搜索内容，数据改变则调用搜索方法，
      this.tosearch();
    }
  },
  //方法集合
  methods: {
    async get() {
      var that = this;
      await this.$http
        .get(
          "http://mock.studyinghome.com/mock/5ea525ed4006b044ae2460e4/manager/manager"
        )
        .then(data => {
          that.tableDate = data.data.managerinfo;
          that.tableDatafalse = data.data.managerinfo;
        })
        .catch(() => {
          that.$message({
            message: "获取数据失败",
            type: "error"
          });
        });
    },
    find(id) {
      this.tableDatafalse.forEach((item, index) => {
        if (item.name.id == id) {
          this.index = index;
          return;
        }
      });
    },
    find1(id) {
      this.tableDate.forEach((item, index) => {
        if (item.name.id == id) {
          this.index1 = index;
          return;
        }
      });
    },
    tosearch() {
      if (this.search == "") {
        this.tableDate = this.tableDatafalse;
        return;
      }
      var arr = [];
      this.tableDatafalse.forEach(item => {
        if (item.name.type.indexOf(this.search) == 0) {
          arr.push(item);
        }
      });
      this.tableDate = arr;
    },
    modify(id) {
      this.find(id);
      this.find1(id);
      this.form.name = this.tableDate[this.index1].name.type;
      this.form.remark = this.tableDate[this.index1].remark.type;
      this.flag = true;
    },
    okChange() {
      this.$refs["change"].validate(valid => {
        if (valid) {
          this.tableDate[this.index1].name.type = this.form.name;
          this.tableDate[this.index1].remark.type = this.form.remark;
          this.tableDatafalse[this.index].name.type = this.form.name;
          this.tableDatafalse[this.index].remark.type = this.form.remark;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.flag = false;
        } else {
          return;
        }
      });
    },
    delet(id) {
      this.find(id);
      this.flag2 = true;
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableDatafalse.splice(this.index, 1);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.tableDate = this.tableDatafalse;
          this.search = "";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editDialogClosed() {
      //关闭添加用户弹窗时清空已有验证信息，清空表单
      this.$refs["change"].resetFields();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.get();
  }
};
</script>
<style lang="scss" scoped>
.searchInput {
  float: left;
  margin-top: 15px;
  margin-bottom: 15px;
  display: inline-block;
  width: 270px;
}
.xiuinfo2 {
  border: 1px solid #dcdfe6;
  height: 130px;
  width: 95%;
  float: left;
  border-radius: 4px;
  color: #606266;
  padding: 0 13px;
  font-size: inherit;
}
</style>
