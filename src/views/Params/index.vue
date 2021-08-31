<template>
  <div>
    <!-- 1. 搜索内容 -->
    <div class="header">
      <el-input />
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click='showDialog'>添加</el-button>
    </div>

    <!-- 2.表格列表 -->
    <el-table :data="tableData">
      <el-table-column prop="itemCatId" label="规格参数ID" width="120">
      </el-table-column>
      <el-table-column prop="id" label="类目ID" width="120"> </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="120">
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 3. 分页功能 -->
    <Pagination
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changeCurrent"
    />
    <!-- 4. 弹框 -->
    <ParamsDialog ref='myDialog' />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import ParamsDialog from './ParamsDialog.vue'
export default {
  components: {
    Pagination,
    ParamsDialog
  },
  data() {
    return {
      tableData: [],
      pageSize: 10,
      total: 100,
      rowData:{}
    };
  },
  methods: {
    /**
     * 点击添加按钮显示弹框
     * 
     */
    showDialog(){
      this.$refs.myDialog.dialogVisible=true;
    },
    //编辑
    handleEdit(index, row) {
      console.log('编辑商品', row);
      this.$refs.dialog.dialogVisible=true;
      this.title='编辑商品';
      this.rowData={...row};
    },
    //删除
     handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.getParams({
        id:row.id
      }).then(res=>{
        console.log(res);
        if(res.status===200){
          this.http(1)
          this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        }else{
          this.$message.error('错了哦，删除失败');
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    /**
     * 分页点击
     */
    changeCurrent(val) {
      this.http(val);
    },
    //网络请求
    http(page) {
      this.$api
        .getParams({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            //表格数据
            this.tableData = res.data;
            //分页器
            this.total = res.total;
            this.pageSize = res.pageSize;
          }
        });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  margin-bottom: 20px;
  button {
    margin-left: 20px;
  }
}
</style>