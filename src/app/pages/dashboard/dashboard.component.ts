import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { DotpeService } from 'src/app/dotpe.service';
import { item, category } from 'src/app/item'
import { AngularFireStorage } from '@angular/fire/storage'


import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  closeResult = '';
  downloadURL: Observable<string>;
  logoURL: Observable<string>;
  profileUrl: Observable<string | null>;
  itemId: string = " ";
  productId: string = ''
  file: any = null;
  items: category[];
  products: item[];


  addCategory = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  addItem = new FormGroup({
    category: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    imagePath: new FormControl(''),


  })
  editCategory = new FormGroup({
    name: new FormControl('', Validators.required)
  });


  editItem = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    imagePath: new FormControl(''),

  })

  constructor(private modalService: NgbModal,
    private itemService: DotpeService, private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.itemService.getItem().subscribe(items => {
      console.log(items);
      this.items = items;

   })

    this.itemService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;

    })

    //this.itemService.getCategory(this.router.snapshot.params.itemId).subscribe((result) => {
    //  console.log(result);

    // });


  }
  open(content, item ) {
    this.itemId = item.itemId;
    //this.productId = product.itemId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.editCategory.patchValue({
      name: item.name
    })
    this.editItem.patchValue({
      name: item.name,
     type: item.type,
     price: item.price
   })
  }
  open1(content, itemId ) {
    this.itemId = itemId;
    //this.productId = product.itemId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
uploadLogo(){const filePath = 'logo/' + new Date().getTime();
const ref = this.storage.ref(filePath);
const task = this.storage.upload(filePath, this.file);
task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
  //Fetch the download URL of the Storage file
  uploadSnapshot.ref.getDownloadURL().then(async (downloadURL) => {
    this.logoURL = downloadURL
  //  this.addItem.value.imagePath = this.downloadURL;
    console.log(this.logoURL);
 } )
})}

  async uploadFile(event) {
    if (event.target != undefined) {
      this.file = event.target.files[0];
    }


  }
  addcategory() {
    this.itemService.addCategory(this.addCategory.value, this.itemId);
    this.addCategory.reset();
    this.modalService.dismissAll();
  }

  async additem(event, itemId, productId) {


    const filePath = 'items/' + new Date().getTime();
    const ref = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, this.file);

    task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

      //Fetch the download URL of the Storage file
      uploadSnapshot.ref.getDownloadURL().then(async (downloadURL) => {
        this.downloadURL = downloadURL
        this.addItem.value.imagePath = this.downloadURL;
        console.log(downloadURL);
        console.log(this.addItem.value);


        this.itemService.addItem(this.addItem.value, this.itemId);
        this.addItem.reset();
        this.modalService.dismissAll();

      })
    }



 );


  }
  deletecategory(itemId) {
    console.log(itemId);

    this.itemService.deleteCategory(itemId);
    this.modalService.dismissAll();
  }



  deleteProduct(itemId, productId) {
    console.log(itemId, productId)
    this.itemService.deleteUser(itemId, productId)
    this.modalService.dismissAll();
  }
  updateCategory(itemId) {
    //console.log(itemId);
    this.addCategory.patchValue({
      name: this.addCategory.value.name
    })
    this.itemService.updateCategory(itemId, this.editCategory.value);
    this.editCategory.reset();
    this.modalService.dismissAll();


  }
  updateItem(itemId, productId) {

    const filePath = 'update-items/' + new Date().getTime();
    const ref = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, this.file);

    task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

      //Fetch the download URL of the Storage file
      uploadSnapshot.ref.getDownloadURL().then(async (downloadURL) => {
        this.downloadURL = downloadURL
        this.editItem.value.imagePath = this.downloadURL;
        console.log(downloadURL);

      })


      console.log(itemId, productId);


      this.itemService.updateitem(itemId, productId, this.editItem.value)
      this.editItem.reset();
      this.modalService.dismissAll();


    }

    )
  }
}

