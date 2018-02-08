<template>
  <div >
    <ButtonGroup>
        <Button type="primary" @click="modal1 = true">添加</Button>
        <Button type="error">删除多个</Button>
    </ButtonGroup>
    <Input v-model="data.name">     
        <Button slot="append" icon="ios-search" @click="search"></Button>
    </Input>
     <Modal
        v-model="modal1"
        title="数据信息"
        @on-ok="ok"
        @on-cancel="cancel">
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Title" prop="title">
                <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
            </FormItem>
          <FormItem label="分类Id" prop="cateId">
                <Input v-model="formValidate.cateId" placeholder="Enter your cateId"></Input>
            </FormItem>
            <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </Modal>


    <Tree :data="treeData" @on-select-change="onselectchange"></Tree>
    <Table border ref="selection" :columns="columns7" :data="data6"></Table>
    <Page :total="data.total" @on-change="onchangepage"
    @on-page-size-change="onpagesizechange"
     size="small" show-elevator show-sizer :page-size="data.limit"></Page>
    
    </div>
</template>
<script>
import Base from '../base';
    export default {
        mixins:[Base],
        data () {
            return {
                module:'news',
       formValidate: {
                    title: '',
                    cateId:0
       },
      
        ruleValidate: {
            name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ]
           
        },    
      treeData:[],
       columns7: [
              {
                  type: 'selection',
                  width: 60,
                  align: 'center'
              },
              {
                  title: 'Title',
                  key: 'title',
                  render: (h, params) => {
                      return h('div', [
                          h('Icon', {
                              props: {
                                  type: 'person'
                              }
                          }),
                          h('strong', params.row.title)
                      ]);
                  }
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
                                      this.show(params.index)
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
    },
  created(){
    this.getTree();
    
  },
  methods:{
    getTree(){
      this.$http.post('http://localhost:3000/cat/list/0')
      .then((res)=>{
        this.treeData=res.data
      })
    },
    
            onselectchange(node ){
              console.log(node);
              
              this.data.cateId=node[0]._id;
              this.formValidate.cateId=node[0]._id;
              this.getData()
            }

        }
    }

</script>
