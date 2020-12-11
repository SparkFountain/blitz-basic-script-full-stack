<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
  // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
  // whitelist of safe domains
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400'); // cache for 1 day
}

$method = $_SERVER['REQUEST_METHOD'];

// Access-Control headers are received during OPTIONS requests
if ($method == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  }

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    header('Access-Control-Allow-Headers: ' . $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]);
  }
}

/* RESPONSE HEADER */
header('Content-Type: application/json; charset=utf-8');

/* GET URL SECTIONS */
$urlWithoutGetParams = strtok(strtolower($_SERVER['REQUEST_URI']), '?');
$urlSection = explode('/', $urlWithoutGetParams);
unset($urlSection['0']); //remove first section, which is always empty

/* DATABASE CONNETION */
$servername = 'localhost:3306';
$username = 'bbscript';
$password = 'VGcJTIivr3k9YSnr6kk3';
$dbname = 'bbscript-language';

/* DATABASE 1: Web */
$dbWeb = new mysqli($servername, $username, $password, 'bbscript-web');
// Check connection
if ($dbWeb->connect_error) {
  die('Connection failed: ' . $dbWeb->connect_error);
}
$dbWeb->set_charset('utf8');

/* DATABASE 2: BBScript Language */
$dbLanguage = new mysqli($servername, $username, $password, 'bbscript-language');
// Check connection
if ($dbLanguage->connect_error) {
  die('Connection failed: ' . $dbLanguage->connect_error);
}
$dbLanguage->set_charset('utf8');

/* RESPONSE STATUS CODES */
define('STATUS_SUCCESS', 'success');
define('STATUS_ERROR', 'error');
define('STATUS_FAIL', 'fail');

/* FILE SERVER */
define('FILE_SERVER', 'https://files.blitzbasicscript.com');

/* MAIL SERVER */
define('MAIL_SERVER', 'https://mail.blitzbasicscript.com');

/* BASE DIRECTORY FOR FILE ACCESS */
$baseDir = '/var/www/web23388256/html/bbscript/files/';
$sharedDir = '/var/www/web23388256/files/BlitzBasicScript/shared/';

if ($method == 'GET') {
  switch ($urlSection['1']) {
  case 'commands-as-json':
    $response = array();
    $subCategoryTable = array();

    // get command categories
    $sql = "SELECT * FROM command_category ORDER BY id";
    $result = $dbLanguage->query($sql);
    while ($row = $result->fetch_assoc()) {
      if ($row['parent'] === NULL) {
        array_push($response, array(
          'title' => array(
            'de' => $row['title_de'],
            'en' => $row['title_en'],
          ),
          'description' => array(
            'de' => $row['description_de'],
            'en' => $row['description_en'],
          ),
          'path' => array(
            'de' => $row['path_de'],
            'en' => $row['path_en'],
          ),
          'subCategories' => array(),
        ));
      } else {
        $subCategoryTable[$row['id']] = $row['parent'];

        array_push($response[$row['parent'] - 1]['subCategories'], array(
          'title' => array(
            'de' => $row['title_de'],
            'en' => $row['title_en'],
          ),
          'description' => array(
            'de' => $row['description_de'],
            'en' => $row['description_en'],
          ),
          'path' => array(
            'de' => $row['path_de'],
            'en' => $row['path_en'],
          ),
          'commands' => array(),
        ));
      }
    }

    // get commands and parameters
    $sql = "SELECT * FROM command WHERE category <> 0 AND sub_category <> 0";
    $result = $dbLanguage->query($sql);
    while ($row = $result->fetch_assoc()) {
      $innerSql = "SELECT * FROM command_parameter WHERE command_id = " . $row['id'] . " ORDER BY offset";
      $innerResult = $dbLanguage->query($innerSql);
      $params = array();
      while ($innerRow = $innerResult->fetch_assoc()) {
        array_push($params, array(
          'name' => $innerRow['name'],
          'description' => array(
            'de' => $innerRow['description_de'],
            'en' => $innerRow['description_en'],
          ),
          'optional' => $innerRow['optional'] ? true : false,
        ));
      }

      array_push($response[$row['category'] - 1]['subCategories'][$subCategoryTable[$row['sub_category']] - 1]['commands'], array(
        'name' => $row['name'],
        'description' => array(
          'de' => $row['description_de'],
          'en' => $row['description_en'],
        ),
        'parameters' => $params,
        'return' => array(
          'name' => $row['return_name'],
          'description' => array(
            'de' => $row['return_description_de'],
            'en' => $row['return_description_en'],
          ),
        ),
        'code' => $row['code'],
        'deprecated' => $row['deprecated'],
      ));
    }

    die(json_encode($response));
  case 'keywords-as-json':
    $response = array();

    // get keyword categories and categories
    $sql = "SELECT * FROM keyword_category ORDER BY id";
    $result = $dbLanguage->query($sql);
    while ($row = $result->fetch_assoc()) {
      $keywords = array();
      $innerSql = "SELECT * FROM keyword WHERE deprecated = 0 AND category_id = " . $row['id'] . " ORDER BY id";
      $innerResult = $dbLanguage->query($innerSql);
      while ($innerRow = $innerResult->fetch_assoc()) {
        array_push($keywords, array(
          'name' => $innerRow['name'],
        ));
      }

      array_push($response, array(
        'title' => array(
          'de' => $row['title_de'],
          'en' => $row['title_en'],
        ),
        'description' => array(
          'de' => $row['description_de'],
          'en' => $row['description_en'],
        ),
        'path' => array(
          'de' => $row['path_de'],
          'en' => $row['path_en'],
        ),
        'keywords' => $keywords,
      ));
    }

    die(json_encode($response));
  case 'news':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'total-pages':
        $sql = "SELECT COUNT(id) as `totalPages` FROM `news`";
        $result = $dbWeb->query($sql);

        while ($row = $result->fetch_assoc()) {
          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => ceil($row['totalPages'] / 10))));
        }
      }
    } else {
      $language = $_GET['language'];

      // get total news
      $sql = "SELECT COUNT(id) as `totalNews` FROM `news`";
      $result = $dbWeb->query($sql);

      $totalNews;
      while ($row = $result->fetch_assoc()) {
        $totalNews = $row['totalNews'];
      }

      $sql = "SELECT n.`title_$language` as `title`, n.`message_$language` as `message`, u.`name` as `author`, n.`created_at` as `createdAt`, n.`last_modified_at` as `lastModifiedAt`, n.`image_url` as `imageUrl` ";
      $sql .= "FROM `news` n, `user` u ";
      $sql .= "WHERE n.`author` = u.`id` ";
      $sql .= "AND n.`id` >= " . ($totalNews - $_GET['page'] * 10 + 1) . " AND n.`id` <= " . ($totalNews - ($_GET['page'] - 1) * 10) . " ORDER BY n.`id` DESC";
      $result = $dbWeb->query($sql);

      $response = array();
      while ($row = $result->fetch_assoc()) {
        array_push($response, $row);
      }
      die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $response)));
    }
  case 'auth':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'username-exists':
        $checkIfUserExistsSql = 'SELECT u.id FROM user u WHERE u.name = \'' . $_GET['username'] . '\'';
        $result = $dbWeb->query($checkIfUserExistsSql);
        if ($result) {
          if ($result->num_rows > 0) {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => true))));
          } else {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => false))));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'username-exists-query-error')));
        }

        break;
      case 'email-exists':
        $checkIfEmailExistsSql = 'SELECT u.id FROM user u WHERE u.`email` = \'' . $_GET['email'] . '\'';
        $result = $dbWeb->query($checkIfEmailExistsSql);
        if ($result) {
          if ($result->num_rows > 0) {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => true))));
          } else {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => false))));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'email-exists-query-error')));
        }

        break;
      }
    }
    break;
  case 'coding':
    $language = $_GET['language'];

    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'templates':
        $sql = "SELECT `title_$language` as `title`, `description_$language` as `description`, `image_url` as `imageUrl` FROM `project_template`";
        $result = $dbWeb->query($sql);

        $response = array();
        while ($row = $result->fetch_assoc()) {
          array_push($response, $row);
        }
        die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $response)));
      }
    }

    break;
  case 'docs':
    $languageKey = $_GET['language'];

    if (isset($urlSection['2']) && $urlSection['2'] != '') {
      switch ($urlSection['2']) {
      case 'categories':
        if (isset($urlSection['3']) && $urlSection['3'] != '') {
          switch ($urlSection['3']) {
          case 'keywords':
            if (isset($urlSection['4']) && $urlSection['4'] != '') {
              $sql = "SELECT k.`name`, k.`description_$languageKey` as `description` FROM `keyword` k, `keyword_category` cat WHERE k.`category_id` = cat.id AND cat.`path_$languageKey` = '" . $urlSection['4'] . "'";
              $result = $dbLanguage->query($sql);

              $keywords = array();
              while ($row = $result->fetch_assoc()) {
                array_push($keywords, $row);
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords)));
            } else {
              $sql = "SELECT `path_$languageKey` as `path`, `title_$languageKey` as `title`, `description_$languageKey` as `description` FROM `keyword_category`";
              $result = $dbLanguage->query($sql);

              $keywordCategories = array();
              while ($row = $result->fetch_assoc()) {
                array_push($keywordCategories, $row);
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywordCategories)));
            }
          case 'commands':
            if (isset($urlSection['4']) && $urlSection['4'] != '') {
              // second level command categories
              if (isset($urlSection['5']) && $urlSection['5'] != '') {
                // third level commands
                $sql = "SELECT cmd.`name`, ";
                $sql .= "cmd.`description_$languageKey` as `description` ";
                $sql .= "FROM `command` cmd, `command_category` cat ";
                $sql .= "WHERE cat.`path_$languageKey` = '" . $urlSection['5'] . "' ";
                $sql .= "AND cmd.`sub_category` = cat.id";
                $result = $dbLanguage->query($sql);

                $commandCategories = array();
                while ($row = $result->fetch_assoc()) {
                  array_push($commandCategories, $row);
                }
                die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $commandCategories)));
              }

              $sql = "SELECT cc.`path_$languageKey` as `path`, cc.`title_$languageKey` as `title`, cc.`description_$languageKey` as `description` FROM `command_category` cc, `command_category` cp WHERE cp.`path_$languageKey` = '" . $urlSection['4'] . "' AND cc.`parent` = cp.id";
              $result = $dbLanguage->query($sql);

              $commandCategories = array();
              while ($row = $result->fetch_assoc()) {
                array_push($commandCategories, $row);
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $commandCategories)));
            } else {
              $sql = "SELECT `path_$languageKey` as `path`, `title_$languageKey` as `title`, `description_$languageKey` as `description` FROM `command_category` WHERE `parent` IS NULL";
              $result = $dbLanguage->query($sql);

              $keywordCategories = array();
              while ($row = $result->fetch_assoc()) {
                // filter network category (not supported yet)
                if ($row['title'] !== 'Network' && $row['title'] !== 'Netzwerk') {
                  array_push($keywordCategories, $row);
                }
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywordCategories)));
            }
          }
        } else {
          $categories = array(
            array(
              'title' => 'KEYWORDS',
              'icon' => 'key',
              'path' => 'schluesselwoerter',
            ),
            array(
              'title' => 'COMMANDS',
              'icon' => 'book',
              'path' => 'befehle',
            ),
            array(
              'title' => 'CONSTANTS_AND_SCANCODES',
              'icon' => 'list-ol',
              'path' => 'konstanten-und-scancodes',
            ),
            array(
              'title' => 'DIFFERENCES_TO_BLITZBASIC',
              'icon' => 'exchange',
              'path' => 'unterschiede-zu-blitz-basic',
            ),
          );

          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $categories)));
        }
      case 'breadcrumbs':
        $breadcrumbs = array();
        if ($_GET['language']) {
          if ($_GET['language'] === 'en') {
            array_push($breadcrumbs, array(
              'title' => 'Overview',
              'path' => '/documentation',
            ));
          } elseif ($_GET['language'] === 'de') {
            array_push($breadcrumbs, array(
              'title' => 'Übersicht',
              'path' => '/dokumentation',
            ));
          }

          if (isset($_GET['level1'])) {
            switch ($_GET['level1']) {
            case 'keywords':
              array_push($breadcrumbs, array(
                'title' => 'Keywords',
                'path' => '/documentation/keywords',
              ));
              break;
            case 'schluesselwoerter':
              array_push($breadcrumbs, array(
                'title' => 'Schlüsselwörter',
                'path' => '/dokumentation/schluesselwoerter',
              ));
              break;
            case 'commands':
              array_push($breadcrumbs, array(
                'title' => 'Commands',
                'path' => '/documentation/commands',
              ));
              break;
            case 'befehle':
              array_push($breadcrumbs, array(
                'title' => 'Befehle',
                'path' => '/dokumentation/befehle',
              ));
              break;
            case 'constants-and-scancodes':
              array_push($breadcrumbs, array(
                'title' => 'Constants and Scancodes',
                'path' => '/documentation/constants-and-scancodes',
              ));
              break;
            case 'konstanten-und-scancodes':
              array_push($breadcrumbs, array(
                'title' => 'Konstanten und Scancodes',
                'path' => '/dokumentation/konstanten-und-scancodes',
              ));
              break;
            case 'differences-to-blitz-basic':
              array_push($breadcrumbs, array(
                'title' => 'Differences to BlitzBasic',
                'path' => '/documentation/differences-to-blitz-basic',
              ));
              break;
            case 'unterschiede-zu-blitz-basics':
              array_push($breadcrumbs, array(
                'title' => 'Unterschiede zu BlitzBasic',
                'path' => '/dokumentation/unterschiede-zu-blitz-basics',
              ));
              array_push($breadcrumbs, 'Unterschiede zu BlitzBasic');
              break;
            }

            if (isset($_GET['level2'])) {
              if ($languageKey === 'en') {
                $fullPath = '/documentation/' . $_GET['level1'];
              } elseif ($languageKey === 'de') {
                $fullPath = '/dokumentation/' . $_GET['level1'];
              }

              switch ($_GET['level1']) {
              case 'keywords':
              case 'schluesselwoerter':
                $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `keyword_category` WHERE `path_$languageKey` = '" . $_GET['level2'] . "'";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
                break;
              case 'commands':
              case 'befehle':
                $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `path_$languageKey` = '" . $_GET['level2'] . "'";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
                break;
              case 'constants-and-scancodes':
              case 'konstanten-und-scancodes':
                // TODO: implement
                break;
              case 'differences-to-blitz-basic':
              case 'unterschiede-zu-blitz-basics':
                // TODO: implement
                break;
              }
            }

            if (isset($_GET['level3'])) {
              if ($languageKey === 'en') {
                $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'];
              } elseif ($languageKey === 'de') {
                $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'];
              }

              switch ($_GET['level1']) {
              case 'keywords':
              case 'schluesselwoerter':
                // TODO: implement
                break;
              case 'commands':
              case 'befehle':
                $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `path_$languageKey` = '" . $_GET['level3'] . "' LIMIT 1";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
                break;
              case 'constants-and-scancodes':
              case 'konstanten-und-scancodes':
                // TODO: implement
                break;
              case 'differences-to-blitz-basic':
              case 'unterschiede-zu-blitz-basics':
                // TODO: implement
                break;
              }
            }

            if (isset($_GET['level4'])) {
              if ($languageKey === 'en') {
                $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
              } elseif ($languageKey === 'de') {
                $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
              }

              switch ($_GET['level1']) {
              case 'keywords':
              case 'schluesselwoerter':
                // TODO: implement
                break;
              case 'commands':
              case 'befehle':
                $sql = "SELECT `name` FROM `command` WHERE UPPER(`name`) LIKE UPPER('" . $_GET['level4'] . "')";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['name'],
                    'path' => $fullPath . '/' . strtolower($row['name']),
                  ));
                }
                break;
              case 'constants-and-scancodes':
              case 'konstanten-und-scancodes':
                // TODO: implement
                break;
              case 'differences-to-blitz-basic':
              case 'unterschiede-zu-blitz-basics':
                // TODO: implement
                break;
              }
            }
          }

          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $breadcrumbs)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a language key ("en" and "de" are currently supported).')));
        }

      case 'navigation':
        $navElements = array();

        if ($_GET['language']) {
          if (!isset($_GET['level1'])) {
            // level 0
            if ($_GET['language'] === 'en') {
              array_push($navElements, array(
                'title' => 'Keywords',
                'path' => '/documentation/keywords',
              ));
              array_push($navElements, array(
                'title' => 'Commands',
                'path' => '/documentation/commands',
              ));
              array_push($navElements, array(
                'title' => 'Constants and Scancodes',
                'path' => '/documentation/constants-and-scancodes',
              ));
              array_push($navElements, array(
                'title' => 'Differences to BlitzBasic',
                'path' => '/documentation/differences-to-blitz-basic',
              ));
            } elseif ($_GET['language'] === 'de') {
              array_push($navElements, array(
                'title' => 'Schlüsselwörter',
                'path' => '/dokumentation/schluesselwoerter',
              ));
              array_push($navElements, array(
                'title' => 'Befehle',
                'path' => '/dokumentation/befehle',
              ));
              array_push($navElements, array(
                'title' => 'Konstanten und Scancodes',
                'path' => '/dokumentation/konstanten-und-scancodes',
              ));
              array_push($navElements, array(
                'title' => 'Unterschiede zu BlitzBasic',
                'path' => '/dokumentation/unterschiede-zu-blitz-basic',
              ));
            }
          } elseif (!isset($_GET['level2'])) {
            // level 1
            if ($languageKey === 'en') {
              $fullPath = '/documentation/' . $_GET['level1'];
            } elseif ($languageKey === 'de') {
              $fullPath = '/dokumentation/' . $_GET['level1'];
            }

            switch ($_GET['level1']) {
            case 'keywords':
            case 'schluesselwoerter':
              $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `keyword_category`";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                array_push($navElements, array(
                  'title' => $row['title'],
                  'path' => $fullPath . '/' . $row['path'],
                ));
              }
              break;
            case 'commands':
            case 'befehle':
              $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `parent` IS NULL";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                // filter network category (not supported yet)
                if ($row['title'] !== 'Network' && $row['title'] !== 'Netzwerk') {
                  array_push($navElements, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
              }
              break;
            case 'constants-and-scancodes':
            case 'konstanten-und-scancodes':
              // TODO: implement
              break;
            case 'differences-to-blitz-basic':
            case 'unterschiede-zu-blitz-basics':
              // TODO: implement
              break;
            }
          } elseif (!isset($_GET['level3'])) {
            // level 2
            if ($languageKey === 'en') {
              $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'];
            } elseif ($languageKey === 'de') {
              $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'];
            }

            switch ($_GET['level1']) {
            case 'keywords':
            case 'schluesselwoerter':
              $sql = "SELECT k.`name` FROM `keyword_category` cat, `keyword` k ";
              $sql .= "WHERE cat.`path_$languageKey` = '" . $_GET['level2'] . "' ";
              $sql .= "AND cat.`id` = k.`category_id`";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                array_push($navElements, array(
                  'title' => $row['name'],
                  'path' => $fullPath . '/' . strtolower($row['name']),
                ));
              }
              break;
            case 'commands':
            case 'befehle':
              $sql = "SELECT cc.`title_$languageKey` as `title`, cc.`path_$languageKey` as `path` FROM `command_category` cp, `command_category` cc ";
              $sql .= "WHERE cp.`path_$languageKey` = '" . $_GET['level2'] . "' ";
              $sql .= "AND cc.`parent` = cp.`id`";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                array_push($navElements, array(
                  'title' => $row['title'],
                  'path' => $fullPath . '/' . $row['path'],
                ));
              }
              break;
            }
          } else {
            // level 3
            if ($languageKey === 'en') {
              $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
            } elseif ($languageKey === 'de') {
              $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
            }

            $sql = "SELECT cmd.`name` FROM `command_category` cat, `command` cmd ";
            $sql .= "WHERE cat.`path_$languageKey` = '" . $_GET['level3'] . "' ";
            $sql .= "AND cmd.`sub_category` = cat.`id`";
            $result = $dbLanguage->query($sql);

            while ($row = $result->fetch_assoc()) {
              array_push($navElements, array(
                'title' => $row['name'],
                'path' => $fullPath . '/' . strtolower($row['name']),
              ));
            }
          }

          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $navElements)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a language key ("en" and "de" are currently supported).')));
        }

      case 'commands':
        if (isset($_GET['language'])) {
          $language = $_GET['language'];

          if (!isset($_GET['category'])) {
            // invalid: category must be provided
            die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a category.')));
          } elseif (!isset($_GET['subCategory'])) {
            // first level: get category attributes
            $sql = "SELECT `title_$language` as `headline`, `description_$language` as `description` FROM `command_category` WHERE `path_$language`='" . $_GET['category'] . "'";
            $result = $dbLanguage->query($sql);

            while ($row = $result->fetch_assoc()) {
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $row)));
            }
          } elseif (!isset($_GET['command'])) {
            // second level: get subcategory attributes
            $sql = "SELECT cc.`title_$language` as `headline`, cc.`description_$language` as `description` FROM `command_category` cp, `command_category` cc ";
            $sql .= "WHERE cc.`path_$language`='" . $_GET['subCategory'] . "' ";
            $sql .= "AND cp.`path_$language`='" . $_GET['category'] . "' ";
            $sql .= "AND cc.`parent` = cp.id";
            $result = $dbLanguage->query($sql);

            while ($row = $result->fetch_assoc()) {
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $row)));
            }
          } else {
            // third level: get command attributes
            $response = array();

            $sql = "SELECT `id`, `name`, `description_$language` as `description`, `return_name` as `returnName`, `return_description_$language` as `returnDescription`, `code` ";
            $sql .= "FROM `command` ";
            $sql .= "WHERE LOWER(`name`)='" . strtolower($_GET['command']) . "' ";
            $result = $dbLanguage->query($sql);

            while ($row = $result->fetch_assoc()) {
              $cmdId = $row['id'];
              $response['name'] = $row['name'];
              $response['params'] = array();
              $response['description'] = $row['description'];
              $response['infos'] = ''; // TODO: add infos to database
              $response['return'] = array(
                'name' => $row['returnName'],
                'description' => $row['returnDescription'],
              );
              $response['code'] = $row['code'];
            }

            $sql = "SELECT `name`, `description_$language` as `description`, `optional` FROM`command_parameter` WHERE `command_id` = '$cmdId' ORDER BY `offset` ASC";
            $result = $dbLanguage->query($sql);

            while ($row = $result->fetch_assoc()) {
              array_push($response['params'], array(
                'name' => $row['name'],
                'description' => $row['description'],
                'optional' => $row['optional'] ? true : false,
              ));
            }

            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $response)));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a language key ("en" and "de" are currently supported).')));
        }
      case 'search':
        if ($_GET['term']) {
          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => 'Work in Progress')));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a search term.')));
        }
      }
    } else {
      echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Please specify which part of the documentation you would like to retrieve.'));
    }
    break;
  case 'keywords':
    if (isset($urlSection['2']) && $urlSection['2'] != '') {
      $sql = "SELECT `name` FROM `keyword` WHERE name = '" . strtolower($urlSection['2']) . "'";
      $result = $dbLanguage->query($sql);

      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $row));
        }
      } else {
        echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Invalid key word'));
      }
    } else {
      $sql = "SELECT `name` FROM `keyword` WHERE deprecated = ";
      if (isset($_GET['deprecated'])) {
        $sql .= $_GET['deprecated'];
      } else {
        $sql .= "0";
      }

      $result = $dbLanguage->query($sql);
      if ($result->num_rows > 0) {
        $keywords = array();
        while ($row = $result->fetch_assoc()) {
          array_push($keywords, $row['name']);
        }
        echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
      } else {
        echo json_encode(array('status' => STATUS_ERROR, 'message' => 'An error occurred.'));
      }
    }
    break;
  case 'commands':
    if (true) {
      $sql = "SELECT `name` FROM `command` WHERE `deprecated` = ";
      if (isset($_GET['deprecated'])) {
        $sql .= $_GET['deprecated'];
      } else {
        $sql .= "0";
      }
      $result = $dbLanguage->query($sql);

      $commands = array();
      while ($row = $result->fetch_assoc()) {
        array_push($commands, $row['name']);
      }
      die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $commands)));
    } else {
      $sql = 'SELECT cmd.id AS id, cmd.name AS name, cat.name AS category, subcat.name AS subCategory, cmd.`return_name`, cmd.`return_description_en`, cmd.`return_description_de`, cmd.`description_en`, cmd.`description_de`, cmd.`code` FROM command cmd';
      $sql .= ' JOIN command_category cat ON cmd.category = cat.id';
      $sql .= ' JOIN command_category subcat ON cmd.sub_category = subcat.id';
      if (isset($_GET['deprecated'])) {
        $sql .= ' WHERE deprecated = ' . $_GET['deprecated'];
      }
      if (isset($_GET['category'])) {
        $sql .= ' AND category = \'' . $_GET['category'] . '\'';
      }
      if (isset($_GET['sub_category'])) {
        $sql .= ' AND sub_category = \'' . $_GET['sub_category'] . '\'';
      }

      $result = $dbLanguage->query($sql);

      if ($result->num_rows > 0) {
        $commands = array();
        while ($row = $result->fetch_assoc()) {
          // get command params
          $row['params'] = array();
          $paramSql = 'SELECT cp.name, cp.optional FROM command_parameter cp WHERE command_id = ' . $row['id'] . ' ORDER BY cp.offset';
          $paramResult = $dbLanguage->query($paramSql);
          if ($paramResult->num_rows > 0) {
            while ($paramRow = $paramResult->fetch_assoc()) {
              array_push($row['params'], $paramRow);
            }
          }

          // add command to array
          $commands[strtolower($row['name'])] = array(
            'name' => $row['name'],
            'description' => array(
              'en' => $row['description_en'],
              'de' => $row['description_de'],
            ),
            'category' => $row['category'],
            'subCategory' => $row['subCategory'],
            'params' => $row['params'],
            'return' => array(
              'name' => $row['return_name'],
              'description' => array(
                'en' => $row['return_description_en'],
                'de' => $row['return_description_de'],
              ),
            ),
            'code' => $row['code'],
          );
        }
        echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $commands), JSON_NUMERIC_CHECK);
      } else {
        echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
      }
    }
    break;
  case 'command-categories':
    $sql = 'SELECT cmd.id AS id, cmd.name AS name, cat.name AS category, subcat.name AS subCategory, cmd.`description_en`, cmd.`description_de`, cmd.`code` FROM command cmd';
    $sql .= ' JOIN command_category cat ON cmd.category = cat.id';
    $sql .= ' JOIN command_category subcat ON cmd.sub_category = subcat.id';
    $sql .= ' ORDER BY cat.name, subcat.name';

    $result = $dbLanguage->query($sql);

    if ($result->num_rows > 0) {
      $categories = array();
      while ($row = $result->fetch_assoc()) {
        // echo(print_r($row));

        if (!array_key_exists($row['category'], $categories)) {
          $categories[$row['category']] = array();
        }
        if (!array_key_exists($row['subCategory'], $categories[$row['category']])) {
          $categories[$row['category']][$row['subCategory']] = array();
        }

        $categories[$row['category']][$row['subCategory']][strtolower($row['name'])] = array(
          'name' => $row['name'],
          'description' => array(
            'en' => $row['description_en'],
            'de' => $row['description_de'],
          ),
          'code' => $row['code'],
        );
      }
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $categories), JSON_NUMERIC_CHECK);
    } else {
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
    }
    break;
  case 'commands-plain':
    $sql = 'SELECT cmd.name FROM command cmd';

    $result = $dbLanguage->query($sql);
    if ($result->num_rows > 0) {
      $commands = '';
      while ($row = $result->fetch_assoc()) {
        //refine description and return structure
        $commands .= $row['name'] . '|';
      }
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $commands), JSON_NUMERIC_CHECK);
    } else {
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
    }
    break;
  case 'files':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'file-size':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $fileSize = filesize($baseDir . $_GET['path']);
        die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $fileSize), JSON_NUMERIC_CHECK));
      case 'file-type':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $fileExists = file_exists($baseDir . $_GET['path']);
        if ($fileExists) {
          $isDir = is_dir($baseDir . $_GET['path']);
          if ($isDir) {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => 2), JSON_NUMERIC_CHECK));
          } else {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => 1), JSON_NUMERIC_CHECK));
          }
        } else {
          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => 0), JSON_NUMERIC_CHECK));
        }
      case 'get-content':
        $fileAsString = base64_encode(file_get_contents($sharedDir . $_GET['path']));
        die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $fileAsString)));
      }
    } else {
      $files = scandir($baseDir . $_GET['path']);
      die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array_slice($files, 2))));
    }
  case 'shared-files':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'get-content':
        $fileAsString = file_get_contents($sharedDir . $_GET['path']);
        die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $fileAsString)));
      }
    } else {
      $files = scandir($sharedDir);
      die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array_slice($files, 2))));
    }
  case 'projects':
    if (isset($urlSection[2])) {
    } else {
      $sql = 'SELECT p.id, p.user_id, p.title, p.description, p.thumbnail_url, p.code, p.created_at, p.last_modified_at FROM project p';

      $result = $dbWeb->query($sql);
      if ($result->num_rows > 0) {
        $data = array();
        while ($outerRow = $result->fetch_assoc()) {
          $sqlGetUser = 'SELECT id, name, email FROM user WHERE id = ' . $outerRow['user_id'];
          $userResult = $dbWeb->query($sqlGetUser);
          while ($innerRow = $userResult->fetch_assoc()) {
            $outerRow['user'] = $innerRow;
            unset($outerRow['user_id']);
            array_push($data, $outerRow);
          }
        }
        echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $data));
      } else {
        echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
      }
    }
    break;
  case 'news':
    if (!$_GET['language']) {
      die(json_encode(array('status' => STATUS_FAIL, 'message' => 'You must send a language query parameter.')));
    }
    $sql = 'SELECT n.id, n.title, n.message, u.name as author, n.created_at AS createdAt, n.last_modified_at AS lastModifiedAt, n.image FROM news n, user u';
    $sql .= ' WHERE u.id = n.author';
    $sql .= ' AND language = "' . $_GET['language'] . '"';
    $sql .= ' ORDER BY n.created_at DESC';
    if ($_GET['limit']) {
      $sql .= ' LIMIT ' . $_GET['limit'];
    }
    // die($sql);
    $result = $dbWeb->query($sql);
    if ($result->num_rows > 0) {
      $keywords = array();
      while ($row = $result->fetch_assoc()) {
        array_push($keywords, $row);
      }
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
    } else {
      echo json_encode(array('status' => STATUS_FAIL, 'message' => null));
    }
    break;
  case 'new-features':
    if (!$_GET['language']) {
      die(json_encode(array('status' => STATUS_FAIL, 'message' => 'You must send a language query parameter.')));
    }
    $sql = 'SELECT n.id, n.title, n.message, u.name as author, n.created_at AS createdAt, n.last_modified_at AS lastModifiedAt, n.image FROM new_features n, user u';
    $sql .= ' WHERE u.id = n.author';
    $sql .= ' AND language = "' . $_GET['language'] . '"';
    $sql .= ' ORDER BY n.created_at DESC';
    if ($_GET['limit']) {
      $sql .= ' LIMIT ' . $_GET['limit'];
    }
    // die($sql);
    $result = $dbWeb->query($sql);
    if ($result->num_rows > 0) {
      $keywords = array();
      while ($row = $result->fetch_assoc()) {
        array_push($keywords, $row);
      }
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
    } else {
      echo json_encode(array('status' => STATUS_FAIL, 'message' => null));
    }
    break;
  default:
    die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Invalid API call.')));
  }
} elseif ($method == 'POST') {
  $inputJSON = file_get_contents('php://input');
  $input = json_decode($inputJSON, true); //convert JSON into array

  switch ($urlSection['1']) {
  case 'auth':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'register':
        $errors = array();

        if (strlen($_POST['username']) < 2) {
          array_push($errors, 'username-too-short');
        } elseif (strlen($_POST['username']) > 32) {
          array_push($errors, 'username-too-long');
        } elseif (preg_match('/^[a-zA-Z0-9 ]*$/', $_POST['username']) != 1) {
          array_push($errors, 'invalid-username');
        } elseif (strlen($_POST['password']) < 8) {
          array_push($errors, 'password-too-short');
        }

        if (strlen($_POST['email']) === 0) {
          array_push($errors, 'email-empty');
        } elseif (preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/', $_POST['email']) != 1) {
          array_push($errors, 'email-invalid');
        }

        if ($_POST['termsAccepted'] == false) {
          array_push($errors, 'terms-must-be-accepted');
        }

        if (count($errors) > 0) {
          die(json_encode(array('status' => STATUS_FAIL, 'message' => 'Registry failed', 'data' => $errors)));
        }

        // check if username is already reserved
        $checkIfUserExistsSql = 'SELECT u.id FROM user u WHERE u.name = \'' . $_POST['username'] . '\'';
        $result = $dbWeb->query($checkIfUserExistsSql);
        if ($result->num_rows > 0) {
          die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-exists')));
        }

        // generate password hash and current date
        $username = $_POST['username'];
        $email = $_POST['email'];
        $passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $registration = date("Y-m-d H:i:s");
        $token = bin2hex(random_bytes(16));

        // if everything is alright: create new user
        $createUserSql = "INSERT INTO `user`(`name`, `email`, `password`, `registration`, `token`, `active`) ";
        $createUserSql .= "VALUES ('$username', '$email', '$passwordHash', '$registration', '$token', false)";

        $result = $dbWeb->query($createUserSql);
        if ($result) {
          // send confirmation email
          $to = $_POST['email'];
          $subject = 'Deine Registrierung bei BlitzBasicScript';

          $headers = [
            'MIME-Version' => '1.0',
            'Content-type' => 'text/html; charset=UTF-8',
            'From' => 'BlitzBasicScript <info@blitzbasicscript.com>',
            'X-Mailer' => 'PHP/' . phpversion(),
          ];

          $mailContent = file_get_contents(MAIL_SERVER . '/registration-de.html');
          $mailContent = str_replace('{{email}}', urlencode($email), $mailContent); // TODO: urldecode??
          $mailContent = str_replace('{{token}}', urlencode($token), $mailContent); // TODO: urldecode??

          $status = mail($to, $subject, $mailContent, $headers);
          if ($status == false) {
            $deleteUserSql = 'DELETE FROM `user` WHERE `email` = \'' . $_POST['email'] . '\'';
            $dbWeb->query($deleteUserSql);

            die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Your confirmation email could not be sent.')));
          }

          die(json_encode(array('status' => STATUS_SUCCESS)));
        } else {
          echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Registration Error'));
        }

        break;
      case 'login':
        $sql = "SELECT `name`, `email`, `password`, `active` FROM `user` WHERE `name` = '" . $_POST['userOrEmail'] . "' OR `email` = '" . $_POST['userOrEmail'] . "'";

        $result = $dbWeb->query($sql);
        if ($result) {
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
              if ($row['active']) {
                if (password_verify($_POST['password'], $row['password'])) {
                  $token = bin2hex(random_bytes(64));
                  $storeTokenSql = "UPDATE `user` SET `token`='$token' WHERE `email` = '" . $row['email'] . "'";
                  $storeResult = $dbWeb->query($storeTokenSql);
                  if ($storeResult) {
                    $response = array(
                      'name' => $row['name'],
                      'email' => $row['email'],
                      'token' => $token,
                    );
                    die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $response), JSON_NUMERIC_CHECK));
                  } else {
                    die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'token-error')));
                  }
                } else {
                  die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-password-combination-invalid')));
                }
              } else {
                die(json_encode(array('status' => STATUS_FAIL, 'message' => 'user-not-active')));
              }
            }
          } else {
            die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-password-combination-invalid')));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'login-error')));
        }
      case 'logout':
        $removeTokenSql = 'UPDATE `user` u SET `token`=\'\' WHERE u.name = \'' . $input['userOrEmail'] . '\' OR u.email = \'' . $input['userOrEmail'] . '\'';
        $removeTokenSql = $dbWeb->query($removeTokenSql);
        if ($removeTokenSql) {
          die(json_encode(array('status' => STATUS_SUCCESS), JSON_NUMERIC_CHECK));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'logout-error')));
        }

        break;
      case 'validate-credentials':
        $sql = "SELECT `id` FROM `user` WHERE `name`='" . $_POST['username'] . "' AND `email`='" . $_POST['email'] . "' AND `token`='" . $_POST['token'] . "' AND `active`=1";
        $result = $dbWeb->query($sql);
        if ($result->num_rows > 0) {
          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => true), JSON_NUMERIC_CHECK));
        } else {
          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => false), JSON_NUMERIC_CHECK));
        }

        break;
      }
    } else {
      die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a valid authentication action link.')));
    }

    break;
  case 'files':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'copy-file':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $copySuccess = copy($baseDir . $_POST['sourcePath'], $baseDir . $_POST['targetPath']);
        if ($copySuccess) {
          die(json_encode(array('status' => STATUS_SUCCESS)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'File could not be copied.')));
        }
      case 'create-directory':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $mkDirSuccess = mkdir($baseDir . $_POST['path']);
        if ($mkDirSuccess) {
          die(json_encode(array('status' => STATUS_SUCCESS)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Directory could not be created.')));
        }
      case 'create-file':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $bytesWritten = file_put_contents($baseDir . $_POST['path'], '');
        if ($bytesWritten !== false) {
          die(json_encode(array('status' => STATUS_SUCCESS)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'File could not be created.')));
        }
      }
    }

  case 'contact':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'send-message':
        $errors = array();

        if (strlen($_POST['name']) < 2) {
          array_push($errors, 'name-too-short');
        } elseif (strlen($_POST['name']) > 32) {
          array_push($errors, 'name-too-long');
        } elseif (preg_match('/^[a-zA-ZäöüÄÖÜß0-9 ]*$/', $_POST['name']) != 1) {
          array_push($errors, 'invalid-name');
        }

        if (strlen($_POST['email']) === 0) {
          array_push($errors, 'email-empty');
        } elseif (preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/', $_POST['email']) != 1) {
          array_push($errors, 'email-invalid');
        }

        if (count($errors) > 0) {
          die(json_encode(array('status' => STATUS_FAIL, 'message' => 'Registry failed', 'data' => $errors)));
        }

        // send email to webmaster
        $to = 'webmaster@blitzbasicscript.com';
        $subject = 'Kontakt-Nachricht von BlitzBasicScript';

        $headers = [
          'MIME-Version' => '1.0',
          'Content-type' => 'text/html; charset=UTF-8',
          'From' => 'BlitzBasicScript <info@blitzbasicscript.com>',
          'X-Mailer' => 'PHP/' . phpversion(),
        ];

        $mailContent = file_get_contents(MAIL_SERVER . '/contact-de.html');
        $mailContent = str_replace('{{name}}', urldecode($_POST['name']), $mailContent);
        $mailContent = str_replace('{{email}}', urldecode($_POST['email']), $mailContent);
        $mailContent = str_replace('{{subject}}', urldecode($_POST['subject']), $mailContent);
        $mailContent = str_replace('{{message}}', urldecode($_POST['message']), $mailContent);

        $status = mail($to, $subject, $mailContent, $headers);
        if ($status == false) {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Your contact message could not be sent.')));
        }

        die(json_encode(array('status' => STATUS_SUCCESS)));
      }
    }
  }
} elseif ($method == 'DELETE') {
  $inputForm = file_get_contents('php://input');
  parse_str($inputForm, $_DELETE);

  switch ($urlSection['1']) {
  case 'files':
    if (isset($urlSection['2'])) {
      switch ($urlSection['2']) {
      case 'delete-directory':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $rmDirSuccess = rmdir($baseDir . $_DELETE['path']);
        if ($rmDirSuccess) {
          die(json_encode(array('status' => STATUS_SUCCESS)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Directory could not be deleted.')));
        }
      case 'delete-file':
        die('This operation has been deactivated by Spark Fountain due to security issues.');
        $rmFileSuccess = unlink($baseDir . $_DELETE['path']);
        if ($rmFileSuccess) {
          die(json_encode(array('status' => STATUS_SUCCESS)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'File could not be deleted.')));
        }
      }
    }
  }
}

$dbLanguage->close();
