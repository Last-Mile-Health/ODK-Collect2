'use strict';

var fields = new Object();
fields = {
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
var fullResults = new Object();
var threeMonthResults = new Object();
var lastMonthResults = new Object();
var thisMonthResults = new Object();

$(function() {
  $('#apply-button').click(updateDisplay);
  odkData.query('cha', null, null, null, null, null, null, null, null, true, processQueryResults, queryFailure);
});

function queryFailure(error) {
    console.log('cha query CB error : ' + error);
};

function processQueryResults(resultSet) {
  var today = new Date();
  var thisMonth = today.getMonth() + 1;
  var thisYear = today.getFullYear();

  for (var i = 0; i < resultSet.getCount(); i++) {
    var reportingMonth = resultSet.getData(i, 'reporting_month');
    var reportingYear = resultSet.getData(i, 'reporting_year');
    var isLastThreeMonths = matchLastThreeMonths(thisMonth, thisYear, reportingMonth, reportingYear);
    var isLastMonth = matchLastMonth(thisMonth, thisYear, reportingMonth, reportingYear);
    var isThisMonth = matchThisMonth(thisMonth, thisYear, reportingMonth, reportingYear);

    for (var field in fields) {
      var value = resultSet.getData(i, field);

      addValue(fullResults, field, value);
      if (isLastThreeMonths) {
        addValue(threeMonthResults, field, value);
      }
      if (isLastMonth) {
        addValue(lastMonthResults, field, value);
      }
      if (isThisMonth) {
        addValue(thisMonthResults, field, value);
      }
    }
  }

  displayResults(fullResults);
};

function updateDisplay(e) {
  e.preventDefault();
  var selection = $("input[name='filter-input']:checked").val();

  if (selection === "none") {
    displayResults(fullResults);
  } else if (selection === "thisMonth") {
    displayResults(thisMonthResults);
  } else if (selection === "lastMonth") {
    displayResults(lastMonthResults);
  } else if (selection === "threeMonths") {
    displayResults(threeMonthResults);
  }

  return false;
}

function displayResults(results) {
  for (var field in fields) {
    var val = results[field];
    if (val === null || val === undefined) {
      val = 0;
    }
    $('#' + field).text(val);
  }
};

function matchLastThreeMonths(thisMonth, thisYear, argMonth, argYear) {
  if (thisMonth >= 3) {
    return (argMonth <= thisMonth && argMonth > (thisMonth - 3) && argYear == thisYear);
  } else if (thisMonth == 2) {
    return ((argMonth <= 2 && argYear == thisYear) || (argMonth == 12 && argYear == (thisYear - 1)));
  } else {
    return ((argMonth == 1 && argYear == thisYear) || (argMonth >= 11 && argYear == (thisYear - 1)));
  }
};

function matchLastMonth(thisMonth, thisYear, argMonth, argYear) {
  if (thisMonth >= 2) {
    return (argMonth == (thisMonth - 1) && argYear == thisYear)
  } else {
    return (argMonth == 12 && argYear == (thisYear - 1))
  }
};

function matchThisMonth(thisMonth, thisYear, argMonth, argYear) {
  return (argMonth == thisMonth && argYear == thisYear)
};

function addValue(dict, field, value) {
  if (dict.hasOwnProperty(field)) {
    dict[field] += value;
  } else {
    dict[field] = value;
  }
};
