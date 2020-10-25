<template>
    <div>
        <el-row>
            <el-col :span="18" :offset="4">
                <el-tag class="hand" style="cursor: hand" v-for="item in menu" :key="item.tid">{{item.tname}}</el-tag>

            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="4">
                <el-card shadow="hover" style="margin: 10px auto;padding-left: 20px">
                    <h3 >
                        <span>Springboot的使用</span>
                        <el-badge :value="1000" class="item" style="float: right; margin-right: 50px">
                            <el-button size="small">浏览量</el-button>
                        </el-badge>
                    </h3>

                </el-card>
                <el-card  v-for="item in bloglist" :key="item.bid" shadow="hover" style="margin: 10px auto;padding-left: 20px">


                    <h3 >
                        <span class="hand" @click="$router.push('/index/book/'+item.bid)">{{item.title}}</span>
                        <el-badge :value="item.pass" class="item" style="float: right; margin-right: 50px">
                            <el-button size="small">浏览量</el-button>
                        </el-badge>
                    </h3>

                </el-card>
            </el-col>
            <el-col :span="4" :offset="1" style="margin-top: 10px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span><i class="el-icon-s-flag"></i>作者榜</span>

                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "blog",
        data(){
           return{
              pageinfo:"",
               bloglist:[],
               menu:[],
               name:""
           }
        },
        mounted() {


            this.$http.get('/api/blog/query/1',{
                params:{
                    name:this.name
                }
            }).then((result)=>{
                   // console.log(result.data.data);
                    this.pageinfo=result.data.data;
                    this.bloglist=this.bloglist.concat(result.data.data.list);

                    //console.info(this.bloglist);
            });
            this.$http.get('/api/btype/selectAll').then((result)=>{
                this.menu=result.data.data;
               // console.log(result.data.data)
            })
        },
        beforeRouteUpdate(to,from,next){
            // console.log("-----"+to.query.name)
            this.name=to.query.name;
            this.$http.get('/api/blog/query/1',{
                params:{
                    name:this.name
                }
            }).then((result)=>{
                // console.log(result.data.data);
                this.pageinfo=result.data.data;
                this.bloglist=result.data.data.list;

                //console.info(this.bloglist);
            });
            next();
        }
    }
</script>

<style scoped>
    .hand:hover{
        cursor:pointer;
        background-color: yellow;

    }
</style>