const BASE_URL = `http://localhost:5000/api`

export const User = {
  async create(params) {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      const newUser = await response.json();

      return newUser
    } catch (error) {
      console.error(error)
    }
  }
};

export const Session = {
  async create(params) {
    try {
      const response = await fetch(`${BASE_URL}/session`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      console.log(`response2: `, response);
      const session = await response.json();

      return session;
    } catch (error) {
      console.error(error)
    }
  },
  async destroy() {
    try {
      const response = await fetch(`${BASE_URL}/session`, {
        method: "DELETE",
        credentials: "include"
      });
      const sessionOver = await response.json();
      return sessionOver
    } catch (error) {
      console.error(error)
    }
  },
  async getCurrentSession() {
    try {
     const response = await fetch(`${BASE_URL}/session`, {
        credentials: 'include'
      });
     const json = await response.json();
     return json;
    } catch (error) {
      console.error(error)
    }
  }
}