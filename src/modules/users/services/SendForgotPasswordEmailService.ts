import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/Errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPassword } from '../domain/models/ISendForgotPassword';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ email }: ISendForgotPassword): Promise<void> {


    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    const token = await this.userTokensRepository.generate(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      body: `Solicitação de redefinição de senha recebida: ${token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
