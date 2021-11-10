import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'app/service/user-auth.service';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    userRole: string[];
}

export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Tableau de bord', icon:'nc-icon nc-layout-11', userRole: ['SUPER_ADMINISTRATOR','ADMINISTRATOR','VALIDATOR'],   class: '',  },
    { path: '/users',     title: 'Utilisateurs',    icon:'fa fa-users',          userRole: ['SUPER_ADMINISTRATOR'],            class: '' },
    { path: '/fichiers',     title: 'Fichiers',        icon: 'fa fa-files-o',       userRole: ['ADMINISTRATOR'],  class: ''}
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    userRoles: any[];
    role: string;
    index: number;
    constructor(private userAuthService: UserAuthService,
                private router: Router){}

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.userRoles = this.userAuthService.getRoles();
        //récupération d'un seul rôle
        this.role = this.userRoles[0].name;

        // console.log(this.router.url);
    }

}
