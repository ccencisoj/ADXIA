import delay from 'delay';
import _axios from 'axios';

const axios = _axios.create({
  withCredentials: true
});

const SERVER_BASE_URI = process.env.NEXT_PUBLIC_SERVER_BASE_URI;

const http = {
  get: async (url, config)=> {
    return await axios.get(`${SERVER_BASE_URI}${url}`, config);
  },

  post: async (url, data, config)=> {
    return await axios.post(`${SERVER_BASE_URI}${url}`, data, config);
  },

  put: async (url, data, config)=> {
    return await axios.put(`${SERVER_BASE_URI}${url}`, data, config);
  },

  delete: async (url, config)=> {
    return await axios.delete(`${SERVER_BASE_URI}${url}`, config);
  }
}

const Employee = {
  getById: async (employeeId)=> {
    return (await http.get(`/employee?employeeId=${employeeId}`)).data.employee;
  },
  getList: async (skip, limit, searchValue)=> {
    await delay(1000);

    return (await http.get(`/employees?skip=${skip}&&limit=${limit}&&search=${searchValue}`)).data.employees;
  },
  create: async (data)=> {
    await delay(1000);

    const employee = (
      await http.post("/employee", 
      {
        name: data.name,
        type: data.type,
        surname: data.surname,
        email: data.email,
        birthDate: data.birthDate,
        nroDocument: data.nroDocument,
        imageURL: data.imageURL,
        accessCode: data.accessCode,
        phone: data.phone
      }
    )).data.employee;

    return employee;
  },
  update: async (employee)=> {
    await delay(1000);

    return (
      await http.put(`/employee?employeeId=${employee.id}`, 
      {
        name: employee.name,
        type: employee.type,
        surname: employee.surname,
        email: employee.email,
        birthDate: employee.birthDate,
        nroDocument: employee.nroDocument,
        imageURL: employee.imageURL,
        accessCode: employee.accessCode,
        phone: employee.phone
      }
    )).data.employee;
  },
  delete: async (employee)=> {
    return (await http.delete(`/employee?employeeId=${employee.id}`)).data;
  },
  login: async (data)=> {
    return (await http.post(
      "/employee/login", 
      {
        nroDocument: data.nroDocument,
        accessCode: data.accessCode
      }
    )).data.employee;
  },
  logout: async ()=> {
    await delay(1000);

    return await http.post("/employee/logout");
  },
  // The cookie only is necessary in side server
  current: async (cookie)=> {
    return (await http.get(`/employee/current`, {
      headers: {
        cookie: cookie ? cookie : ""
      }
    })).data.employee;
  }
}

const Client = {
  getById: async (clientId)=> {
    await delay(1000);

    return (await http.get(`/client?clientId=${clientId}`)).data.client;
  },
  getList: async (skip, limit, searchValue)=> {
    await delay(1000);

    return (await http.get(`/clients?skip=${skip}&&limit=${limit}&&search=${searchValue}`)).data.clients;
  },
  create: async (data)=> {
    await delay(1000);

    const client = (await http.post(`/client`, {
      name: data.name,
      surname: data.surname,
      nroDocument: data.nroDocument,
      phoneNumber: data.phone,
      address: data.address,
      imageURL: data.imageURL,
      business: data.business,
      imageURL: data.imageURL
    })).data.client;

    return client;
  },
  update: async (client)=> {
    return (await http.put(`/client?clientId=${client.id}`, {
      name: client.name,
      surname: client.surname,
      nroDocument: client.nroDocument,
      phone: client.phone,
      address: client.address,
      imageURL: client.imageURL,
      business: client.business
    })).data;
  },
  delete: async (client)=> {
    return (await http.delete(`/client?clientId=${client.id}`)).data;
  }
}

const Order = {
  populate: async (order)=> {
    try {
      const client = await agent.Order.getClient(order);
      
      const products = await agent.Order.getProducts(order, 0, 20);

      const populatedProducts = [];

      for(let product of products) {
        const pProduct = await agent.Order.populateOrderProduct(product);
        
        populatedProducts.push(pProduct);
      }

      return {...order, client, products: populatedProducts};

    }catch(error) {      
      throw error;
    }
  },
  populateOrderProduct: async (orderProduct)=> {
    try {
      const product = await agent.Product.getById(orderProduct.productId);

      return {...orderProduct, product};

    }catch(error) {
      throw error;
    }
  },
  getById: async (orderId)=> {
    const order = (await http.get(`/order?orderId=${orderId}`)).data.order;

    const populatedOrder = await agent.Order.populate(order);

    return populatedOrder;
  },
  getList: async (skip, limit, searchValue, deliveryState)=> {
    await delay(1000);

    const arrQuery = [];

    if(skip && limit) arrQuery.push(`skip=${skip}&&limit=${limit}`);
    if(searchValue) arrQuery.push(`search=${searchValue}`);
    if(deliveryState) arrQuery.push(`deliveryState=${deliveryState}`);

    const query = arrQuery.join("&&");
 
    const orders = (await http.get(`/orders?${query}`)).data.orders;

    const populatedOrders = [];

    for(let order of orders) {
      try {
        const pOrder = await agent.Order.populate(order);

        populatedOrders.push(pOrder);

      }catch(error) {
        // ignore error
      }
    }

    return populatedOrders;
  },
  getClient: async (order)=> {
    return (await http.get(`/client?clientId=${order.clientId}`)).data.client;
  },
  getClients: async (skip, limit)=> {
    return (await http.get(`/orders/clients?skip=${skip}&&limit=${limit}`)).data.clients;
  },
  getProducts: async (order, skip, limit)=> {
    return (await http.get(`/order/products?orderId=${order.id}&&skip=${skip}&&limit=${limit}`)).data.products
  },
  create: async (data)=> {
    await delay(1000);

    const products = data.products.map((product)=> (
      {productId: product.productId, quantity: product.quantity}
    ));

    const order = (await http.post(
      `/order`,
      {
        clientId: data.client.id,
        products: products
      }
    )).data.order;

    return order;
  },
  update: async (order)=> {

    await delay(1000);

    if(order.products) {
      const products = order.products.map((product)=> (
        {productId: product.productId, quantity: product.quantity}
      ));
  
      return (await http.put(
        `/order?orderId=${order.id}`,
        {
          clientId: order.clientId,
          products: products
        }
      )).data;
    }else {
      return (await http.put(
        `/order?orderId=${order.id}`,
        {
          deliveryState: order.deliveryState
        }
      )).data;
    }
  },
  delete: async (order)=> {
    return (await http.delete(`/order?orderId=${order.id}`)).data;
  }
}

const Product = {
  getById: async (productId)=> {
    return (await http.get(`/product?productId=${productId}`)).data.product;
  },
  getList: async (skip, limit, searchValue)=> {
    await delay(1000);

    const products = (await http.get(`/products?skip=${skip}&&limit=${limit}&&search=${searchValue}`)).data.products;

    return products;
  },
  create: async (data)=> {
    await delay(1000);

    const product = (await http.post(
      `/product`,
      {
        name: data.name,
        brand: data.brand,
        avaliableQuantity: data.avaliableQuantity,
        price: data.price,
        description: data.description,
        grammage: data.grammage,
        imageURL: data.imageURL
      }
    )).data.product;

    return product;
  },
  update: async (product)=> {
    return (await http.put(
      `/product?productId=${product.id}`,
      {
        imageURL: product.imageURL,
        name: product.name,
        brand: product.brand,
        avaliableQuantity: product.avaliableQuantity,
        price: product.price,
        description: product.description,
        grammage: product.grammage
      }
    )).data;
  },
  delete: async (product)=> {
    return (await http.delete(`/product?productId=${product.id}`)).data;
  }
}

const Image = {
  upload: async (imageBlob)=> {

    const formData = new FormData();   
    
    formData.set("image", imageBlob);

    const image = (await http.post("/tempImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })).data.image;

    return image;
  }
}

export const agent = {
  Employee,
  Client,
  Order,
  Product,
  Image
}
