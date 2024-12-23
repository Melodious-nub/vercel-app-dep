import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VexBreadcrumbsComponent } from "../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexPageLayoutComponent } from "../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { VexPageLayoutHeaderDirective } from "../../../@vex/components/vex-page-layout/vex-page-layout-header.directive";
import { VexPageLayoutContentDirective } from "../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { PageLayoutDemoComponent } from "../../pages/ui/page-layouts/page-layout-demo/page-layout-demo.component";
import { MATERIAL_IMPORTS } from 'src/app/material-imports';
import { AccountGeneralComponent } from './account-general/account-general.component';
import { AccountSecurityComponent } from "./account-security/account-security.component";
import { AccountAdminsComponent } from "./account-admins/account-admins.component";

@Component({
  selector: 'vex-account-settings',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS, VexPageLayoutComponent, VexPageLayoutHeaderDirective, VexPageLayoutContentDirective, AccountGeneralComponent, AccountSecurityComponent, AccountAdminsComponent],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {


}
