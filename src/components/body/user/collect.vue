<template>
    <div>
        <el-card  v-for="(item ,index) in bloglist"   :key="item.bid" shadow="hover" style="margin: 10px auto;padding-left: 20px">


            <h3 >
                <span>{{item.title}}</span>
                <span @click="deleteCollect(item.bid,index)" style="float: right; margin-right: 50px">
                    <i class="el-icon-star-on"  style="color: yellow;font-size: 35px" ></i>
                </span>
            </h3>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "collect",
        data(){
            return{
                bloglist:[],
                user:""
            }
        },
        mounted() {
            var uid=sessionStorage.getItem("uid");
            this.$http.get('/api/blog/collect/'+uid).then((result)=>{
                this.bloglist=result.data.data;
            });


        },
        methods:{
            deleteCollect(bid,inx){
                this.$http.delete('/api/collect/delete',{
                    params:{
                        'uid':sessionStorage.getItem("uid"),
                        'bid':bid
                    }
                }).then((result)=>{
                    console.log(result.data.stateCode);
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