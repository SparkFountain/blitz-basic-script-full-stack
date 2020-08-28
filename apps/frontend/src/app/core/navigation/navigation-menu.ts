export class NavigationMenu {
  public icon: string;
  public name: string;
  public submenus: string[];

  constructor(icon: string, name: string, submenus: string[]) {
    this.icon = icon;
    this.name = name;
    this.submenus = submenus;
  }
}
