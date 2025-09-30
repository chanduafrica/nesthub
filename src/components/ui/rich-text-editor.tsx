
"use client"

import * as React from "react"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"

const RichTextEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props}>
    {children}
  </div>
))
RichTextEditor.displayName = "RichTextEditor"

const RichTextEditorToolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between rounded-t-lg border bg-background p-2",
        className
      )}
      {...props}
    />
  )
})
RichTextEditorToolbar.displayName = "RichTextEditorToolbar"

const RichTextEditorContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      contentEditable
      className={cn(
        "h-48 w-full rounded-b-lg border-x border-b p-4 text-base focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
RichTextEditorContent.displayName = "RichTextEditorContent"

const RichTextEditorCharacterCount = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    characterLimit: number
  }
>(({ className, characterLimit, ...props }, ref) => {
  const [text, setText] = React.useState("")

  return (
    <span
      ref={ref}
      className={cn(
        "mt-2.5 text-sm text-muted-foreground",
        text.length > characterLimit && "text-destructive",
        className
      )}
      {...props}
    >
      <Balancer>
        {text.length}/{characterLimit} characters
      </Balancer>
    </span>
  )
})

RichTextEditorCharacterCount.displayName = "RichTextEditorCharacterCount"

export {
  RichTextEditor,
  RichTextEditorContent,
  RichTextEditorToolbar,
  RichTextEditorCharacterCount,
}
