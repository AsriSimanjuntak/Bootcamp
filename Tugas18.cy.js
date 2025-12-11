describe('API Automation', () => {

  // 1️⃣ GET all users
  it('GET /users - retrieve all users', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(10);
      });
  });

  // 2️⃣ GET single user
  it('GET /users/1 - retrieve single user', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1);
      });
  });

  // 3️⃣ POST create new user
  it('POST /users - create new user', () => {
    cy.request('POST', 'https://jsonplaceholder.typicode.com/users', {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'John Doe');
    });
  });

  // 4️⃣ PUT update a user
  it('PUT /users/1 - update user', () => {
    cy.request('PUT', 'https://jsonplaceholder.typicode.com/users/1', {
      id: 1,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Jane Doe');
    });
  });

  // 5️⃣ PATCH update partial user info
  it('PATCH /users/1 - update partial user info', () => {
    cy.request('PATCH', 'https://jsonplaceholder.typicode.com/users/1', {
      email: 'updated@example.com'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('email', 'updated@example.com');
    });
  });

  // 6️⃣ DELETE a user
  it('DELETE /users/1 - delete a user', () => {
    cy.request('DELETE', 'https://jsonplaceholder.typicode.com/users/1')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  // 7️⃣ GET posts by user
  it('GET /posts?userId=1 - get posts by user', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts?userId=1')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property('userId', 1);
      });
  });

});
