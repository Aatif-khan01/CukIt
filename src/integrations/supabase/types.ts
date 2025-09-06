export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      coordinator_message: {
        Row: {
          created_at: string
          designation: string
          id: string
          is_active: boolean | null
          message: string
          name: string
          photo_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          designation: string
          id?: string
          is_active?: boolean | null
          message: string
          name: string
          photo_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          designation?: string
          id?: string
          is_active?: boolean | null
          message?: string
          name?: string
          photo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string
          contact_email: string | null
          created_at: string
          current_registrations: number | null
          date_time: string
          description: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          max_registrations: number | null
          status: string
          title: string
          updated_at: string
          venue: string
        }
        Insert: {
          category: string
          contact_email?: string | null
          created_at?: string
          current_registrations?: number | null
          date_time: string
          description: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          max_registrations?: number | null
          status?: string
          title: string
          updated_at?: string
          venue: string
        }
        Update: {
          category?: string
          contact_email?: string | null
          created_at?: string
          current_registrations?: number | null
          date_time?: string
          description?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          max_registrations?: number | null
          status?: string
          title?: string
          updated_at?: string
          venue?: string
        }
        Relationships: []
      }
      faculty: {
        Row: {
          bio: string | null
          created_at: string
          designation: string
          education: string | null
          email: string
          experience: string | null
          id: string
          is_featured: boolean | null
          name: string
          phone: string | null
          photo_url: string | null
          publications: string | null
          specialization: string[]
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          designation: string
          education?: string | null
          email: string
          experience?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
          phone?: string | null
          photo_url?: string | null
          publications?: string | null
          specialization?: string[]
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          designation?: string
          education?: string | null
          email?: string
          experience?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
          phone?: string | null
          photo_url?: string | null
          publications?: string | null
          specialization?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      gallery_albums: {
        Row: {
          category: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          category?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          album_id: string
          created_at: string
          description: string | null
          file_size: number | null
          id: string
          image_url: string
          title: string | null
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          album_id: string
          created_at?: string
          description?: string | null
          file_size?: number | null
          id?: string
          image_url: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string
        }
        Update: {
          album_id?: string
          created_at?: string
          description?: string | null
          file_size?: number | null
          id?: string
          image_url?: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_photos_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "gallery_albums"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          publish_date: string | null
          status: string
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          publish_date?: string | null
          status?: string
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          publish_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          curriculum: string | null
          description: string
          duration: string
          eligibility: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          curriculum?: string | null
          description: string
          duration: string
          eligibility?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          curriculum?: string | null
          description?: string
          duration?: string
          eligibility?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          course: string
          created_at: string
          description: string | null
          downloads: number | null
          file_size: number | null
          file_url: string
          id: string
          semester: string | null
          subject: string
          title: string
          type: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          course: string
          created_at?: string
          description?: string | null
          downloads?: number | null
          file_size?: number | null
          file_url: string
          id?: string
          semester?: string | null
          subject: string
          title: string
          type: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          course?: string
          created_at?: string
          description?: string | null
          downloads?: number | null
          file_size?: number | null
          file_url?: string
          id?: string
          semester?: string | null
          subject?: string
          title?: string
          type?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
