<template>
   <div>

       <el-row type="flex" justify="center">
           <el-col  :span="16">
               <el-card class="box-card">
                   <div  class="clearfix">
                        <h1>个人资料</h1>
                   </div>
                   <el-divider></el-divider>
                   <div>
                       <el-row type="flex" align="middle">
                           <el-col :span="2">
                               头像
                           </el-col>
                           <el-row :span="6">
                               <div class="block">
                                   <el-avatar shape="square" :size="60" :src="img"></el-avatar>
                               </div>
                           </el-row>
                           <el-col :span="4" :offset="1">
                               <el-upload
                                       class="upload-file"
                                       drag
                                       :action="doUpload"
                                       :data="pppss">
                                   <i class="el-icon-upload"></i>
                                   <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                               </el-upload>
                           </el-col>
                       </el-row>
                   </div>
                   <el-divider></el-divider>
                   <div>
                       <el-row>
                           <el-col :span="4">
                               用户名
                           </el-col>
                           <el-col :span="8">
                               <input style="width: 100%;height: 30px;border: 0px"/>
                           </el-col>
                           <el-col :span="4" :offset="1">
                               <el-button type="text"><i class="el-icon-edit"></i>修改</el-button>
                           </el-col>
                       </el-row>
                   </div>
                   <el-divider></el-divider>
               </el-card>

           </el-col>

       </el-row>
   </div>
</template>

<script>
    export default {
        name: "updateUser",
        data(){
           return{
               img:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",

                pppss:{
                    uid:""
                },
               doUpload:'/api/user/upload/',
           }
        },
        methods:{

        },
        mounted() {

            this.uid=sessionStorage.getItem("uid");
            this.doUpload=this.doUpload+this.uid;
            console.log(this.uid);
        }
    }
</script>

<style scoped>

</style>