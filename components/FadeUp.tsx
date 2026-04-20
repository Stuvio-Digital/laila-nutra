"use client";

import React from "react";
import { motion } from "motion/react";

interface FadeUpProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  as?: keyof React.JSX.IntrinsicElements;
  [key: string]: any;
}

export default function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  yOffset = 50,
  as = "div",
  ...rest
}: FadeUpProps) {
  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
