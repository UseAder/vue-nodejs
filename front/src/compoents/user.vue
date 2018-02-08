<template>
<div>
     
    <ButtonGroup>
        <Button type="primary" @click="modal1 = true">添加</Button>
        <Button type="error" @click="removes">>删除多个</Button>
    </ButtonGroup>
    <Input v-model="data.name">     
        <Button slot="append" icon="ios-search" @click="search"></Button>
    </Input>
    <Modal
        v-model="modal1"
        title="用户信息"
        @on-ok="ok"
        @on-cancel="cancel">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="mail">
                <quill-editor :content="formValidate.mail"
                    @change="onEditorChange($event)">
                </quill-editor>
            
            </FormItem>
            <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </Modal>
<Table border ref="selection" :columns="columns7" :data="data6" @on-selection-change="onselectionchange"></Table>
    <Page :total="data.total" @on-change="onchangepage"
    @on-page-size-change="onpagesizechange"
     size="small" show-elevator show-sizer :page-size="data.limit"></Page>

</div>
   
</template>
<script>
import Base from '../base';
    export default {
        mixins:[Base],
        methods:{
            
           

            onEditorChange({ quill, html, text }) {
               
                this.formValidate.mail = html
                console.log('editor change!', quill, html, text)
            },
            onselectionchange(selection){
                if (selection && selection.length>0) {
                    var ids=[];
                    for(let i=0;i<selection.length;i++){
                        ids.push(selection[i]._id)
                    }
                    this.ids=ids
                    console.log(this.ids);
                    
                }
            },
             removes(){
                 this.$http({
                    method:'post',
                        // url:'http://localhost:3000/users/data/removes',
                        url:'http://localhost:3000/users/dataremoves',
                        data:{
                            ids:this.ids
                         }
                }).then(res=>{
                    console.log(res);  
                    this.getData();           
                })  
            }    

            
        },
        data () {
            return {
                ids:[],
                module:'users',
                formValidate: {
                    name: '',
                    mail: '971596621@qq.com',
                    password:'333333'
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                    // ,
                    // mail: [//这个是邮箱的验证
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    //     { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    // ]
                },    
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'mail',
                        key: 'mail'
                    },
                     {
                        title: '评论数',
                        key: 'commentCount'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // this.show(params.index)
                                            console.log(params.row._id);
                                            this.$router.push({path:'/user/'+params.row._id})
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
            }
        }
    }
    //添加和修改用同一个表单，根据id的存在判断是修改或是添加
</script>
