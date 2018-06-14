import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-competitors-right-menu',
  templateUrl: './competitors-right-menu.component.html',
  styleUrls: ['./competitors-right-menu.component.scss']
})
export class CompetitorsRightMenuComponent implements OnInit {
  @Input() championships;

  private fragment: string;

  constructor(private route: ActivatedRoute) {
  }

  static onAnchorClick() {
    return true;
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) {
    }
  }

}
