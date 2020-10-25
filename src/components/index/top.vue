<template>
    <div>
        <!--导航-->
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="24">
                <div style="margin: 0 auto; width: 1050px;">
                    <el-menu class="el-menu-demo" mode="horizontal" style="text-align: center">
                        <el-menu-item><img src="../../assets/jianyan.png" height="50px" width="50px" alt=""></el-menu-item>
                        <el-menu-item index="3"  @click="$router.push('/index/blog')">首页</el-menu-item>
                       <el-menu-item index="4">沸点</el-menu-item>


                        <!--头像-->
                        <el-menu-item v-if="user!=''" style="float: right;">
                            <template>
                                <div class="demo-type">
                                    <el-avatar :size="50" src="https://empty" >

                                        <el-dropdown>
                                            <span class="el-dropdown-link">
                                                 <img class="xximg" width="60px" height="60px" :src="user.img"/>
                                             </span>
                                            <el-dropdown-menu slot="dropdown">
                                               <span  @click="$router.push('/book')"><el-dropdown-item ><i class="el-icon-edit" ></i>写文章</el-dropdown-item></span>
                                                <span @click="$router.push('/index/user/depo')"><el-dropdown-item ><i class="el-icon-delete" ></i>回收站</el-dropdown-item></span>
                                                <span  @click="$router.push('/index/user/dongtai')"> <el-dropdown-item divided><i class="el-icon-user"></i>我的主页</el-dropdown-item></span>
                                                <span  @click="$router.push('/index/user/collect')"><el-dropdown-item  ><i class="el-icon-star-off"></i>我的收藏集</el-dropdown-item></span>
                                                <span  @click="exit"><el-dropdown-item divided ><i class="el-icon-switch-button"></i>退出</el-dropdown-item></span>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </el-avatar>
                                </div>
                            </template>
                        </el-menu-item>
                        <el-menu-item v-else style="float: right;">


                            <el-button type="text"  @click="dialogVisible = true" >登录</el-button>

                            <el-button type="text" @click="dialogVisible2=true">注册</el-button>
                        </el-menu-item>

                        <el-menu-item  style="float: right;">
                            <el-button type="primary" @click="$router.push('/book')">写文章</el-button>
                        </el-menu-item>
                        <el-menu-item style="float: right;">
                            <el-input placeholder="请输入内容" v-model="seach" class="input-with-select">
                                <el-button slot="append"  @click="seachBlog" icon="el-icon-search"></el-button>
                            </el-input>

                        </el-menu-item>
                    </el-menu>
                </div>

            </el-col>
        </el-row>


        <!--登录对话框-->
        <el-dialog
                title="登录页面"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose" center>
            <div>
                <el-input placeholder="请输入邮箱" v-model="login.loginname"  ></el-input>
                <el-input placeholder="请输入密码" v-model="login.loginpwd" show-password></el-input>
                <el-button type="text" style="margin-left: 20px ; border-bottom: 1px solid deepskyblue">注册</el-button>
            </div>

            <span slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                     <el-button type="primary" @click="sign">登录</el-button>
             </span>
        </el-dialog>

        <!--注册-->
        <el-dialog
                title="注册页面"
                :visible.sync="dialogVisible2"
                width="500px"
                :before-close="handleClose"
                label-position="left"
                label-width="80px"

        >
            <div >
                <el-form :model="zhuceUser" :rules="rules" ref="zhuceUser" label-width="80px"
                         size="mini"
                >
                    <el-form-item label="呢称:" prop="uname">
                        <el-input  style="width: 320px" v-model="zhuceUser.uname"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input  style="width: 320px"  v-model="zhuceUser.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话:" prop="phone">
                        <el-input   style="width: 320px" v-model="zhuceUser.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="pwd">
                        <el-input   style="width: 320px" v-model="zhuceUser.pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="checkpwd">
                        <el-input  style="width: 320px"  v-model="zhuceUser.checkpwd"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-input style="width: 100px" v-model="zhuceUser.code"></el-input>
                        <el-button type="primary" @click="getCode" v-if="timeBut">获取</el-button><el-button v-else type="text" disabled>{{lastTime+'后重新获取'}}</el-button>
                    </el-form-item>
                </el-form>

            </div>

            <span slot="footer" class="dialog-footer" style="text-align: center">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="register('zhuceUser')">注册</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.zhuceUser.checkpwd !== '') {
                        this.$refs.zhuceUser.validateField('checkpwd');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.zhuceUser.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                user:"",
                seach:"", //搜索
                dialogVisible:false, //登入框显示
                dialogVisible2:false, //注册框显示
                login:{
                    loginname:"",
                    loginpwd:""
                },
                //注册
                zhuceUser:{
                    uname:"",
                    phone:"",
                    email:"",
                    pwd:"",
                    checkpwd:"",
                    img:"",
                    code:""
                },
                code:"获取",
                lastTime:60,
                timeBut:true,


                //表单验证规则

                rules:{
                    uname:[
                        {required:true,message:"必填"},
                        {validator:function(rule,value,callback){
                                //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
                                if(/^[\u4e00-\u9fa5]{0,}$/.test(value) == false){
                                    callback(new Error("请输入中文"));
                                }else{
                                    //校验通过
                                    callback();
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    email:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }],
                    phone:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        { validator:function(rule,value,callback){
                                if(/^1[34578]\d{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'
                        },
                    ],
                    pwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkpwd: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    code:[
                        {required:true,message:"验证码不能为空"},
                        {min:5,max:6,message: "验证码不合法"}
                    ]
                }
            }
        },
        methods: {
            //关闭登录
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //获取邮箱验证码
            getCode(){
                if(this.zhuceUser.email==''){
                    this.$confirm("邮箱不能为空");
                    return
                }
                this.lastTime=60;
                this.timeBut=false;
                var that=this;
                this.$http.get('/api/user/code/'+this.zhuceUser.email);
                var timer=setInterval(function () {

                    if(that.lastTime<=0){
                        that.timeBut=true;
                        clearInterval(timer);
                    }else{
                        that.lastTime=that.lastTime-1;
                    }
                },1000)
            },
            //登录
            sign(){
                this.dialogVisible=false;
                if(this.login.loginname==''||this.login.loginpwd==''){
                    this.$confirm("账号或密码不能为空");
                }
                var params=new URLSearchParams();
                params.append("email",this.login.loginname);
                params.append("pwd",this.login.loginpwd);

                this.$http.post("/api/user/sign",params).then((result)=>{
                    console.log(result.data.data);
                    this.user=result.data.data;
                    sessionStorage.setItem("uid",this.user.uid);
                    this.$notify({
                        title: '提示',
                        message: '登录成功',
                        duration: 0
                    });
                });
            },

            //注册
            register(val){
                this.dialogVisible2 = false;
                this.$refs[val].validate(valid => {
                    //alert(valid);
                    if (valid) {
                       //alert("通过验证");
                        var params=new URLSearchParams();
                        params.append('uname',this.zhuceUser.uname);
                        params.append('phone',this.zhuceUser.phone);
                        params.append('email',this.zhuceUser.email);
                        params.append('pwd',this.zhuceUser.pwd);
                        this.$http.post('/api/user/register',params).then((result)=>{
                            if(result.status==500){
                                this.$confirm("注册失败");
                            }else{
                                this.$confirm("注册成功");
                                this.$notify({
                                    title: '提示',
                                    message: '注册成功',
                                    duration: 0
                                });
                            }
                        })
                    } else {
                        this.$confirm("请输入合法数据");
                        //console.log('error submit!!')
                        return false
                    }
                })
            },
            //退出
            exit(){
                sessionStorage.removeItem("uid");
                this.user="";
                console.log(this.user);
            },
            //查询
            seachBlog(){
                console.log("搜索")
                this.$router.push({
                    path:'/index/blog',
                    query:{
                        name:this.seach
                    }
                })
            }

        },
        mounted() {
            var uid=sessionStorage.getItem("uid");

            if(uid){
                this.$http.get("/api/user/selectOne/"+uid).then((result)=>{
                    this.user=result.data.data;
                })
            }
        },
        provide(){
            return{
                seach: this.seach,
                user:this.user
            }
        }
    }
</script>

<style scoped>


    .el-col {
        border-radius: 4px;
        /* border: 1px solid black; */
    }

    .el-divider--horizontal {
        display: block;
        height: 1px;
        width: 100%;
        margin-top: 0px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .xximg {
        font-size: 12px;
    }
</style>