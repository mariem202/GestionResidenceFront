import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  roles: string[];
}

const MENUITEMS = [
   { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer', roles: ['Admin'] },
  { state: 'Etudiants', name: 'Admin. Gérer Etudiants', type: 'link', icon: 'view_list', roles: ['Admin'] },
  { state: 'Chambres', name: 'Admin. Gérer Chambres', type: 'link', icon: 'view_list', roles: ['Admin'] },
  { state: 'Employee', name: 'Admin. Gérer Employee', type: 'link', icon: 'view_list', roles: ['Admin'] },
  { state: 'sugg', name: 'Admin. Gérer sugg', type: 'link', icon: 'view_list', roles: ['Admin'] },
  { state: 'EtudDetails', name: 'Etudiants.Crée carte', type: 'link', icon: 'tab', roles: ['Etudiant'] },

  { state: 'Carte', name: 'Etudiants.Crée carte', type: 'link', icon: 'tab', roles: ['Etudiant'] },

  { state: 'AddPleinte', name: 'Etudiants.plainte', type: 'link', icon: 'tab', roles: ['Etudiant'] },
  { state: 'Paiement', name: 'Admin.Paiment', type: 'link', icon: 'tab', roles: [ 'Admin'] },
  { state: 'Pleinte', name: 'Manager.pleinte', type: 'link', icon: 'tab', roles: ['Employee'] },
  // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  // { state: 'Etudiants', type: 'link', name: 'Admin. Gérer Etudiants', icon: 'view_list' },
  // { state: 'Chambres', type: 'link', name: 'Admin. Gérer Chambres', icon: 'view_list' },
  // { state: 'Employee', type: 'link', name: 'Admin. Gérer Employee', icon: 'view_list' },
  // { state: 'sugg', type: 'link', name: 'Admin. Gérer sugg', icon: 'view_list' },
  // { state: 'Carte', type: 'link', name: 'Etudiants.Crée carte', icon: 'tab' },
  // { state: 'AddPleinte', type: 'link', name: 'Etudiants.plainte', icon: 'tab' },
  // { state: 'Profile', type: 'link', name: 'Profile', icon: 'tab' }, 
  // { state: 'Pleinte', type: 'link', name: 'Manager.pleinte', icon: 'tab' }, 
  // { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  // {
  //   state: 'expansion',
  //   type: 'link',
  //   name: 'Expansion Panel',
  //   icon: 'vertical_align_center'
  // },
  // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  // {
  //   state: 'progress-snipper',
  //   type: 'link',
  //   name: 'Progress snipper',
  //   icon: 'border_horizontal'
  // },
  // {
  //   state: 'progress',
  //   type: 'link',
  //   name: 'Progress Bar',
  //   icon: 'blur_circular'
  // },
  // {
  //   state: 'dialog',
  //   type: 'link',
  //   name: 'Dialog',
  //   icon: 'assignment_turned_in'
  // },
  // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  // {
  //   state: 'slide-toggle',
  //   type: 'link',
  //   name: 'Slide Toggle',
  //   icon: 'all_inclusive'
  // }
];

@Injectable()
export class MenuItems {
  // getMenuitem(): Menu[] {
  //   return MENUITEMS;
  // }

   getMenuitem(): Menu[] {
    const currentUserRole = localStorage.getItem('Role')|| 'Guest'; // Get the current user's role dynamically
    return MENUITEMS.filter(item => item.roles.includes(currentUserRole));
  }
   // Function to set the current user's role
  
}
