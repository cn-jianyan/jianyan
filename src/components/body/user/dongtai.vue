<template>
    <div>
        <el-card v-for="(item ,index) in bloglist" :key="item.bid" shadow="hover" style="margin: 10px auto;padding-left: 20px">
            <h3 >
                <span>{{item.title}}</span>
                <div style="float: right; margin-right: 50px">
                    <el-button @click="$router.push('/index/putBook/'+item.bid)">修改</el-button>
                    <el-button @click="del(item.bid,index)">删除</el-button>
                </div>
            </h3>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "dongtai",
        data(){
            return{
                bloglist:[]
            }
        },
        mounted() {
            var uid=sessionStorage.getItem("uid");
            this.$http.get('/api/blog/has/'+uid).then((result)=>{
                this.bloglist=result.data.data;
            })
        },
        methods:{
            del(bid,inx){
                this.$http.delete('/api/blog/delete/'+bid).then((result)=>{
                    if(result.data.stateCode==200){
                        this.bloglist.splice(inx,1);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>