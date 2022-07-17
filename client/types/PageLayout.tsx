import { NextPage } from "next";

export type PageLayout = NextPage & {
  Layout: React.ReactNode
}