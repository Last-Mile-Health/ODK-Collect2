/* global odkData, odkCommon */
'use strict';

var fields = new Object();
fields = {
  'chss_id': '',
  'chss_name': '',
  'supervised_cha_id': '',
  'supervised_cha_name': '',
  'household_visits': 0,
  'births_home': 0,
  'births_facility': 0,
  'still_births': 0,
  'neonatal_deaths': 0,
  'post_neonatal_deaths': 0,
  'child_deaths': 0,
  'maternal_deaths': 0,
  'community_triggers': 0,
  'suspect_referrals': 0,
  'deaths_home': 0,
  'pregnant_visits': 0,
  'clients_referred_delivery': 0,
  'referred_anc_visit': 0,
  'post_natal_visits': 0,
  'clients_referred_maternal_danger_sign': 0,
  'hbmnc_within_two_days_mother': 0,
  'hbmnc_within_two_days_infant': 0,
  'clients_using_family_planning': 0,
  'active_case_finds': 0,
  'red_muac': 0,
  'yellow_muac': 0,
  'green_muac': 0,
  'pneumonia_cases_identified': 0,
  'malaria_cases_identified': 0,
  'diarrhea_cases_identified': 0,
  'pneumonia_patients_treated': 0,
  'malaria_infants_treated': 0,
  'malaria_children_treated': 0,
  'malaria_patients_treated_under_day': 0,
  'malaria_patients_treated_over_day': 0,
  'diarrhea_patients_treated_zinc_ors': 0,
  'iccem_patients_referred': 0,
  'hiv_client_visits': 0,
  'tb_client_visits': 0,
  'neglected_ntd_client_visits': 0,
  'mental_health_client_visits': 0,
  'ltfu_hiv_clients_traced': 0,
  'ltfu_tb_clients_traced': 0,
}

$(function(){
   odkData.getViewData(display, queryFailure);
});

function queryFailure(error) {
    console.log('cha_detail: failed with error: ' + error);
}

function display(results) {
  var list = $('#form-list')
  var tableId = results.getTableId();

  var rowId = results.getRowId(0);
  var reportingMonth = results.get('reporting_month');
  var reportingYear = results.get('reporting_year');
  var buttonText = buildButtonText(reportingMonth, reportingYear)
  buildListItem(rowId, tableId, buttonText, list);

  // TODO: Add other fields not in report

  for (var field in fields) {
    var val = results.get(field);
    if (val === null || val === undefined) {
      val = '';
    }
    $('#' + field).text(val);
  }
}

function buildListItem(rowId, tableId, buttonText, list) {
  var list_item = $('<div>');
  list_item.attr('id', rowId);
  list_item.attr('rowId', rowId);
  list_item.attr('class', 'list-item');

  var circle = $('<div>');
  circle.attr('class', 'circle');
  var edit_form_image = $('<img>');
  edit_form_image.attr('class', "button-image edit-form-image")
  edit_form_image.attr('src', "../../../assets/img/edit_form.svg")
  circle.append(edit_form_image)
  list_item.append(circle)

  var button_text = $('<span>');
  button_text.attr('class', 'button-text');
  button_text.text(buttonText)
  list_item.append(button_text)

  var go_arrow = $('<div>');
  go_arrow.attr('class', 'go-arrow');
  var go_arrow_image = $('<img>');
  go_arrow_image.attr('class', "button-image go-arrow-image")
  go_arrow_image.attr('src', "../../../assets/img/go_arrow.svg")
  go_arrow.append(go_arrow_image)
  list_item.append(go_arrow)

  list_item.click(function(e) {
    odkTables.editRowWithSurvey(null, tableId, rowId, 'cha');
  });

  list.append(list_item)
}

function buildButtonText(reportingMonth, reportingYear) {
  var monthString = ""
  switch(reportingMonth) {
    case "1":
      monthString = "January";
      break;
    case "2":
      monthString = "February";
      break;
    case "3":
      monthString = "March";
      break;
    case "4":
      monthString = "April";
      break;
    case "5":
      monthString = "May";
      break;
    case "6":
      monthString = "June";
      break;
    case "7":
      monthString = "July";
      break;
    case "8":
      monthString = "August";
      break;
    case "9":
      monthString = "September";
      break;
    case "10":
      monthString = "October";
      break;
    case "11":
      monthString = "November";
      break;
    case "12":
      monthString = "December";
      break;
  }

  return "Edit CHA: " + monthString + " " + reportingYear
}
