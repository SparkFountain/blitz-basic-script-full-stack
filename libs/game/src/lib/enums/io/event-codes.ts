export enum EventCode {
  KEY_DOWN = 0x101, // pressed a key down on the keyboard
  KEY_UP = 0x102, //released a key on the keyboard
  KEY_STROKE = 0x103, // typed a key
  MOUSE_DOWN = 0x201, // pressed a mouse button
  MOUSE_UP = 0x202, // released a mouse button
  MOUSE_MOVE = 0x203, // moved the mouse over a Canvas gadget
  GADGET_ACTION = 0x401, // interacted with a gadget
  WINDOW_MOVE = 0x801, // moved a window
  WINDOW_SIZE = 0x802, // changed the size of a window
  WINDOW_CLODE = 0x803, // closed a window
  WINDOW_ACTIVATE = 0x804, // selected a window
  MENU_EVENT = 0x1001, // selected from a menu
  APP_SUSPEND = 0x2001, // switched to another program
  APP_RESUME = 0x2002, // switched back to BlitzPlus program
  TIMER_TICK = 0x4001, // a timer message
}
