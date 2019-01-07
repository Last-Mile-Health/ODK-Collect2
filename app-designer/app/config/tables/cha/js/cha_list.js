'use strict';

$(function() {
  odkData.query('cha', null, null, null, null, null, null, null, null, true, processQueryResults, queryFailure);
});

function queryFailure(error) {
    console.log('cha query CB error : ' + error);
};

function processQueryResults(resultSet) {
  var list = $('#form-list')
  var tableId = resultSet.getTableId();

  for (var i = 0; i < resultSet.getCount(); i++) {
    var rowId = resultSet.getRowId(i);
    var reportingMonth = resultSet.getData(i, 'reporting_month');
    var reportingYear = resultSet.getData(i, 'reporting_year');
    var buttonText = buildButtonText(reportingMonth, reportingYear)
    buildListItem(rowId, tableId, buttonText, list);
  }
};

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

  return "CHA: " + monthString + " " + reportingYear
}









/*

// Display the list of cha results
function displayGroup(chaResultSet) {

    // Set the function to call when a list item is clicked
    $('#form-list').click(function(e) {

        // Retrieve the row ID from the item_space attribute
        var jqueryObject = $(e.target);
        var containingDiv = jqueryObject.closest('.list-item');
        var rowId = containingDiv.attr('rowId');

        // Retrieve the tableID from the query results
        var tableId = chaResultSet.getTableId();

        if (rowId !== null && rowId !== undefined) {

            // Opens the detail view from the file specified in
            // the properties worksheet
            odkTables.openDetailView(null, tableId, rowId, null);
        }
    });

    // Iterate through the query results, rendering list items
    for (var i = 0; i < chaResultSet.getCount(); i++) {

        // Creates the item space and stores the row ID in it
        var item = $('<div>');
        item.attr('id', chaResultSet.getRowId(i));
        item.attr('rowId', chaResultSet.getRowId(i));
        item.attr('class', 'list-item');

        // Create the span to house the text
        var itemText = $('span');
        itemText.attr('class', 'button-text')

        // Display the reporting month and year
        var month = chaResultSet.getData(i, 'reporting_month'); // TODO: Show what Nick said
        var year = chaResultSet.getData(i, 'reporting_year');
        if (month === null || month === undefined || year === null || year ==== undefined) {
            month = 'Unknown reporting date';
        }
        itemText.text(month + " " + year);

        // Creates arrow icon
        /
        var chevron = $('<img>');
        chevron.attr('src', odkCommon.getFileAsUrl('config/assets/img/little_arrow.png'));
        chevron.attr('class', 'chevron');
        item.append(chevron);
        *

        // Add the item to the list
        $('#form-list').append(item);

        // Don't append the last one to avoid the fencepost problem
        var borderDiv = $('<div>');
        borderDiv.addClass('divider');
        $('#list').append(borderDiv);
      }
      if (i < chaResultSet.getCount()) {
          setTimeout(resumeFn, 0, i);
      }
};

function cbFailure(error) {
    console.log('cha getViewData CB error : ' + error);
};
*/
