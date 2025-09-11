import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ErrorBoundary } from "@/components/error-boundary";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Faculty = lazy(() => import("./pages/Faculty"));
const StudyMaterials = lazy(() => import("./pages/StudyMaterials"));
const Events = lazy(() => import("./pages/Events"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const FacultyManagement = lazy(() => import("./pages/admin/FacultyManagement"));
const EventsManagement = lazy(() => import("./pages/admin/EventsManagement"));
const StudyMaterialsManagement = lazy(() => import("./pages/admin/StudyMaterialsManagement"));
const GalleryManagement = lazy(() => import("./pages/admin/GalleryManagement"));
const NewsManagement = lazy(() => import("./pages/admin/NewsManagement"));
const BackupManagement = lazy(() => import("./pages/admin/BackupManagement"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="w-full max-w-4xl space-y-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/programs" element={<Programs />} />
                      <Route path="/faculty" element={<Faculty />} />
                      <Route path="/study-materials" element={<StudyMaterials />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/contact" element={<Contact />} />
                      
                      {/* Admin Routes */}
                      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                      <Route path="/admin/faculty" element={<AdminLayout><FacultyManagement /></AdminLayout>} />
                      <Route path="/admin/events" element={<AdminLayout><EventsManagement /></AdminLayout>} />
                      <Route path="/admin/materials" element={<AdminLayout><StudyMaterialsManagement /></AdminLayout>} />
                      <Route path="/admin/gallery" element={<AdminLayout><GalleryManagement /></AdminLayout>} />
                      <Route path="/admin/news" element={<AdminLayout><NewsManagement /></AdminLayout>} />
                      <Route path="/admin/backup" element={<AdminLayout><BackupManagement /></AdminLayout>} />
                      
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
};

export default App;
