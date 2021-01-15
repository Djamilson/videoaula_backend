import Correios from 'node-correios';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

interface IFee {
  sedex: {
    Codigo: string;
    Valor: number;
    ValorMaoPropria: string;
    ValorAvisoRecebimento: string;
    ValorValorDeclarado: string;
    Erro: string;
    MsgErro: string;
    ValorSemAdicionais: string;
  };
  pac: {
    Codigo: string;
    Valor: number;
    ValorMaoPropria: string;
    ValorAvisoRecebimento: string;
    ValorValorDeclarado: string;
    Erro: string;
    MsgErro: string;
    ValorSemAdicionais: string;
  };
}

@injectable()
class FeeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IFee | undefined> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('There not find any user with the givan id');
    }
    const { zip_code } = userExists.person.address;

    const correios = new Correios();

    const dataUnic = {
      sCepOrigem: process.env.SCEPORIGEM,
      sCepDestino: zip_code,
      nVlPeso: '3',
      nCdFormato: '1',
      nVlComprimento: '54',
      nVlAltura: '32',
      nVlLargura: '40',
      nVlDiametro: '40',
    };
    const argsSEDEX = {
      nCdServico: '04014',
      ...dataUnic,
    };

    const argsPAC = {
      nCdServico: '04510',
      ...dataUnic,
    };

    const dataSedex = await correios.calcPreco(argsSEDEX);
    const dataPac = await correios.calcPreco(argsPAC);

    return {
      sedex: dataSedex[0].Valor.replace(',', '.'),
      pac: dataPac[0].Valor.replace(',', '.'),
    };
  }
}

export default FeeService;
