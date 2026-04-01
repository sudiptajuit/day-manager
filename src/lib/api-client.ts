import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }

    // Add request interceptor
    this.api.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Add response interceptor for errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          this.setToken(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  async signup(email: string, password: string, name?: string) {
    const response = await this.api.post('/api/auth/signup', {
      email,
      password,
      name,
    });
    return response.data.data;
  }

  async login(email: string, password: string) {
    const response = await this.api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data.data;
  }

  async getTodos() {
    const response = await this.api.get('/api/todos');
    return response.data.data;
  }

  async createTodo(title: string, description?: string, dueDate?: string) {
    const response = await this.api.post('/api/todos', {
      title,
      description,
      dueDate,
    });
    return response.data.data;
  }

  async updateTodo(
    id: number,
    title?: string,
    description?: string,
    completed?: boolean,
    dueDate?: string
  ) {
    const response = await this.api.put(`/api/todos/${id}`, {
      title,
      description,
      completed,
      dueDate,
    });
    return response.data.data;
  }

  async deleteTodo(id: number) {
    const response = await this.api.delete(`/api/todos/${id}`);
    return response.data.data;
  }
}

export const apiClient = new ApiClient();
