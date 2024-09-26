let users = [
    { email: 'test@example.com', password: 'password123', name: 'Test User' },
    { email: 'admin@gmail.com', password: '123456789', name: 'Admin User' }
  ];
let tasks = [];

export const mockAPI = {
  register: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userExists = users.find((user) => user.email === userData.email);
        if (userExists) {
          reject("User already exists");
        } else {
          users.push(userData);
          resolve("Registration successful");
        }
      }, 500);
    });
  },

  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          resolve(user);
        } else {
          reject("Invalid credentials");
        }
      }, 500);
    });
  },

  getTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasks);
      }, 500);
    });
  },

  addTask: (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasks.push(task);
        resolve("Task added successfully");
      }, 500);
    });
  },

  updateTask: (taskId, updatedTask) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
        resolve("Task updated");
      }, 500);
    });
  },

  deleteTask: (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasks = tasks.filter((task) => task.id !== taskId);
        resolve("Task deleted");
      }, 500);
    });
  },
};
