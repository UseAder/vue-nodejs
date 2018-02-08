import sha256 from 'crypto-js/sha256';
export default {
    data(){
        return{
            modal1: false,
            data6: [],
            data:{
                cateId:0,
                name:'',
                limit:10,
                page:1,
                total:0
            },
        }
    },
    created(){
        this.getData()
       },
    methods: {
        getData(){
            this.$http({
                 method:'post',
                 url:`http://localhost:3000/${this.module}/list`,
                 data:this.data
                })
                .then((response) => {
                // console.log(response.data);
                this.data6=response.data.docs
                this.data.total=response.data.total
                // this.data.page=response.data.pages
                // this.data=response.data
            })
          },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (params) {
                console.log(params);
               
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    onOk: () => {
                        // this.$Message.info('Clicked ok');
                        // console.log(params.row._id);                      
                         this.$http({
                          method:'delete',
                          url:`http://localhost:3000/${this.module}/data/${params.row._id}`
                        }).then(res=>{                         
                        this.$Message.info('Clicked ok');
                         this.getData();
                        })


                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                        // console.log(sha256(this.formValidate.password).toString());
                        this.formValidate.password=sha256(this.formValidate.password).toString()
                        //点击提交时进行ajax请求
                        this.$http({
                          method:'post',
                          url:`http://localhost:3000/${this.module}/data`,
                          data:this.formValidate
                        }).then(res=>{
                          this.getData();
                          this.$Message.success('Success!');
                          //c重置form表单内容为数据的初始值状态 非常重要
                          Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                          this.modal1=false
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            onchangepage(page){
                // console.log(page);
                this.data.page=page;
                this.$http({
                          method:'post',
                          url:`http://localhost:3000/${this.module}/list`,
                        data:this.data
                        //  data:{//无法对指定姓名的内容进行分类
                        //         limit:this.data.limit,
                        //         page:page
                        //         }
                            })
                            .then((response) => {
                            console.log(response.data);
                            this.data6=response.data.docs
                            this.data.total=response.data.total
                            // this.data.page=response.data.pages
                            // this.data=response.data
                        })
            },
            onpagesizechange(pageSize){
                this.data.limit=pageSize;
                this.getData()
            },
            search(){
                this.getData()
            }

        }
    
}