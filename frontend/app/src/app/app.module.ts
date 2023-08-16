import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FirmFirstLoginComponent } from './firm-first-login/firm-first-login.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { FirmComponent } from './firm/firm.component';
import { FirmGeneralDataComponent } from './firm-general-data/firm-general-data.component';
import { FirmBankAccountsComponent } from './firm-bank-accounts/firm-bank-accounts.component';
import { FirmStockroomsCashRegistersComponent } from './firm-stockrooms-cash-registers/firm-stockrooms-cash-registers.component';
import { FirmEditBankAccountComponent } from './firm-edit-bank-account/firm-edit-bank-account.component';
import { FirmEditStockroomComponent } from './firm-edit-stockroom/firm-edit-stockroom.component';
import { EditCashRegisterComponent } from './edit-cash-register/edit-cash-register.component';
import { FirmNewPurchaserComponent } from './firm-new-purchaser/firm-new-purchaser.component';
import { FirmAllPurchasersComponent } from './firm-all-purchasers/firm-all-purchasers.component';
import { FirmProductComponent } from './firm-product/firm-product.component';
import { FirmUpdateProductComponent } from './firm-update-product/firm-update-product.component';
import { FirmProductPriceComponent } from './firm-product-price/firm-product-price.component';
import { FirmProductCreateCategoryComponent } from './firm-product-create-category/firm-product-create-category.component';
import { FirmProductAddToCategoryComponent } from './firm-product-add-to-category/firm-product-add-to-category.component';
import { FirmProductCategoryDialogComponent } from './firm-product-category-dialog/firm-product-category-dialog.component';
import { FirmIssueBillComponent } from './firm-issue-bill/firm-issue-bill.component';
import { FirmBillProductAmountComponent } from './firm-bill-product-amount/firm-bill-product-amount.component';
import { FirmBillPayoutComponent } from './firm-bill-payout/firm-bill-payout.component';
import { FirmDailyEarningsComponent } from './firm-daily-earnings/firm-daily-earnings.component';
import { FirmBillReportComponent } from './firm-bill-report/firm-bill-report.component';
import { AdminNewFirmComponent } from './admin-new-firm/admin-new-firm.component';
import { AdminAllFirmsComponent } from './admin-all-firms/admin-all-firms.component';
import { AdminNewBuyerComponent } from './admin-new-buyer/admin-new-buyer.component';
import { AdminDailyReportsComponent } from './admin-daily-reports/admin-daily-reports.component';
import { BuyerComponent } from './buyer/buyer.component';
import { BuyerFirmProductsComponent } from './buyer-firm-products/buyer-firm-products.component';
import { BuyerBillsComponent } from './buyer-bills/buyer-bills.component';
import { BuyerBillDetailsComponent } from './buyer-bill-details/buyer-bill-details.component';
import { BuyerSpendingComponent } from './buyer-spending/buyer-spending.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BuyerSpendingYearComponent } from './buyer-spending-year/buyer-spending-year.component';
import { FirmTablesComponent } from './firm-tables/firm-tables.component';
import { FirmTableDialogComponent } from './firm-table-dialog/firm-table-dialog.component';
import { FirmTableRoomDialogComponent } from './firm-table-room-dialog/firm-table-room-dialog.component';
import { FirmTableMoveDialogComponent } from './firm-table-move-dialog/firm-table-move-dialog.component';
import { FirmIssueBillSecondComponent } from './firm-issue-bill-second/firm-issue-bill-second.component';
import { FirmBillTableDialogComponent } from './firm-bill-table-dialog/firm-bill-table-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { FirmDeleteProductDialogComponent } from './firm-delete-product-dialog/firm-delete-product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AdminRequestsComponent,
    AdminLoginComponent,
    FirmFirstLoginComponent,
    UserChangePasswordComponent,
    FirmComponent,
    FirmGeneralDataComponent,
    FirmBankAccountsComponent,
    FirmStockroomsCashRegistersComponent,
    FirmEditBankAccountComponent,
    FirmEditStockroomComponent,
    EditCashRegisterComponent,
    FirmNewPurchaserComponent,
    FirmAllPurchasersComponent,
    FirmProductComponent,
    FirmUpdateProductComponent,
    FirmProductPriceComponent,
    FirmProductCreateCategoryComponent,
    FirmProductAddToCategoryComponent,
    FirmProductCategoryDialogComponent,
    FirmIssueBillComponent,
    FirmBillProductAmountComponent,
    FirmBillPayoutComponent,
    FirmDailyEarningsComponent,
    FirmBillReportComponent,
    AdminNewFirmComponent,
    AdminAllFirmsComponent,
    AdminNewBuyerComponent,
    AdminDailyReportsComponent,
    BuyerComponent,
    BuyerFirmProductsComponent,
    BuyerBillsComponent,
    BuyerBillDetailsComponent,
    BuyerSpendingComponent,
    BuyerSpendingYearComponent,
    FirmTablesComponent,
    FirmTableDialogComponent,
    FirmTableRoomDialogComponent,
    FirmTableMoveDialogComponent,
    FirmIssueBillSecondComponent,
    FirmBillTableDialogComponent,
    FooterComponent,
    FirmDeleteProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
