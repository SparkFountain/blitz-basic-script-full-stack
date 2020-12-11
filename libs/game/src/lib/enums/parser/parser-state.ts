export enum ParserState {
  INITIAL = 'Initial',
  DECLARATION = 'Declaration', // Variable declarations like `Global test`
  ASSIGNMENT = 'Assignment', // Variable assignments like `test = 123`
  COMMAND_CALL = 'Command Call', // Native command call like `Graphics()` or `AppTitle()`
  LABEL = 'Label', // Label definition like `.level1`
  LOOP_HEAD = 'Loop Head', //
  LOOP_BREAK = 'Loop Break', //
  LOOP_END = 'Loop End', //
  CONDITION_HEAD = 'Condition Head', //
  CONDITION_END = 'Condition End', //
  SELECTION_HEAD = 'Selection Head', //
  SELECTION_BODY = 'Selection Body', //
  SELECTION_END = 'Selection End', //
  FUNCTION_HEAD = 'Function Head', //
  FUNCTION_RETURN = 'Function Return', // Return statement of a function like `Return x*y`
  FUNCTION_END = 'Function End', //
  FUNCTION_CALL = 'Function Call', //
  TYPE_HEAD = 'Type Head', //
  TYPE_BODY = 'Type Body', //
  TYPE_END = 'Type End', //
  OBJECT_DELETION = 'Object Deletion', //
  OBJECT_INSERTION = 'Object Insertion', //
  INCLUDE = 'Include', // Include statement like `Include "gui.bbs"`
  DEBUG_STOP = 'Debug Stop', //
  DATA_DEFINITION = 'Data Definition', // Definition of a Data block like `Data 42,0,8,"alien"`
  RESTORE_DATA = 'Restore Data', // Statement to restore a data block like `Restore .level1`
  READ_DATA = 'Read Data', //
  MAIN_LOOP_HEAD = 'Main Loop Head', // Begin of Main Loop statement: `MainLoop`
  MAIN_LOOP_END = 'Main Loop End', // End of Main Loop statement: `End MainLoop`
  QUIT_PROGRAM = 'Quit Program' // Statement to quit the whole program: `End`
}
