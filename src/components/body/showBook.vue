<template>
    <div>

        <el-row>
            <el-col :span="4" >

                <span v-if="user!=''" style="float: right; margin-right: 50px;margin-top: 250px">
                    <i class="el-icon-star-on"  v-if="user.collect.indexOf(blog.bid)!=-1" @click="deleteCollect"  style="color: yellow;font-size: 35px" ></i>
                    <i class="el-icon-star-off" style="font-size: 30px" v-else  @click="addCollect"></i>

                </span>
                <span  style="float: right; margin-right: 50px;margin-top: 250px">
                   ----<br>----

                </span>
            </el-col>
            <el-col :span="12" >
                <!--内容-->
                <el-card shadow="hover" style="margin: 10px auto;padding-left: 20px">

                    <div class="markdown-body" v-html="compiledMarkdown"></div>

                </el-card>

                <!--评论-->
                <el-card  shadow="hover" style="margin: 10px auto;padding-left: 20px">
                    <!--发表评论-->
                    <h3>评论区</h3>
                    <el-row type="flex" justify="center">
                        <el-input ></el-input><el-button>发布</el-button>
                    </el-row>
                    <el-divider></el-divider>
                    <!--父级评论-->
                 <div v-for="i in commentlist" :key="i.cid">
                     <el-row type="flex" align="middle">
                         <el-col :span="2">
                             <div>
                                 <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                             </div>
                         </el-col>
                         <el-col :span="15">
                             <el-row  style=" font-size: 20px">{{i.user.uname}}</el-row>
                             <el-row style="font-size: 15px">:{{i.content}}</el-row>
                         </el-col>

                     </el-row>
                     <el-row style="background-color: #D3DCE6;padding: 30px;margin-left: 10%;border-radius: 20px">
                        <!--z子评论-->

                         <el-col :span="24">
                             <el-row  v-for="j in i.son" :key="j.cid" >
                                 <el-col  :span="2">
                                     <div>
                                         <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                     </div>
                                 </el-col>
                                 <el-col :span="15">
                                     <el-row style=" font-size: 15px">{{j.user.uname}}</el-row>
                                     <el-row style="font-size: 10px"><span></span>:{{j.content}}</el-row>
                                     <el-row v-if="cnum==j.parent+'/'+j.cid"><el-input size="small"></el-input><el-button style="float: right" size="small" @click="cnum=0">评论</el-button></el-row>
                                 </el-col>
                                 <el-col :span="4">
                                     <el-button type="text" @click="cnum=j.parent+'/'+j.cid">回复</el-button>
                                 </el-col>
                             </el-row>
                         </el-col>


                     </el-row>

                 </div>
                </el-card>

            </el-col>
            <el-col :span="4" :offset="1" style="margin-top: 10px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                       关于作者

                    </div>
                    <div  class="text item">
                        <el-row type="flex" justify=" center">
                            <el-col :span="12">
                                <div>
                                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                </div>
                            </el-col>
                            <el-col>
                                <div>
                                    {{blog.author.uname}}
                                </div>
                                <div>
                                    <p ><i class="el-icon-view" style="color: deepskyblue"></i>
                                        <span style="font-size: 10px;margin-left:10px">文章被阅读&nbsp;{{blog.pass}}</span>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

            </el-col>
        </el-row>


    </div>
</template>

<script>
    import marked from 'marked'
    import 'github-markdown-css';
    export default {
        name: "showBook",
        data(){
            return{
                blog:{
                    title:"",
                    count:"",
                    author:{
                        uname:""
                    }
                },
                user:"",
                //评论
                commentlist:[],
                //子评论的显示等
                cnum:""
            }
        },
        computed:{
            compiledMarkdown(){
                const renderer = new marked.Renderer()
                const paragraphParse = text => `<p>${text}</p>`
                renderer.paragraph = paragraphParse
                return marked(this.blog.count, { renderer })
            }
        },
        mounted() {

           // console.log(this.$route.params.id);
            var bid=this.$route.params.id;
            this.$http.get('/api/blog/selectOne/'+bid).then((result)=>{
                this.blog=result.data.data;
               // console.log(this.blog.author);

            });
            var uid=sessionStorage.getItem("uid");
            if(uid){
                this.$http.get('/api/user/selectOne/'+uid).then((result)=>{
                    this.user=result.data.data;
                    //console.log(this.user)
                   // console.log(this.user)
                })
            };
            //查询评论
            this.$http.get('/api/comment/select/'+bid).then((result)=>{
               this.commentlist=result.data.data;
               /*console.log("---------------")
               console.log(result.data)*/
            })

        },
        methods:{
            addCollect(){
               // var bid=this.$route.params.id;
                var uid=sessionStorage.getItem("uid");
                var parem=new URLSearchParams();
                parem.append('uid',uid);
                parem.append('bid',this.blog.bid);
                alert(uid);
                this.$http.post('/api/collect/add',parem).then((result)=>{

                    this.user.collect.push(this.blog.bid);
                })
            },
            deleteCollect(){
                this.$http.delete('/api/collect/delete',{
                    params:{
                        'uid':this.user.uid,
                        'bid':this.blog.bid
                    }
                }).then((result)=>{
                    console.log(result.data.stateCode);
                    if(result.data.stateCode==200){
                        var index= this.user.collect.indexOf(this.blog.bid);
                        this.user.collect.splice(index,1);
                    }

                })
            }
        }

    }
</script>

<style scoped>

</style>