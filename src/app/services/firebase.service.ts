import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  highestNumber: number;
  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  getRecipes(): Observable<any> {
    return this.firestore
      .collection('recipes', (ref) => ref.orderBy('created_at', 'desc'))
      .valueChanges();
  }

  getHighestNumber(): Observable<any> {
    return this.firestore
      .collection('recipes', (ref) => ref.orderBy('id', 'desc').limit(1))
      .valueChanges();
  }

  getNewestRecipes(): Observable<any> {
    return this.firestore
      .collection('recipes', (ref) =>
        ref.orderBy('created_at', 'desc').limit(3)
      )
      .valueChanges();
  }

  addRecipe(recipe: Recipe): void {
    this.getHighestNumber()
      .pipe(take(1))
      .subscribe((highestNumber) => {
        recipe.id = Number(highestNumber[0].id + 1);
        this.uploadImage(recipe.name, recipe.image);
        recipe.image = `recipes/${recipe.name}.png`;
        this.firestore.collection('recipes').add(recipe);
      });
  }

  deleteRecipe(name: string): void {
    this.getIdFromRecipeByName(name).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.firestore.collection('recipes').doc(`${doc.id}`).delete();
      });
    });
  }

  getIdFromRecipeByName(name: string): Observable<any> {
    return this.firestore
      .collection('recipes', (ref) => ref.where('name', '==', name))
      .get();
  }

  getRecipeById(id: number): Observable<any> {
    return this.firestore
      .collection('recipes', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }

  uploadImage(imageName: any, image: any): void {
    const filePath = `/recipes/${imageName}.png`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, image);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.updateImageUrl(url, imageName);
          });
        })
      )
      .subscribe();
  }

  updateImageUrl(url: string, name: string): void {
    this.getIdFromRecipeByName(name).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc: any) => {
        this.firestore.collection('recipes').doc(doc.id).update({
          image: url,
        });
      });
    });
  }
}
