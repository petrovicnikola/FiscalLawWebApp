import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAllFirmsComponent } from './admin-all-firms/admin-all-firms.component';
import { AdminDailyReportsComponent } from './admin-daily-reports/admin-daily-reports.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminNewBuyerComponent } from './admin-new-buyer/admin-new-buyer.component';
import { AdminNewFirmComponent } from './admin-new-firm/admin-new-firm.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminComponent } from './admin/admin.component';
import { BuyerBillDetailsComponent } from './buyer-bill-details/buyer-bill-details.component';
import { BuyerBillsComponent } from './buyer-bills/buyer-bills.component';
import { BuyerFirmProductsComponent } from './buyer-firm-products/buyer-firm-products.component';
import { BuyerSpendingYearComponent } from './buyer-spending-year/buyer-spending-year.component';
import { BuyerSpendingComponent } from './buyer-spending/buyer-spending.component';
import { BuyerComponent } from './buyer/buyer.component';
import { EditCashRegisterComponent } from './edit-cash-register/edit-cash-register.component';
import { FirmAllPurchasersComponent } from './firm-all-purchasers/firm-all-purchasers.component';
import { FirmBankAccountsComponent } from './firm-bank-accounts/firm-bank-accounts.component';
import { FirmBillPayoutComponent } from './firm-bill-payout/firm-bill-payout.component';
import { FirmBillReportComponent } from './firm-bill-report/firm-bill-report.component';
import { FirmDailyEarningsComponent } from './firm-daily-earnings/firm-daily-earnings.component';
import { FirmEditBankAccountComponent } from './firm-edit-bank-account/firm-edit-bank-account.component';
import { FirmEditStockroomComponent } from './firm-edit-stockroom/firm-edit-stockroom.component';
import { FirmFirstLoginComponent } from './firm-first-login/firm-first-login.component';
import { FirmGeneralDataComponent } from './firm-general-data/firm-general-data.component';
import { FirmIssueBillSecondComponent } from './firm-issue-bill-second/firm-issue-bill-second.component';
import { FirmIssueBillComponent } from './firm-issue-bill/firm-issue-bill.component';
import { FirmNewPurchaserComponent } from './firm-new-purchaser/firm-new-purchaser.component';
import { FirmProductAddToCategoryComponent } from './firm-product-add-to-category/firm-product-add-to-category.component';
import { FirmProductCreateCategoryComponent } from './firm-product-create-category/firm-product-create-category.component';
import { FirmProductPriceComponent } from './firm-product-price/firm-product-price.component';
import { FirmProductComponent } from './firm-product/firm-product.component';
import { FirmStockroomsCashRegistersComponent } from './firm-stockrooms-cash-registers/firm-stockrooms-cash-registers.component';
import { FirmTablesComponent } from './firm-tables/firm-tables.component';
import { FirmUpdateProductComponent } from './firm-update-product/firm-update-product.component';
import { FirmComponent } from './firm/firm.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';

const routes: Routes = [
  {path: '', component: StartScreenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'admin/requests', component: AdminRequestsComponent},
  {path: 'admin/new-firm', component: AdminNewFirmComponent},
  {path: 'admin/all-firms', component: AdminAllFirmsComponent},
  {path: 'admin/new-buyer', component: AdminNewBuyerComponent},
  {path: 'admin/daily-reports', component: AdminDailyReportsComponent},
  {path: 'firm/first/login', component: FirmFirstLoginComponent},
  {path: 'user/change/password', component: UserChangePasswordComponent},
  {path: 'firm', component: FirmComponent},
  {path: 'firm/general-data', component: FirmGeneralDataComponent},
  {path: 'firm/bank-accounts', component: FirmBankAccountsComponent},
  {path: 'firm/stockrooms-cash-registers', component: FirmStockroomsCashRegistersComponent},
  {path: 'firm/edit-bank-account', component: FirmEditBankAccountComponent},
  {path: 'firm/edit-stockroom', component: FirmEditStockroomComponent},
  {path: 'firm/edit-cash-register', component: EditCashRegisterComponent},
  {path: 'firm/new-purchaser', component: FirmNewPurchaserComponent},
  {path: 'firm/all-purchasers', component: FirmAllPurchasersComponent},
  {path: 'firm/products', component: FirmProductComponent},
  {path: 'firm/update-product', component: FirmUpdateProductComponent},
  {path: 'firm/product-add-to-stockroom', component: FirmProductPriceComponent},
  {path: "firm/product-create-category", component: FirmProductCreateCategoryComponent},
  {path: "firm/product-add-to-category", component: FirmProductAddToCategoryComponent},
  {path: 'firm/issue-a-bill', component: FirmIssueBillComponent},
  {path: 'firm/bill-payout', component: FirmBillPayoutComponent},
  {path: 'firm/daily-earnings', component: FirmDailyEarningsComponent},
  {path: 'firm/bill-report', component: FirmBillReportComponent},
  {path: 'buyer', component: BuyerComponent},
  {path: 'buyer/firm-products', component: BuyerFirmProductsComponent},
  {path: 'buyer/bills', component: BuyerBillsComponent},
  {path: 'buyer/bill-details', component: BuyerBillDetailsComponent},
  {path: 'buyer/spending', component: BuyerSpendingComponent},
  {path: 'buyer/spending-year', component: BuyerSpendingYearComponent},
  {path: 'firm/tables', component: FirmTablesComponent},
  {path: 'firm/issue-a-bill-second', component: FirmIssueBillSecondComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
