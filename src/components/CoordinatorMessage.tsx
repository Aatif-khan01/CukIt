import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
interface CoordinatorMessage {
  id: string;
  name: string;
  designation: string;
  message: string;
  photo_url: string | null;
}
export function CoordinatorMessage() {
  const [coordinator, setCoordinator] = useState<CoordinatorMessage | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCoordinatorMessage = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('coordinator_message').select('*').eq('is_active', true).single();
        if (error) throw error;
        setCoordinator(data);
      } catch (error) {
        console.error('Error fetching coordinator message:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinatorMessage();
  }, []);
  if (loading) {
    return <Card className="glass-card">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>;
  }
  if (!coordinator) {
    return null;
  }
  return;
}