/**
 * 基础的接口地址
 */
const base={
    baseUrl:'http://localhost:3001',//基础地址
    login:'/api/login',//登录接口
    projectList:'/api/projectList',//商品列表接口
    search:'/api/search',//搜索接口
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    uploadUrl:'/upload',//上传图片
    addProduct:'/api/backend/item/insertTbItem',//增加商品接口
    delete:'/api/backend/item/deleteItemById',//删除商品接口
    updateProduct:'/api/backend/item/updateTbItem',//编辑商品接口
    getParams:"/api/backend/itemParam/selectItemParamAll",//规格参数列表
}

export default  base