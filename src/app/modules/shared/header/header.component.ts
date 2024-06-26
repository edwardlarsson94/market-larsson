import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginComponent } from '../../auth/login/login.component';
import { DrawerComponent } from '../../cart/drawer/drawer.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RecipeComponent } from '../../recipe/recipe.component';
export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FormsModule,
    NzButtonModule,
    NzAutocompleteModule,
    NzIconModule,
    NzInputModule,
    LoginComponent,
    DrawerComponent,
    NzModalModule,
    RecipeComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [];
  isVisible:boolean = false;
  isFooter:any = null;

  onChange(value: string): void {
    console.log(value);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.optionGroups = [
        {
          title: '话题',
          children: [
            {
              title: 'AntDesign',
              count: 10000
            },
            {
              title: 'AntDesign UI',
              count: 10600
            }
          ]
        },
        {
          title: '问题',
          children: [
            {
              title: 'AntDesign UI 有多好',
              count: 60100
            },
            {
              title: 'AntDesign 是啥',
              count: 30010
            }
          ]
        },
        {
          title: '文章',
          children: [
            {
              title: 'AntDesign 是一个设计语言',
              count: 100000
            }
          ]
        }
      ];
    }, 1000);
  }

  openRecipe(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor() {}
}