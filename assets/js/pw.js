window.onload = password;

function password() {
  var page = window.location.href;
  var pass_input = prompt('Please enter the password you were provided.', '******');

  passwordNotProvided = false
  while(passwordNotProvided) {
    if (valid(page, pass_input)) {
      window.open(page);
      passwordNotProvided = True
    } else {
      prompt('Please try again, check your email to find the right password!', '******')
    }
  }
}

function valid(page, pass_input) {
  return dict[page] == pass_input
}


var dict = {
  'brian.html': 'madeon'
}
