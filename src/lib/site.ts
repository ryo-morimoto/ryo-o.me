export const site = {
  name: 'ryo',
  title: 'ryo',
  description:
    '静かめの個人サイト。技術と生活のメモを、広場ではなく部屋として置いています。',
  url: 'https://ryo-o.me',
  author: 'ryo',
  locale: 'ja-JP',
  tagline: '静かめの部屋に、考えてたことと作ったものを置いています。',
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/about', label: 'About' },
  { href: '/subscribe', label: 'Subscribe' },
] as const;

export const letterStamps = [
  { id: 'read', label: '読んだよ', emoji: '📖' },
  { id: 'resonate', label: '響いた', emoji: '🌊' },
  { id: 'thanks', label: 'ありがとう', emoji: '🌿' },
  { id: 'think', label: '考えさせられた', emoji: '💭' },
] as const;
