import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' }>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variants = {
            default: "bg-primary/20 text-primary border-primary/30",
            secondary: "bg-secondary text-secondary-foreground border-border",
            success: "bg-green-500/20 text-green-400 border-green-500/30",
            warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            destructive: "bg-red-500/20 text-red-400 border-red-500/30",
            outline: "border-border text-foreground",
        }
        return (
            <div ref={ref} className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
        )
    }
)
Badge.displayName = "Badge"

const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: number; color?: string }>(
    ({ className, value = 0, color = "bg-primary", ...props }, ref) => (
        <div ref={ref} className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
            <div className={cn("h-full transition-all duration-700 ease-out rounded-full", color)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
        </div>
    )
)
Progress.displayName = "Progress"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea ref={ref} className={cn("flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors", className)} {...props} />
    )
)
Textarea.displayName = "Textarea"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input ref={ref} className={cn("flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
    )
)
Input.displayName = "Input"

export { Badge, Progress, Textarea, Input }
