const  express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//资源共享
const cors=require('cors')
app.use(cors())
//静态文件托管
app.use(express.static('upload'))
const router = require('./router')
//路由
app.use('/',router)



app.listen(3001,()=>{
    console.log(3001);
})