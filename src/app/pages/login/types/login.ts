export class Login {
    constructor(
      public username: string = '', 
      public password: string = ''
    ){};
}

export  class LoginResponse {
    constructor(
        public token: string
    ){}
}