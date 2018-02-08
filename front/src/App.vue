<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.active{
    color: red
}
</style>
<template>
  <div>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="1">
                   
                    <Icon type="ios-navigate"></Icon>
                    {{login}}
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="ios-paper"></Icon>
                    Item 4
                </MenuItem>
            </div>
        </Menu>
    </Header>
      <div class="layout">
      
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">                   
                    <MenuItem name="1-1">
                        <router-link to="/" active-class="active" exact>
                        <Icon type="ios-navigate"></Icon>
                        <span>home</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <router-link to="/user" active-class="active">
                        <Icon type="search"></Icon>
                        <span>用户分页管理</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <router-link to="/cat" active-class="active">
                        <Icon type="settings"></Icon>
                        <span>新闻分支管理</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-4">
                        <router-link to="/news" active-class="active">
                        <Icon type="settings"></Icon>
                        <span>仓配分支管理</span>
                        </router-link>
                    </MenuItem>
                   
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>

                           
                        <div style="height: 600px" v-if="login"><router-view></router-view></div>
                        <div v-else>
                            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                                <FormItem prop="user">
                                    <Input type="text" v-model="formInline.user" placeholder="Username">
                                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem prop="password">
                                    <Input type="password" v-model="formInline.password" placeholder="Password">
                                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                    </Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                                </FormItem>
                            </Form>
                        </div>
                   
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
  </div>
    
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default {
        data () {
            return {
                isCollapsed: false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [ 
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            ...mapActions(['checklogin']),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checklogin(true)
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
        computed: {
            ...mapGetters(['login']),
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>