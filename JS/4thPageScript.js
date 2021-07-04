// getting user info
const urlSearchParams = new URLSearchParams(window.location.search);
const userDetails = Object.fromEntries(urlSearchParams.entries());
const { fname, lname, email, score, time,} = userDetails;
userDetails.fullName = (fname, lname) => {
  return fname + ' ' + lname
}

// Immediately invoked function that inserts new rows than calling sorting functions:
(function createNewRow() {
    let rowsCreated = false
    //adding user info to existing empty row and cells in score table:
    const byScrTable = document.getElementById('by_scr_tbl')
    let lastRow = byScrTable.rows.length - 1;
    byScrTable.rows[lastRow].getElementsByTagName('td')[0].innerHTML = userDetails.fullName(fname,lname);
    byScrTable.rows[lastRow].getElementsByTagName('td')[1].innerHTML = email;
    byScrTable.rows[lastRow].getElementsByTagName('td')[2].innerHTML = score;
    byScrTable.rows[lastRow].getElementsByTagName('td')[3].innerHTML = time;
    //adding user info to existing empty row and cells in time table:
    const byTimeTable = document.getElementById('by_time_tbl')
    lastRow = byTimeTable.rows.length - 1;
    byTimeTable.rows[lastRow].getElementsByTagName('td')[0].innerHTML = userDetails.fullName(fname,lname);
    byTimeTable.rows[lastRow].getElementsByTagName('td')[1].innerHTML = email;
    byTimeTable.rows[lastRow].getElementsByTagName('td')[2].innerHTML = score;
    byTimeTable.rows[lastRow].getElementsByTagName('td')[3].innerHTML = time;
    rowsCreated = true
    if (rowsCreated) {
      sortScoreTable()
      sortTimeTable()
     }

})()

// Function that sorts the by score table in descendeing order:
function sortScoreTable() {
  let table, rows, switching, index, x, y, shouldSwitch;
  table = document.getElementById("by_scr_tbl");
  switching = true;
  //  A loop that will continue as long as switching = true
  while (switching) {
    switching = false;
    rows = table.rows;
     // Looping through all rows except first:
    for (index = 1; index < (rows.length - 1); index++) {
      shouldSwitch = false;
      // comparing this rows score cell to next row's:
      x = rows[index].getElementsByClassName("score")[0];
      y = rows[index + 1].getElementsByClassName("score")[0];
      // Check if one is smaller then the other and if so declare should switch true:
      if (parseInt(x.innerHTML, 10) < parseInt(y.innerHTML, 10)) {
        // If it is smaller, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If they should switch, make the switch and declare that a switch has been done: */
      rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
      switching = true;
    }
  }
}

// Function that sorts the by time table in ascsending order:
  function sortTimeTable() {
    let table, rows, switching, index, x, y, shouldSwitch;
    table = document.getElementById("by_time_tbl");
    switching = true;
    //  A loop that will continue as long as switching = true
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
       // Looping through all rows except first:
       for (index = 1; index < (rows.length - 1); index++) {
        shouldSwitch = false;
        // comparing this rows time cell to next row's:
        x = rows[index].getElementsByClassName("time")[0];
        y = rows[index + 1].getElementsByClassName("time")[0];
        // Check if one is bigger then the other and if so declare should switch true:
        if (x.innerHTML > y.innerHTML) {
          // If it is bigger, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If they should switch, make the switch and declare that a switch has been done: */
        rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
        switching = true;
      }
    }
  }

 
/*
  *currently not working properly  
//adding game and user info to share links:
const waShare = document.getElementById('wa-share');
waShare.href = "https://wa.me/?text=" + window.location.href
const emailShare = document.getElementById('email-share') ;
emailShare.href = 'mailto:?Subject=Watch my game score!&body=' + '&a&b&c&d&e&f'
*/

