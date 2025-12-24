import { Skeleton } from '@/components/ui/skeleton';

export const CardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-6 space-y-4">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
    <Skeleton className="h-8 w-24" />
  </div>
);

export const BlogCardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border-b border-border">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <Skeleton className="h-8 w-20" />
  </div>
);

export const StatCardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen">
    {/* Header skeleton */}
    <div className="h-16 border-b border-border bg-background px-4 flex items-center justify-between">
      <Skeleton className="h-8 w-32" />
      <div className="flex gap-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
    
    {/* Content skeleton */}
    <div className="container mx-auto py-8 space-y-8">
      <Skeleton className="h-12 w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-[600px] bg-muted flex items-center justify-center">
    <div className="text-center space-y-6 max-w-3xl px-4">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <div className="flex gap-4 justify-center">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  </div>
);
