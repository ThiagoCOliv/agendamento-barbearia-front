import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CardHeaderComponent } from "./commons/components/card-header/card-header.component";
import { filter, map, Subscription } from 'rxjs';
import { MenuBarComponent } from './commons/components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy
{
  title = 'agendamento-barbearia-front';

  private routeSubscription?: Subscription;

  constructor(private readonly router: Router, private readonly activedRoute: ActivatedRoute){}

  ngOnInit(): void 
  {
    this.routeSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => this.getRouteTitle(this.activedRoute)))
      .subscribe(title => this.title = title);
  }

  ngOnDestroy(): void 
  {
    if(this.routeSubscription)
    {
      this.routeSubscription.unsubscribe();
    }
  }

  private getRouteTitle(route: ActivatedRoute): string
  {
    let child = route;

    while(child.firstChild)
    {
      child = child.firstChild;
    }

    return child.snapshot.data['title'] || 'Defaut title';
  }
}
