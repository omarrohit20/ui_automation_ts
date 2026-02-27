import type { User } from '../domain/models';

export class UserBuilder {
  private emailValue = `user_${Date.now()}@juice-sh.op`;
  private passwordValue = 'P@ssw0rd123!';
  private securityQuestionValue?: string;
  private securityAnswerValue?: string;

  withEmail(email: string): this {
    this.emailValue = email;
    return this;
  }

  withPassword(password: string): this {
    this.passwordValue = password;
    return this;
  }

  withSecurity(question: string, answer: string): this {
    this.securityQuestionValue = question;
    this.securityAnswerValue = answer;
    return this;
  }

  build(): User {
    return {
      email: this.emailValue,
      password: this.passwordValue,
      securityQuestion: this.securityQuestionValue,
      securityAnswer: this.securityAnswerValue,
    };
  }
}

export class UserFactory {
  static validUser(): User {
    return new UserBuilder().build();
  }

  static invalidPasswordUser(): User {
    return new UserBuilder().withPassword('short').build();
  }
}

