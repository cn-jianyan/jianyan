<template>
    <div>
        <el-card v-for="(item,index) in bloglist" :key="item.bid" shadow="hover" style="margin: 10px auto;padding-left: 20px">

            <h3 >
                <span>{{item.title}}</span>
                <span style="float: right; margin-right: 50px">
                    <el-button type="primary" @click="huifu(item.bid,index)">恢复</el-button>
                   <el-button type="error" @click="del(item.bid,index)">删除</el-button>
                </span>
            </h3>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "depo",
        data(){
            return{
                bloglist:[]
            }
        },
        mounted() {
            var uid=sessionStorage.getItem("uid");

            this.$http.get('/api/blog/recovery/'+uid).then((result=>{

                this.bloglist=result.data.data;

            }));
        },
        methods:{
            del(val,inx){

                this.$http.delete('/api/blog/remove/'+val).then((result)=>{
                    if(result.data.stateCode==200){
                        alert("删除成功");
                        this.bloglist.splice(inx,1);
                    }
                })
            },
            huifu(bid,inx){
                this.$http.get("/api/blog/huifu/"+bid).then((result)=>{
                    //console.log(result)
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