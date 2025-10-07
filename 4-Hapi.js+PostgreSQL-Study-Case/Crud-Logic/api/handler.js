import autoBind from "auto-bind";

export class EmployeeHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async addEmployeeHandler(request, h) {
    const { name, email, position, birthDate, address } = request.payload;
    this._validator.validateEmployeePayload({ name, email, position, birthDate, address });

    const { id } = await this._service.addEmployeeService({ name, email, position, birthDate, address });

    return h.response({
      status: "success",
      message: "Karyawan berhasil ditambahkan",
      data: {
        id,
      },
    }).code(201);
  }
}