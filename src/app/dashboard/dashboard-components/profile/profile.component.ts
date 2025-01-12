import { Component, OnInit } from '@angular/core';
import { DemoMaterialModule } from 'src/app/demo-material-module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DemoMaterialModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  constructor() { }
 email =''
  ngOnInit(): void {
   const storedEmail = localStorage.getItem('Email');
  this.email = storedEmail !== null ? storedEmail : '';  }

}
