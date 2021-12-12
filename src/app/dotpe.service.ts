import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import { item, category } from 'src/app/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AngularFireModule } from '@angular/fire';
import { AuthInfo } from "src/app/auth-info";
import * as util from 'src/app/utils';
import { EmployeeModel } from "src/app/EmployeeModel";
@Injectable({
  providedIn: 'root'
})
export class DotpeService {
  employeeModel: EmployeeModel;
  item: item[];
  category: category[];
  id: string = '';
  itemId: string = '';
  user$: Observable<AuthInfo>;
  static context: any;



  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  private itemsCollection: AngularFirestoreCollection<item>;
  private itemsCollectionGroup: AngularFirestoreCollectionGroup;
  private itemsDocument: AngularFirestoreDocument<item>

  items: Observable<item[]>;
  products: Observable<item[]>;

  constructor(private afauth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,

  ) {
    this.itemsCollection = this.db.collection('items', ref => ref.orderBy("name"));
    // this.users = this.usersCollection.valueChanges()
    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as item;
        const itemId = data.id
        data.id = a.payload.doc.id;
        return data;
      })
    })
    )

    this.itemsCollectionGroup = db.collectionGroup('products')//,ref => ref.orderBy("name"));
    this.products = this.itemsCollectionGroup.snapshotChanges().pipe(map(changes => {
      return changes.map(b => {
        const data = b.payload.doc.data() as item;
        data.id = b.payload.doc.id;
        return data;
      })
    }))
    //    DotpeService.context = this;
    //   this.user$ = this.afauth.authState.pipe(
    //      switchMap(user => {
    //        if (user) {
    //          this.getUserFromDB(user.uid);
    //          return this.afauth.idTokenResult;
    //        } else {
    //          return of(null);
    //        }
    //      })
    //    );


  }

  logout() {
    //    this.router.navigate(["/authLayout"])
    this.afauth.signOut()
      .then(res => {
        //   this.getUserFromDB(res.user.uid);
        //     this.user$ = this.afauth.idTokenResult;
        this.router.navigate(['/login'])}
     )
  }

addCategory(category: category, categoryId) {
  categoryId = this.db.createId();
  console.log(categoryId);
  category['itemId'] = categoryId;
  this.db.collection('items').doc(categoryId).set(category);
}

addItem(item: item, itemId) {
  var productId = this.db.firestore.collection(itemId).id;
  // this.db.collection('items').doc('burgers').collection('id').add(item);
  item.id = productId;
  item['itemId'] = itemId;
  this.db.collection('items').doc(itemId).collection('products').add(item)
}

getItemId() {
  this.db.collection('items').get().subscribe
}


get currentUserObservable(): any {
  return this.afauth.authState;
}

login(email: string, password: string) {
  //return new Promise<any>((resolve, reject) => {

  this.afauth.signInWithEmailAndPassword(email, password).catch(error => {
    this.eventAuthError.next(error);
  })
    .then(res => {
      //   this.getUserFromDB(res.user.uid);
      //     this.user$ = this.afauth.idTokenResult;
      this.router.navigate(['/adminLayout']);
    }


    );

}
getItem() {
  return this.items;
}

getProducts() {
  return this.products;

}

deleteCategory(itemId){
  this.itemsDocument = this.db.collection('items').doc(itemId);
 this.itemsDocument.delete().catch(e => {
   console.log(e);

  })
}
deleteUser(itemId, productId) {
  this.itemsDocument = this.db.collection('items').doc(itemId).collection('products').doc(productId);
  //this.db.collection('items').doc('itemId').collection('products').doc(item).delete();
  //this.itemsDocument = this.db.doc(`items/itemId/products${item.id}`);
  this.itemsDocument.delete().catch(e => {
    console.log(e);

  });

}
getCategory(itemId){
 return this.db.collection('items').doc(itemId).get();
}
updateCategory(itemId, item){
  this.itemsDocument = this.db.collection('items').doc(itemId);
  this.itemsDocument.update(Object.assign({}, item)).catch(e => {
    console.log(e);
  })
}
updateitem(itemId, productId, item: item) {
  this.itemsDocument = this.db.collection('items').doc(itemId).collection('products').doc(productId);
  this.itemsDocument.update(Object.assign({}, item)).catch(e => {
    console.log(e);
  })
}
getUserFromDB(uid) {
  this.db
    .collection(util.employeeCollection).doc(uid)
    .valueChanges().subscribe((employeeModel: EmployeeModel) => {
      this.employeeModel = employeeModel;
      localStorage.setItem('employeeModel', JSON.stringify(this.employeeModel));

      //  if (!this.employeeModel.isActive) {
      //  this.logout();
      //this.toastr.error("Your account has been de-activated. Please contact admin for further information.")
      //     console.log("Your account has been de-activated. Please contact admin for further information.");

      // }
    })
}
}
