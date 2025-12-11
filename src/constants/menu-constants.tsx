export interface IRoutes {
  title: string;
  navItems: {
    icon: React.ReactNode;
    label: string;
    to: string;
  }[];
}

export const MENU_CONSTANTS: IRoutes[] = [
  {
    title: '메인',
    navItems: [
      {
        icon: <div>🏠</div>,
        label: '메인',
        to: '/',
      },
    ],
  },
];
