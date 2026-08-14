export const site = {
  author: "ryo",
  description:
    "静かめの個人サイト。技術と生活のメモを、広場ではなく部屋として置いています。",
  locale: "ja-JP",
  name: "ryo",
  tagline: "静かめの部屋に、考えてたことと作ったものを置いています。",
  title: "ryo",
  url: "https://ryo-o.me",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/subscribe", label: "Subscribe" },
] as const;
