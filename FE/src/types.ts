export type User = {
  id: number
  fullName: string
  email: string
}

export type AuthResponse = {
  token: string
  user: User
}

export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = {
  email: string
  fullName: string
  password: string
}

export type Task = {
  id: number
  title: string
  description?: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export type JwtPayload = {
  userId: number;
  fullName: string;
  email: string;
};
export type CreateTaskPayload = Pick<Task, 'title' | 'description'>
export type UpdateTaskPayload = Partial<Pick<Task, 'title' | 'description' | 'completed'>>