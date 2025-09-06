import { toast } from "sonner"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

export const showToast = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description,
      icon: <CheckCircle className="w-4 h-4" />,
      duration: 4000,
    })
  },
  
  error: (message: string, description?: string) => {
    toast.error(message, {
      description,
      icon: <XCircle className="w-4 h-4" />,
      duration: 6000,
    })
  },
  
  warning: (message: string, description?: string) => {
    toast.warning(message, {
      description,
      icon: <AlertCircle className="w-4 h-4" />,
      duration: 5000,
    })
  },
  
  info: (message: string, description?: string) => {
    toast.info(message, {
      description,
      icon: <Info className="w-4 h-4" />,
      duration: 4000,
    })
  },
  
  loading: (message: string) => {
    return toast.loading(message, {
      duration: Infinity,
    })
  },
  
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId)
  }
}
