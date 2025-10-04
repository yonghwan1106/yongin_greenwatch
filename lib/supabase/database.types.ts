export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ReportType = 'smell' | 'wastewater' | 'waste' | 'noise' | 'air' | 'water' | 'other';
export type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'rejected';
export type StoreCategory = 'zero_waste' | 'local_food' | 'eco_restaurant' | 'secondhand' | 'eco_cafe' | 'other';
export type PointTransactionType =
  | 'signup_bonus'
  | 'report_submitted'
  | 'report_empathized'
  | 'empathy_given'
  | 'monthly_bonus'
  | 'challenge_completed'
  | 'point_used'
  | 'point_refund';

export interface Database {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string;
          user_id: string | null;
          type: ReportType;
          description: string | null;
          lat: number;
          lng: number;
          address: string | null;
          status: ReportStatus;
          empathy_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          type: ReportType;
          description?: string | null;
          lat: number;
          lng: number;
          address?: string | null;
          status?: ReportStatus;
          empathy_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          type?: ReportType;
          description?: string | null;
          lat?: number;
          lng?: number;
          address?: string | null;
          status?: ReportStatus;
          empathy_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      report_media: {
        Row: {
          id: string;
          report_id: string;
          media_url: string;
          media_type: 'image' | 'video';
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          media_url: string;
          media_type: 'image' | 'video';
          uploaded_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          media_url?: string;
          media_type?: 'image' | 'video';
          uploaded_at?: string;
        };
      };
      report_empathy: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      report_ai_analysis: {
        Row: {
          id: string;
          report_id: string;
          keywords: string[];
          detailed_type: string | null;
          severity: 'low' | 'medium' | 'high' | null;
          recommended_department: string | null;
          image_description: string | null;
          confidence_score: number | null;
          analyzed_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          keywords: string[];
          detailed_type?: string | null;
          severity?: 'low' | 'medium' | 'high' | null;
          recommended_department?: string | null;
          image_description?: string | null;
          confidence_score?: number | null;
          analyzed_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          keywords?: string[];
          detailed_type?: string | null;
          severity?: 'low' | 'medium' | 'high' | null;
          recommended_department?: string | null;
          image_description?: string | null;
          confidence_score?: number | null;
          analyzed_at?: string;
        };
      };
      report_status_history: {
        Row: {
          id: string;
          report_id: string;
          status: ReportStatus;
          comment: string | null;
          department: string | null;
          updated_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          status: ReportStatus;
          comment?: string | null;
          department?: string | null;
          updated_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          status?: ReportStatus;
          comment?: string | null;
          department?: string | null;
          updated_by?: string | null;
          created_at?: string;
        };
      };
      air_quality_history: {
        Row: {
          id: number;
          station_name: string;
          measured_at: string;
          pm10_value: number | null;
          pm25_value: number | null;
          o3_value: number | null;
          no2_value: number | null;
          so2_value: number | null;
          co_value: number | null;
          pm10_grade: number | null;
          pm25_grade: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          station_name: string;
          measured_at: string;
          pm10_value?: number | null;
          pm25_value?: number | null;
          o3_value?: number | null;
          no2_value?: number | null;
          so2_value?: number | null;
          co_value?: number | null;
          pm10_grade?: number | null;
          pm25_grade?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          station_name?: string;
          measured_at?: string;
          pm10_value?: number | null;
          pm25_value?: number | null;
          o3_value?: number | null;
          no2_value?: number | null;
          so2_value?: number | null;
          co_value?: number | null;
          pm10_grade?: number | null;
          pm25_grade?: number | null;
          created_at?: string;
        };
      };
      user_points: {
        Row: {
          user_id: string;
          total_points: number;
          available_points: number;
          used_points: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          total_points?: number;
          available_points?: number;
          used_points?: number;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          total_points?: number;
          available_points?: number;
          used_points?: number;
          updated_at?: string;
        };
      };
      point_transactions: {
        Row: {
          id: string;
          user_id: string;
          type: PointTransactionType;
          amount: number;
          balance_after: number;
          reference_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: PointTransactionType;
          amount: number;
          balance_after: number;
          reference_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: PointTransactionType;
          amount?: number;
          balance_after?: number;
          reference_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
      partner_stores: {
        Row: {
          id: string;
          name: string;
          category: StoreCategory;
          address: string | null;
          lat: number | null;
          lng: number | null;
          phone: string | null;
          business_hours: Json | null;
          description: string | null;
          logo_url: string | null;
          status: 'active' | 'inactive';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: StoreCategory;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
          phone?: string | null;
          business_hours?: Json | null;
          description?: string | null;
          logo_url?: string | null;
          status?: 'active' | 'inactive';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: StoreCategory;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
          phone?: string | null;
          business_hours?: Json | null;
          description?: string | null;
          logo_url?: string | null;
          status?: 'active' | 'inactive';
          created_at?: string;
        };
      };
      store_benefits: {
        Row: {
          id: string;
          store_id: string;
          title: string | null;
          description: string | null;
          point_cost: number;
          discount_type: 'percent' | 'fixed' | null;
          discount_value: number | null;
          max_usage_per_user: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          title?: string | null;
          description?: string | null;
          point_cost: number;
          discount_type?: 'percent' | 'fixed' | null;
          discount_value?: number | null;
          max_usage_per_user?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          title?: string | null;
          description?: string | null;
          point_cost?: number;
          discount_type?: 'percent' | 'fixed' | null;
          discount_value?: number | null;
          max_usage_per_user?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
