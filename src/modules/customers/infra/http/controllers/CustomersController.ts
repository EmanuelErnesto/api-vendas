import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listCustomerService = container.resolve(ListCustomerService);

    const customers = await listCustomerService.execute({
      limit,
      page,
    });

    return response.json(customers);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = container.resolve(ShowCustomerService);

    const customer = await showCustomerService.execute({
      id,
    });

    return response.json(customer);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.json(customer);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;
    const updateCustomerService = container.resolve(UpdateCustomerService);

    const customer = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute({
      id,
    });

    return response.status(204).json();
  }
}
