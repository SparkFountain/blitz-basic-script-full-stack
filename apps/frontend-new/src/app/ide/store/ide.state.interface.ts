export interface IdeState {
  windowActive: {
    scene: boolean;
    mainContainer: boolean;
    inspector: boolean;
    assets: boolean;
  };
  activeMainComponent: 'ui' | '3d' | 'editor';
  assetBreadcrumbs: string[];
}
