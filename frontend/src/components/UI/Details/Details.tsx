import { ReactNode } from "react";

import style from './Details.module.css'

export const Details = ({ children, title }: { children: ReactNode, title: string }) => {
  return (
    <details key={title} className={style.details}>
      <summary className={style.summary}>
        {title}
      </summary>
      {children}
    </details>
  )
}