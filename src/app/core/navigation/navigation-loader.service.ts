import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor(private readonly layoutService: VexLayoutService) {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([
      // {
      //   type: 'subheading',
      //   label: 'Dashboards',
      //   children: [
      //     {
      //       type: 'link',
      //       label: 'Company',
      //       route: '/dashboard/company',
      //       icon: 'mat:insights',
      //       routerLinkActiveOptions: { exact: true }
      //     },
      //     {
      //       type: 'link',
      //       label: 'Company',
      //       route: '/dashboard/company',
      //       icon: 'mat:insights',
      //       routerLinkActiveOptions: { exact: true }
      //     },
      //   ]
      // },
      {
        type: 'link',
        label: 'Dashboard',
        route: '/dashboard/analytics',
        icon: 'mat:dashboard',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Calendar',
        route: '/dashboard/calender',
        icon: 'mat:date_range',
        routerLinkActiveOptions: { exact: true }
      },
      {
        type: 'link',
        label: 'Company',
        route: '/dashboard/company',
        icon: 'mat:groups',
        routerLinkActiveOptions: { exact: true }
      },
      // {
      //   type: 'dropdown',
      //   label: 'Employee',
      //   icon: 'mat:contact_support',
      //   children: [
      //     {
      //       type: 'link',
      //       label: 'Directory',
      //       route: '/employee/directory'
      //     },
      //     {
      //       type: 'link',
      //       label: 'Employee',
      //       route: '/employee/employee'
      //     },
      //   ]
      // }
    ]);
  }
}
