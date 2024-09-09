type Role="admin"|"staff"//union
interface Product{
  id:number,
  price:number,
  quantity:number,
  category:string
}
interface User{
  id:number,
  username:string,
  role:Role,
  active:boolean
}
//we use type any , at places where we r not sure of the type of our variable
const products:Product[]=[{id:1,price:3400,quantity:3,category:"furniture"},
  {id:2,price:33400,quantity:1,category:"decoraation"},
  {id:3,price:3450,quantity:7,category:"electronics"}
]

const users:User[]=[{id:1,username:"eishahn",role:"staff",active:true},{id:2,username:"rayyangh",role:"admin",active:true},
  {id:3,username:"inaya2",role:"staff",active:false}
]

function removeProduct(ID:number){
const index=  products.findIndex((item)=>item.id===ID);
  products.splice(index,1)//1 element to remove
  

}
// update{
//   id?:number,
//   price?:number,
//   quantity?:number,
//   category?:string
// }
function updateProduct(ID:number,options?:{price:number,quantity:number,category:string}):void{
  const item=products.find((prod)=>prod.id===ID);
  if(item){
    Object.assign(item,options)
  }
  else{
    console.log("error updating product")
  }

}
function updateQuantity(ID:number,quant:number):void{// i used void here because this function has no return type
  const item=products.find((prod)=>prod.id===ID);
  if(item){
    item.quantity==quant;
  }
  else{
    console.log("no such item exist")
  }

}
//Calculate the total value of products in a specific category.
function total_value(sp_category:string):number{//return type is set to number because we r returninh number here
  let sum:number=0;
  const item=products.filter((prod)=>prod.category===sp_category);//filter gives more than 1 prod, it basically returns an array 
  if(item){
   sum=item.reduce((total,prod)=>total+prod.price*prod.quantity,0)
  
}
return sum
}
//Log all products in inventory, with optional filters for categories or price ranges.
function log_products(options?:{id:number,price:number,quantity:number,category:string}){
  let logged_products:Product[]=products
  if(options?.id && Array.isArray(logged_products)){

    logged_products=products.find((prod)=>prod.id===options?.id);//find only returns 1 item
 
  }
  else if(options?.category){

    logged_products=products.filter((prod)=>prod.category===options?.category);//find only returns 1 item
    
 
  }
  else if(options?.price){

    logged_products=products.filter((prod)=>prod.price===options?.price);//find only returns 1 item
 
  }
  else if(options?.quantity){

    logged_products=products.filter((prod)=>prod.quantity===options?.quantity);//find only returns 1 item
    
 
  }
  else{
    console.log("cannot find logs of this filter")
  }
  
}
//Q :Explain the difference between a type alias and an interface in your comments.
//Ans: interface is basically an object , defines how an object looks
//type is mostly used when we r using union or intersections
//type cannot be edited, once defined whereas interface can be edited
//type is used when destructuring:both
//iin type we can use nested properties:both
//interface can only be used with objects
//cannot do union with interface

// //sorting products on basis of price
// function sort_price(){
//   products.sort()

// }
//Implement a function that uses rest parameters to handle batch updates to products (e.g., updating quantities for multiple products in one call).
function batchUpdate(...updating_items:{id:number,price:number,quantity:number,category:string}[]){
updating_items.forEach((change)=>{
  const item=products.find((prod)=>prod.category===change.category)
  const item1=products.find((prod)=>prod.quantity===change.quantity)
  const item2=products.find((prod)=>prod.price===change.price)

  if (item){
    item.category=change.category
  }
  else if(item1){
    item1.quantity=change.quantity
  }
  else if(item2){
    item2.price=change.price
  }
  else{
    console.log("error in batch update")
  }

} )
}