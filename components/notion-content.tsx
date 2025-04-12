"use client"

import { useState, useEffect } from "react"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"

interface NotionContentProps {
  markdown: string
}

export function NotionContent({ markdown }: NotionContentProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="animate-pulse bg-gray-100 h-40 rounded-md" />
  }

  // You can add custom components to enhance your Markdown rendering
  const components = {
    img: (props: any) => (
      <div className="my-6 rounded-lg overflow-hidden">
        <Image
          {...props}
          alt={props.alt || "Food blog image"}
          width={800}
          height={500}
          className="w-full object-cover"
        />
      </div>
    ),
  }

  return <MDXRemote source={markdown} components={components} />
}
