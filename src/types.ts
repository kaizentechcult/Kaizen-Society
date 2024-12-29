export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
}

export type MemberType = {
  _id: string;
  name: string;
  img: string;
  github: string;
  linkedin: string;
  position: string;
  __v: number;
};

export type NotificationType = 'success' | 'error';

export interface TProblem {
  _id?: string;
  srNo: number;
  name: string;
  title: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'WebDev' | 'DSA';
}

export interface TUser {
  _id?: string;
  name: string;
  position: string;
  img: string;
  linkedin: string;
  github: string;
}

export interface TEvent {
  _id?: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  venue: string;
  registrationLink: string;
}

export interface TRequest {
  _id?: string;
  name: string;
  data: string;
  createdAt?: string;
}

export interface TGithubData {
  name: string;
  avatar: string;
}

export interface AddFormProps {
  setIsVisible: (isVisible: boolean) => void;
}

export interface NotificationProps {
  type: NotificationType;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
} 