export function getDate(props) {
  let today = new Date();
  let month = "0";
  let day = "";

  //add zero to month
  if (today.getMonth() + 1 < 10) {
    month += today.getMonth() + 1;
  } else if (today.getMonth() + 1 >= 10) {
    month = today.getMonth() + 1;
  }
  //get string version of day
  switch (new Date().getDay()) {
    case 0:
      day = "SUN";
      break;
    case 1:
      day = "MON";
      break;
    case 2:
      day = "TUE";
      break;
    case 3:
      day = "WED";
      break;
    case 4:
      day = "THUR";
      break;
    case 5:
      day = "FRI";
      break;
    case 6:
      day = "SAT";
  }
  let date = day + " " + month + ", " + today.getFullYear();
  console.log(today.getMonth());
  return date;
}
