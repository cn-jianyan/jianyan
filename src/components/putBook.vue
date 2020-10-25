<template>
    <div id="main">
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-input  v-model="blog.title" placeholder="请输入标题"></el-input>

            </el-col>
            <el-col :offset="6" :span="6">

                <el-button @click="$router.go(-1)">返回上一级</el-button>
                <el-button @click="$router.push('/')">首页</el-button>

                <el-dropdown >
                    <el-button type="primary"  class="el-dropdown-link">修改</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <div  style="width: 300px;text-align: center">
                            <el-radio style="margin-top: 5px " v-for="item in menu" :key="item.tid" v-model="blog.tid" :label="item.tid" border>{{item.tname}}</el-radio>
                        </div>

                        <el-dropdown-item  divided>
                            <el-button  @click="update">确认修改</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <mavon-editor style="height: 700px" ref="md" @imgAdd="imgAdd" v-model="blog.count"></mavon-editor>

    </div>
</template>

<script>
    export default {
        name: "book",
        data(){
            return{
                blog:{
                    title:"",
                    count:"",
                    tid:""
                },
                menu:[]
            }
        },
        mounted(){
            this.$http.get('/api/btype/selectAll').then((result)=>{
                this.menu=result.data.data;
                //console.log(result.data.data)
            });

           // console.log(this.$route.params.id);
            var bid=this.$route.params.id;
            var that = this;
            this.$http.get('/api/blog/selectOne/'+bid).then((result)=>{
                that.blog=result.data.data;
                console.log(that.blog);

            });


        },
        methods:{
            update(){
                //console.log(this.blog.conent);
                var parem=new URLSearchParams();
                parem.append('tid',this.blog.tid);
                parem.append('title',this.blog.title);
                parem.append('bid',this.bloglist.bid);
                parem.append('state',1);
                parem.append('count',this.blog.count);
                this.$http.put('/api/blog/update',parem).then((result)=>{
                    console.log(result.data);
                    if(result.data.stateCode==200){
                        alert("修改成功");
                        this.$router.go(-1);
                    }
                })
            },
            imgAdd(pos,$file){
                //pos是图片的标识，$file是图片对象
                // 将图片封装到封装请求参数里
                var formdata = new FormData();
                formdata.append('file', $file);

                this.$http({
                    url: '/api/blog/upload',
                    method: 'post',
                    data: formdata,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((result) => {
                    console.log(result.data.data);
                    var img=result.data.data;
                    var url = "http://localhost:8080/jianyan/"+img;
                    console.log(url);
                    //将图片插入到编辑器中
                    this.$refs.md.$img2Url(pos, url);

                })

            }
        },


    }
</script>

<style scoped>

</style>