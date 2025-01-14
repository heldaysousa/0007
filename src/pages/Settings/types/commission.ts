export interface CommissionDashboardData {
  totalCommissions: number;
  pendingCommissions: number;
  averageRate: number;
  topProfessionals: Array<{
    name: string;
    total: number;
    count: number;
  }>;
}

export interface CommissionSettings {
  defaultClosingDay: number;
  defaultPaymentDeadline: number;
  defaultCommissionRate: number;
}
