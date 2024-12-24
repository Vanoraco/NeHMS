import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HMS Frontend';
  userRole: any;
  constructor(
    private elementRef: ElementRef,
    public _router: Router,
    public route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);

    const storedData = localStorage.getItem('Role');

    if (storedData) {
      
      this.userRole = storedData;
      console.log(this.userRole) // Assuming 'role' is stored in the patientData object
    }
  }
  checkPath(path: string): boolean {
    return this._router.config.some((route) => route.path === path);
  }
}
