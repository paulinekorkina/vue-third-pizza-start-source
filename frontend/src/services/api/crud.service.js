import { ApiService } from '@/services/api/api.service';

export class CrudService extends ApiService {
  constructor(resource) {
    super();
    this.resource = resource;
  }

  get() {
    return this.$get(this.resource);
  }

  post(entity) {
    return this.$post(this.resource, entity);
  }

  put(entity) {
    return this.$put(`${this.resource}/${entity.id}`, entity);
  }

  delete(id = false) {
    const path = id ? `${this.resource}/${id}` : `${this.resource}`;
    return this.$delete(path);
  }
}
