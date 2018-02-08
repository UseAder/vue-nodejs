<template>
  <div>
    <ButtonGroup>
        <Button type="primary" @click="changeType(0)">新闻分类</Button>
        <Button type="primary" @click="changeType(1)">产品分类</Button>
        <Button type="primary" @click="changeType(2)">地区分类</Button>

    </ButtonGroup>
    <Tree :data="data" :render="renderContent"></Tree>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="分类标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入分类标题"></Input>
        </FormItem>
        <FormItem label="父类ID" prop="parentId">
            <Input v-model="formValidate.parentId" placeholder="请输入父id"></Input>
        </FormItem>
        <FormItem label="分类类型" prop="type">
            <Input v-model="formValidate.type" placeholder="请输分类"></Input>
        </FormItem>
        <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>    

  </div>
    
</template>
<script>
    export default {
        data () {
            return {
              formValidate: {
                    title: '',
                    parentId: '',
                    type:0
                   
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
                data: [
                
                ],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                }
            }
        },
        created(){
         this.getData()
        },
        methods: {
            getData(type){
                var type=type||0;
                this.$http.post(`http://localhost:3000/cat/list/${type}`)
                .then((response) => {
                // console.log(response.data);
                this.data=response.data
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //点击提交时进行ajax请求
                        this.$http({
                          method:'post',
                          url:'http://localhost:3000/cat/data',
                          data:this.formValidate
                        }).then(res=>{
                          this.getData();
                          this.$Message.success('Success!');
                          //c重置form表单内容为数据的初始值状态 非常重要
                          Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
            ,
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { 
                                  //...log(data)
                                  console.log(data);
                                  
                              this.formValidate.parentId=data._id
                                   }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            // append (data) {
            //     const children = data.children || [];
            //     children.push({
            //         title: 'appended node',
            //         expand: true
            //     });
            //     this.$set(data, 'children', children);
            // },
            remove (root, node, data) {
                // const parentKey = root.find(el => el === node).parent;
                // const parent = root.find(el => el.nodeKey === parentKey).node;
                // const index = parent.children.indexOf(data);
                // parent.children.splice(index, 1);
                this.$http({
                  method:'delete',
                  url:`http://localhost:3000/cat/data/${data._id}`
                  // data:this.formValidate
                }).then(res=>{
                  this.getData();
                  this.$Message.success('已删除 Success!');
                  //c重置form表单内容为数据的初始值状态 非常重要
                })
            },
            changeType(type){
                this.getData(type)    ;
                this.formValidate.type=type
            }






        }
    }
</script>
