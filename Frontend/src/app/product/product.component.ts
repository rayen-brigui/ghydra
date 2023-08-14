import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Server_Url } from 'lib/ServerUrl';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products$: Observable<any[]>;
  displayedProducts: any[] = []; // Initialize here
  currentPage = 1;
  itemsPerPage = 1000000;
  isModalOpen = false;
  newProduct = {
    name: '',
    description: '',
    quantity: 0,
    location: '',
  };
  isEditModalOpen: boolean = false;
  editedProduct: any = {};
  constructor(private http: HttpClient) {
    // Initialize products$
    this.products$ = this.fetchProducts();
    this.products$.subscribe((products) => {
      this.displayedProducts = this.getDisplayedProducts(products);
    });
  }
  ngOnInit(): void {
    this.products$.subscribe((products) => {
      this.displayedProducts = this.getDisplayedProducts(products);
    });
  }
  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${Server_Url}/getAll`);
  }

  getDisplayedProducts(products: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return products.slice(startIndex, endIndex);
  }

  openAddProductModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  updateDisplayedProducts(): void {
    this.products$.subscribe((products) => {
      this.displayedProducts = this.getDisplayedProducts(products);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.displayedProducts.length / this.itemsPerPage);
  }

  addProduct(): void {
    // Perform API request to add newProduct
    //this.http.post<any[]>(`${Server_Url}/addProduct`, this.newProduct);
    const url = `${Server_Url}/addProduct`; // Replace with your actual API endpoint

    // Prepare the headers (if needed)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Make the POST request
    this.http.post(url, this.newProduct, { headers }).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        window.location.reload();
        // You can update your UI or perform other actions here
      },
      (error) => {
        console.error('Error adding product:', error);
        // Handle the error appropriately
      }
    );

    // Reset newProduct fields
    this.newProduct = {
      name: '',
      description: '',
      quantity: 0,
      location: '',
    };
    this.closeModal();
  }
  openEditModal(product: any): void {
    this.editedProduct = { ...product }; // Clone the product to avoid direct modification
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedProduct = {}; // Clear the edited product object
  }

  updateProduct(): void {
    const url = `${Server_Url}/updateProduct`; // Replace with your actual API endpoint

    // Prepare the headers (if needed)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Make the POST request
    this.http
      .post(url, this.editedProduct, { headers })
      .subscribe((response) => {
        console.log('Product updated:', response);
        this.updateDisplayedProducts();
        this.closeEditModal();
      });
  }
}
