import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router){

  }

  ngOnInit(){
    if (localStorage.getItem('user') != null)
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  user: User = null;

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });   
  }

  changePassword(){
    this.router.navigate(['user/change/password']).then(() => {
      window.location.reload();
    })
  }

  requests(){this.router.navigate(['admin/requests']);}
  firmBankAccounts(){this.router.navigate(['firm/bank-accounts']);}
  firmGeneralData(){this.router.navigate(['firm/general-data']);}
  firmStockroomsAndCashRegisters(){this.router.navigate(['firm/stockrooms-cash-registers']);}
  newPurchaser(){this.router.navigate(['firm/new-purchaser']);}
  allPurchasers(){this.router.navigate(['firm/all-purchasers']);}
  products(){this.router.navigate(['firm/products']);}
  createProductCategory(){this.router.navigate(['firm/product-create-category']);}
  setProductCategory(){this.router.navigate(['firm/product-add-to-category'])}
  createBill(){
    if (this.user.isShop == true)
      this.router.navigate(['firm/issue-a-bill'])
    else
      this.router.navigate(['firm/issue-a-bill-second'])
  }
  dailyEarnings(){this.router.navigate(['firm/daily-earnings']);}
  bills(){this.router.navigate(['firm/bill-report'])}
  newFirm(){this.router.navigate(['admin/new-firm'])}
  allFirms(){this.router.navigate(['admin/all-firms'])}
  newBuyer(){this.router.navigate(['admin/new-buyer']);}
  dailyReports(){this.router.navigate(['admin/daily-reports']);}
  buyer(){this.router.navigate(['buyer'])}
  buyerBills(){this.router.navigate(['buyer/bills']);}
  buyerSpending(){this.router.navigate(['buyer/spending'])}
  buyerSpendingYear(){this.router.navigate(['buyer/spending-year'])}
  tables(){this.router.navigate(['firm/tables']);}
}
