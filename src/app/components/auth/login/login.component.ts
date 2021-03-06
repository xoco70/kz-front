import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {NavService} from '../../../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private navbar: NavService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private toastr: ToastrService) {
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.auth.logout();
    // if (this.route.snapshot.queryParams['welcome']) {
    //   setTimeout(() => {
    //     this.toastr.success('Register Successful, please login');
    //   });
    // }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.navbar.setLoading(true);
    this.auth.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.navbar.setLoading(false);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.navbar.setLoading(false);
        });
  }

  ngAfterViewInit(): void {
    if (this.route.snapshot.queryParams['welcome']) {
      this.toastr.success('Register Successful, please login');
    }
  }
}
