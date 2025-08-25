export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  description: string;
  cost: number;
  date: string;
  invoiceUrl?: string;
}

export interface Vehicle {
  id?: string;
  companyId?: string;
  brand: string;
  model: string;
  category: string;
  color: string;
  plate: string;
  purchasePrice: number;
  announcedPrice: number;
  discount: number;
  entryDate: string;
  dailyCost: number;
  saleGoalDays: number;
  adCost: number;
  salespersonId?: string;
  imageUrl?: string;
  status?: 'available' | 'sold';
  saleDate?: string;
  description?: string;
  ipvaDueDate?: string;
  ipvaCost?: number;
  isPriority?: boolean;
  isAdActive?: boolean; // New field for ad status
  maintenance?: MaintenanceRecord[];

  // New detailed optional fields
  modelYear?: number;
  fabricationYear?: number;
  renavam?: string;
  mileage?: number;
  fuelType?: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Híbrido' | 'Elétrico';
  transmission?: 'Manual' | 'Automático' | 'CVT';
  traction?: 'Dianteira' | 'Traseira' | '4x4';
  doors?: number;
  occupants?: number;
  chassis?: string;
  history?: string;
  revisions?: string;
  standardItems?: string;
  additionalAccessories?: string;
  documentStatus?: string;
}

export interface TeamMember {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  monthlySalesGoal: number;
  role: 'Vendedor' | 'Gestor de Tráfego' | 'Gestor';
}

export interface Company {
  id: string;
  name: string;
  isActive: boolean;
  logoUrl: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  ownerEmail?: string;
  instagram?: string;
  ownerName?: string;
  ownerPhone?: string;
  monthlySalesGoal: number;
  monthlyAdBudget?: number;
  marketingDriveUrl?: string;
  visibleFields?: (keyof Vehicle)[]; // New field for visibility control
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  recipientRole: UserRole;
}

export interface MaterialRequest {
  id: string;
  vehicleId: string;
  requestDetails: string;
  assigneeId: string; // companyId or teamMemberId
  requesterId: string; // traffic manager's id
  status: 'pending' | 'completed';
  date: string;
}

export interface Reminder {
  id: string;
  category: string;
  message: string;
  assigneeId: string; // 'everyone' or a team member's ID
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  repetition: 'none' | 'daily' | 'weekly' | 'monthly';
  weekDays?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]; // Only if repetition is 'weekly'
  isActive: boolean;
  createdAt: string;
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
}

export interface AdminNotification {
    id: string;
    message: string;
    date: string;
    read: boolean;
    type: 'new_company';
}

export type LogType = 
  | 'COMPANY_APPROVED'
  | 'COMPANY_DEACTIVATED'
  | 'COMPANY_PENDING'
  | 'COMPANY_DELETED'
  | 'ADMIN_LOGIN_SUCCESS'
  | 'USER_LOGIN_SUCCESS'
  | 'USER_CREATED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'REMINDER_CREATED'
  | 'REMINDER_UPDATED'
  | 'REMINDER_DELETED'
  | 'VEHICLE_CREATED'
  | 'VEHICLE_SOLD'
  | 'VEHICLE_DELETED';

export interface LogEntry {
    id: string;
    timestamp: string;
    type: LogType;
    description: string;
    companyId?: string;
    companyName?: string;
    userId?: string;
    userName?: string;
}


export type Theme = 'light' | 'dark';
export type View = 'admin' | 'dashboard';
export type UserRole = 'admin' | 'company' | 'traffic_manager' | 'salesperson';