import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Password} from 'primeng/password';
import {FormsModule, NgForm} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    Password,
    FloatLabel,
    InputText,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private loginService: LoginService, private router:Router) { }

  login(form: NgForm){
    const username = form.value.username;

    const password = form.value.password;

    let resp= this.loginService.login(username, password);
    resp.subscribe(data=>{
      this.router.navigate(['/depa']);
    })

    //this.loginService.getToken(username, password);
  }
  ngOnInit(): void {
  }
}
