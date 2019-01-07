'use strict';

function launchNewForm() {
  odkTables.addRowWithSurvey(null, 'cha', 'cha', null, null);
}

function launchFormList() {
  odkTables.launchHTML(null, 'config/tables/cha/html/cha_list.html')
}

function launchStatsView() {
  odkTables.launchHTML(null, 'config/tables/cha/html/report_list.html');
}

function launchSubmit() {
  odkCommon.doAction(null, "org.opendatakit.submit.activities.LauncherActivity", {"componentPackage": "org.opendatakit.submit", "componentActivity": "org.opendatakit.submit.activities.LauncherActivity"});
}
