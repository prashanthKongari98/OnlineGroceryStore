import { Component, OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAddNewProdBtnClicked: boolean = false;
  isAddNewCatBtnClicked: boolean = false;
  isEditProductBtnClicked: boolean = false;
  product: any;
  selectedCategories: string[] = [];
  price_Per_Each: any;
  previous_Price: any;
  products: any ;
  categories: any;
  isDropdownOpen = false;
  quantityValue: any;
  selectedCategory: any;
  product_URL:any;
  name: any;
  isAvaliable: any;
  isCatReturnable: any = null;



  constructor(public loginService: LoginService, private productService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.isAddNewProdBtnClicked = false;
    this.isEditProductBtnClicked = false;
    if(this.loginService.isCustomer || this.loginService.isAdmin){
     this.getCategories();
     
    }
  }

  getCategories(){
    this.productService.getCategories().subscribe((resProd)=>{
      this.categories = resProd;
      this.productService.getProducts().subscribe((res)=>{
        this.products = res;
        this.products.forEach((c: any)=> {c.quantity = 1;c.isEditProductBtnClicked = false});
        this.products = this.loginService.isCustomer ? this.products.filter((c: any)=> c.availability == 'Yes') : this.products;
      })
    })
  }

  onProductAddSubmit(item: any = null): void {
    if(item && item.isEditProductBtnClicked){
     item.price_Per_Each = "$" + this.price_Per_Each + "/oz";
      this.productService.editProduct(item).subscribe((res)=>{
        this.productService.getProducts().subscribe((res)=>{
          this.products = res;
          this.price_Per_Each = null;
          this.products.forEach((c: any)=> {c.quantity = 1;c.isEditProductBtnClicked = false});
          this.products = this.loginService.isCustomer ? this.products.filter((c: any)=> c.availability == 'Yes') : this.products;
          this.isEditProductBtnClicked = false;
        })
      })
    }
    else{
      this.product ={
        name: this.name,
        price_Per_Each : "$" + this.price_Per_Each + "/oz",
        product_Url : this.product_URL,
        category: this.selectedCategory
      }
      this.productService.addProduct(this.product).subscribe((res)=>{
        if(res){
          this.productService.getProducts().subscribe((res)=>{
            this.products = res;
            this.products.forEach((c: any)=> {c.quantity = 1;c.isEditProductBtnClicked = false});
            this.products = this.loginService.isCustomer ? this.products.filter((c: any)=> c.availability == 'Yes') : this.products;
            this.isAddNewProdBtnClicked = false;
          })
        }
       })
    }
 
  }

  onCategoryChange(event: any): void {
    var categoryId = event.target.value;
    const index = this.selectedCategories.indexOf(categoryId);
    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryId);
    }

    var selectedCategoriesName : any = [];
    this.selectedCategories.forEach((item: any) => {
     if(this.categories.findIndex((c: any)=> c._id == item) != -1){
      var categoryName = this.categories.find((c: any)=> c._id == item).categoryName;
      selectedCategoriesName.push(categoryName.trim());
     }
    });
    if(selectedCategoriesName && selectedCategoriesName.length > 0){
    this.productService.getProductsByCategories(selectedCategoriesName).subscribe(products => {
      this.products = products;
      this.products.forEach((c: any)=> {c.quantity = 1;c.isEditProductBtnClicked = false});
      this.isDropdownOpen = !this.isDropdownOpen;
      this.products = this.loginService.isCustomer ? this.products.filter((c: any)=> c.availability == 'Yes') : this.products;
    });
  }
  else{
    this.productService.getProducts().subscribe((res)=>{
      this.products = res;
      this.products.forEach((c: any)=> {c.quantity = 1;c.isEditProductBtnClicked = false});
      this.products = this.loginService.isCustomer ? this.products.filter((c: any)=> c.availability == 'Yes') : this.products;
      this.isDropdownOpen = !this.isDropdownOpen;
    })
  }

  }

  editProduct(product: any){
    this.products.forEach((c: any)=> {c.quantity = 1;c.isEditProductBtnClicked = false});
    product.isEditProductBtnClicked = true;
    this.product = product;
    this.price_Per_Each = Number(product.price_Per_Each.split('/')[0].split('$')[1]);
  }


  onCatAddSubmit(){
var body ={
  categoryName : this.name,
isReturnable: this.isCatReturnable
}
this.productService.addCategory(body).subscribe((res)=>{
  if(res){   
    this.getCategories();
    this.isAddNewProdBtnClicked = false;
    this.isAddNewCatBtnClicked = false;
    this.name = null;
    this.isCatReturnable = null;
    
  }
 })

  }

  addNewProdBtnClicked(){
    this.isAddNewProdBtnClicked = true;
  }

  addNewCatBtnClicked(){
    this.isAddNewCatBtnClicked = true;
  }

  onFileSelected(event: any) {
    const selectedFile : File = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onload = (res : any)=>{
     this.product_URL = res.target.result;
    }
  }

  OnRadioBtnChange(event: any, item: any){
    item.availability  = event.target.value;
  }


  OnRadioBtnForIsRetChange(event: any){
    this.isCatReturnable  = event.target.value;
  }

  backClicked(){
    this.resetFields();
    this.isAddNewProdBtnClicked = false;
    this.isAddNewCatBtnClicked = false;
    this.name = null;
    this.isCatReturnable = null;
  }

  resetFields(){
    this.name = null;
    this.price_Per_Each = null;
    this.previous_Price = null;
    this.selectedCategory = null;
  }

  
cancel(item: any){
  this.price_Per_Each = null;
  item.isEditProductBtnClicked = false;
}


  addToCart(item : any) {
    var body = item;
    
    body["productId"]= item._id
    body["_id"]= null;
    body["quantity"]=  item.quantity;
    body["customerEmail"] = this.loginService.profileDetails.email;
    this.productService.addToCart(body).subscribe((res)=>{
      this.router.navigateByUrl('/cart');
    })
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCategorySelect(event: any){
    var categoryId = event.target.value;
    this.selectedCategory = this.categories.find((c: any)=> c._id == categoryId).categoryName;

  }
}