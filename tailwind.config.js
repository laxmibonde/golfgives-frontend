export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        burg:   { 900:'#1a0a0e', 800:'#2d1018', 700:'#3d1520', 600:'#4e1a28', 500:'#6b2235' },
        gold:   { DEFAULT:'#f5c842', dim:'#c9a030' },
        rose:   { DEFAULT:'#fb7185', dim:'#e11d48' },
        blue:   { DEFAULT:'#38bdf8', dim:'#0284c7' },
        violet: { DEFAULT:'#a78bfa', dim:'#7c3aed' },
        green:  { DEFAULT:'#4ade80', dim:'#16a34a' },
        cream:  '#fdf4ec',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['"Outfit"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':   'fadeIn 0.5s ease both',
        'spin-slow': 'spinSlow 20s linear infinite',
        'float':     'float 6s ease-in-out infinite',
        'marquee':   'marquee 28s linear infinite',
        'heartbeat': 'heartbeat 2.5s ease-in-out infinite',
        'bounce-ball':'ballBounce 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
