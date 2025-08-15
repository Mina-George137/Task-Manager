import axios from './axiosClient';
import type { Task, CreateTaskPayload, UpdateTaskPayload } from '../types';

export const getTasks = async () => {
  const { data } = await axios.get('/task');
  return Array.isArray(data.Tasks) ? data.Tasks : [];
};


export const createTask = async (payload: CreateTaskPayload) => {
  const { data } = await axios.post<Task>('/task', payload);
  return data;
};

export const updateTask = async (id: number, payload: UpdateTaskPayload) => {
  const { data } = await axios.put<Task>(`/task?taskId=${id}`, payload);
  return data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`/task?taskId=${id}`);
};

export const toggleTask = async (id: number, completed: boolean) => {
  const { data } = await axios.put<Task>(`/task?taskId=${id}`, { completed });
  return data;
};
