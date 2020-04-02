const {http} =require('../../lib/http.js')
Page({
  updateId:'',
  updateIndex:'',
  data: {
    lists:[],
    visibleCreateConfirm:false,
    visibleUpdateConfirm:false,
    updateContent: ""
  },
  onShow(){
    http.get('/todos?completed=false').then(res =>{
      this.setData({lists:res.data.resources})
    })
  },
  confirmCreate(event){
    let content = event.detail
    if(content){
      http.post('/todos',{ 
          completed: false,description: content
      })
      .then(res => {
        let todo = [res.data.resource]
        this.data.lists = todo.concat(this.data.lists)
        this.setData({lists:this.data.lists})
        this.hideCreateConfirm()
      })
    }
  },
  hideUpdateConfirm(){
    this.setData({visibleUpdateConfirm:false})
  },
  showUpdateConfirm(){
    this.setData({visibleUpdateConfirm:true})
  },
  changeText(event){
    let {content,id,index} = event.currentTarget.dataset
    this.updateId = id
    this.updateIndex =index
    this.setData({visibleUpdateConfirm:true,updateContent:content})
  },
  confirmUpdate(event){
    let content = event.detail
    http.put(`/todos/${this.updateId}`,{
      description:content
    })
    .then(res => {
      let todo= res.data.resource
      this.data.lists[this.updateIndex] =todo
      this.setData({lists:this.data.lists})
      this.hideUpdateConfirm()
    })
  },
  finishTodo(event){   
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`,{
      completed:true
    })
    .then(res => {
      let todo= res.data.resource
      this.data.lists[index] =todo
      this.setData({lists:this.data.lists})
      
    })
  },
  hideCreateConfirm(){
    this.setData({visibleCreateConfirm:false})
  },
  showCreateConfirm(){
    this.setData({visibleCreateConfirm:true})
  }
})