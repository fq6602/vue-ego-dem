<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="clearForm" width="70%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="showInnerVisible"
            >类目选择</el-button
          >
           {{ruleForm.category}}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="upLoadImage">上传图片</el-button>
          <img :src='ruleForm.image' style='width:100px;vertical-align:middle;margin-left:20px'/>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <WangEditor @getWangData='getWangData' ref='wangEditor'/>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 内弹框 类目选择-->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
    <GoodsTree @getTreeData='getTreeData'/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showTreeData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 内弹框 上传图片 -->
      <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="imgInnerVisible"
      append-to-body
    >
      <GoodsUpload @showImg='showImg'/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgInnerVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from './GoodsTree.vue'
import GoodsUpload from './GoodsUpload.vue'
import WangEditor from './WangEditor.vue'
export default {
    components:{
        GoodsTree,
        GoodsUpload,
        WangEditor
    },
    props:{
      title:{
        type:String,
        default:'添加商品'
      },
      rowData:{
        type:Object,
        default:function(){
          return {}
        }
      } 
    },
  watch:{
    rowData(val){//延迟加载 this.$nextTick()
      this.$nextTick(()=>{
        console.log('监听数据修改',val);
        this.ruleForm=val
        this.$refs.wangEditor.editor.txt.html(val.descs)
      })
    }
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      imgInnerVisible:false,//图片内弹框
      treeData:{},//tree的类目数据
      ruleForm: {
        id:'',
        category:'',//类目名称
        cid:'',//类目id标识
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    showInnerVisible() {
      this.innerVisible = true;
    },
    //接受的tree返回的类目数据
    getTreeData(val){
      this.treeData=val 
    },
    showTreeData(){
      //在旁边显示类目
      this.ruleForm.category=this.treeData.name
      this.ruleForm.cid=this.treeData.cid
      //关闭内弹框
      this.innerVisible=false
    },
    //点击按钮，上传图片
    upLoadImage(){
      this.imgInnerVisible=true
    },
    showImg(val){
      this.ruleForm.image=val
    },
    //富文本变异数据
    getWangData(val){
      // console.log('富文本变异数据',val);
      this.ruleForm.desc=val
    },
    //确定按钮，提交表单
    //title cid  category sellPoint price num desc paramsInfo image
    submit(){
      let {title,cid ,category,sellPoint,price,num,desc,image,id}=this.ruleForm
      //判断确定按钮的功能
      if(this.title==='添加商品'){
       this.$api.addProduct({
        title,cid,category,sellPoint,price,num,desc,image
      }).then((res)=>{
        console.log('---',res);
        if(res.status===200){
           this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
           });
          this.clearForm()
          //读取最新的数据库信息---列表刷新(操作父元素)
          this.$parent.http(1)

        }else{
            this.$message.error('错了哦，这是一条错误消息');
        }
      })
      }else{
        console.log('编辑商品');
        this.$api.getUpdateProduct({
          id,title,cid,category,sellPoint,price,num,desc,image
        }).then((res)=>{
          if (res.status === 200) {
              this.$message({
                message: "恭喜你，修改成功消息",
                type: "success",
              });
              this.clearForm();
              //刷新商品列表--操作父元素里面方法
              this.$parent.http(1);
            } else {
              this.$message.error("错了哦，添加商品失败了");
            }
        })
      }

    },
    //清空表单
    clearForm(){
                //添加成功
          //隐藏弹框
          this.dialogVisible=false
          //清空表单
          this.ruleForm={
              category:'',//类目名称
              cid:'',//类目id标识
              title: "",
              price: "",
              num: "",
              sellPoint: "",
              image: "",
              desc: "",
          };
          //清空富文本编辑器//可使用 editor.txt.clear() 清空编辑器内容。
          this.$refs.wangEditor.editor.txt.clear()
    }
  },
};
</script>

<style>
</style>