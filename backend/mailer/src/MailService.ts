import { Injectable } from '@nestjs/common'
import { MailerService } from '@nest-modules/mailer'
import { SentMessageInfo } from 'nodemailer'

import { UserService } from '@backend/users'
import { User, ROLE_SUPPORT } from '@backend/common'

const loginUrl = `https://${process.env.HOST}/login`

type Mail = {
  recievers: string[]
  subject: string
  template: string
  context: {}
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  sendNewRegistredUserMailToSupportUsers({
    id,
    email,
  }: User): Promise<SentMessageInfo | undefined> {
    return this.userService.getUsers().then(
      (users: User[]): Promise<SentMessageInfo | undefined> => {
        const supportUserEmails = users
          .filter(({ role: { role } }) => role === ROLE_SUPPORT)
          .map(({ email: userEmail }: User) => userEmail)

        return supportUserEmails.length
          ? this.send({
              recievers: supportUserEmails,
              subject: 'User registration',
              template: 'register',
              context: {
                userId: id,
                email,
              },
            })
          : Promise.resolve()
      },
    )
  }

  sendNewRegistredUserMailToUser({ email }: User): Promise<SentMessageInfo> {
    return this.send({
      recievers: [email],
      subject: 'Welcome',
      template: 'welcome',
      context: {
        loginUrl,
      },
    })
  }

  private send = ({
    recievers,
    subject,
    template,
    context,
  }: Mail): Promise<SentMessageInfo> => {
    return this.mailerService.sendMail({
      to: recievers.join(', '),
      subject,
      template,
      context,
    })
  }
}
