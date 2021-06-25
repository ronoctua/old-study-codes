export default {
  user: {
    // The username must start with @ and must contain a minimum of 3 and a maximum of 29 lowercase letters without diacritical marks.
    usernameRegExp: /^(@)([a-z]{3,29})$/,

    // Email format.
    emailRegExp:
      /^(?=.{0,254}$)(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    // The password must have a minimum of 8 and a maximum of 32 characters, and at least one uppercase and one lowercase letter.
    passwordRegExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,32}$/,
  },
  note: {
    // The title cannot have two blank spaces in sequence, it cannot start and end with blank space, and must contain a minimum of 1 character and a maximum of 30.
    titleRegExp: /^(?=.{1,30}$)(^([^\s]+\s)*[^\s]+$)/,
  },
};
