<template>
    <div>
        <el-row>
            <el-col :span="18" :offset="4">


            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="4">
                <el-card shadow="hover" style="margin: 10px auto;padding-left: 20px">
                    <!--用户头像等-->
                    <el-row>
                        <el-col :span="4" style="margin: 30px">
                            <div class="block">
                                <span class="title"></span>
                                <el-avatar shape="square" :size="100" fit="fill" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
                            </div>
                        </el-col>
                        <el-col :span="4"  style="margin:30px 30px 30px 0px">
                            <p>用户:</p>
                            <h4>{{user.uname}}</h4>
                        </el-col>
                        <el-col :offset="8" :span="4" style="margin-top: 80px" >

                                <el-button @click="$router.push('/index/updateUser')">编辑资料</el-button>

                        </el-col>
                    </el-row>
                </el-card>
                <!--菜单-->
                <el-card shadow="hover" style="margin: 0px auto;padding-left: 20px">
                    <el-menu  class="el-menu-demo" mode="horizontal" >
                        <el-menu-item @click="$router.push('/index/user/dongtai')">动态</el-menu-item>
                        <el-menu-item @click="$router.push('/index/user/collect')">收藏夹</el-menu-item>
                        <el-menu-item @click="$router.push('/index/user/depo')">回收站</el-menu-item>
                    </el-menu>


                    <!--内容-->
                    <router-view></router-view>
                </el-card>




            </el-col>
            <el-col :span="4" :offset="1" style="margin-top: 10px">
                <!--关注等信息-->
                <el-card class="box-card" style="margin-bottom: 30px">
                    <el-row type="flex" style="text-align: center" justify="center" align="middle">
                        <el-col :span="12">
                            <h6>关注了</h6>
                            <p>{{user.foll.length}}</p>
                        </el-col>
                        <el-col :span="12">
                            <h6>关注者</h6>
                            <p>{{user.fans.length}}</p>
                        </el-col>
                    </el-row>

                </el-card>


                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <h4>个人成就</h4>

                    </div>
                    <div class="text item">
                       文章浏览量:{{user.passnum}}
                    </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
          return{
              user:{
                  foll:[],
                  fans:[]
              }
          }
        },
        mounted() {
            var uid=sessionStorage.getItem("uid");
            if(uid){
                this.$http.get('/api/user/selectOne/'+uid).then((result)=>{
                    this.user=result.data.data;
                    // console.log(this.user)
                })
            }
        },

    }
</script>

<style scoped>

</style>