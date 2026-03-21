import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        b1: '#0F0E2A', b2: '#1A1845', b3: '#2D2B6B', b4: '#4845A8', b5: '#6B67D4',
        gold: '#C9A84C', gold2: '#E8C96A', gold3: '#F5DFA0',
        pale: '#F0F0FA', pale2: '#E4E3F5',
        dark: '#08071C', body: '#2E2C5E', muted: '#7B79A8', light: '#ABABCF',
        border: '#E2E1F0', page: '#F8F9FC',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        sm:   '0 2px 16px rgba(15,14,42,.06)',
        md:   '0 8px 36px rgba(15,14,42,.11)',
        lg:   '0 24px 64px rgba(15,14,42,.15)',
        brand:'0 8px 32px rgba(45,43,107,.28)',
        gold: '0 8px 28px rgba(201,168,76,.3)',
      },
      borderRadius: {
        card: '14px', lgcard: '22px', xlcard: '30px',
      },
      backgroundImage: {
        'gm': 'linear-gradient(135deg,#0F0E2A 0%,#1A1845 40%,#2D2B6B 100%)',
        'gs': 'linear-gradient(135deg,#2D2B6B,#4845A8)',
        'gg': 'linear-gradient(135deg,#C9A84C 0%,#E8C96A 50%,#F5DFA0 100%)',
        'gv': 'linear-gradient(135deg,#1A1845,#4845A8)',
      },
      keyframes: {
        hup:  { from:{ opacity:'0', transform:'translateY(26px)' }, to:{ opacity:'1', transform:'none' } },
        blink:{ '0%,100%':{ opacity:'1' }, '50%':{ opacity:'.2' } },
        pulse2:{ '0%,100%':{ opacity:'1' }, '50%':{ opacity:'.4' } },
        tick: { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
        marqueeleft:  { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
        marqueeright: { from:{ transform:'translateX(-50%)' }, to:{ transform:'translateX(0)' } },
        gl: { '0%':{ backgroundPosition:'200% 0' }, '100%':{ backgroundPosition:'-200% 0' } },
        scb: { '0%,100%':{ transform:'scaleY(1)', opacity:'1' }, '50%':{ transform:'scaleY(.5)', opacity:'.3' } },
        ffa: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-12px)' } },
        ffb: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(10px)' } },
      },
      animation: {
        hup:          'hup .85s ease both',
        blink:        'blink 2s ease-in-out infinite',
        pulse2:       'pulse2 2s infinite',
        tick:         'tick 26s linear infinite',
        marqueeleft:  'marqueeleft 40s linear infinite',
        marqueeright: 'marqueeright 38s linear infinite',
        gl:           'gl 3s linear infinite',
        scb:          'scb 2s ease-in-out infinite',
        ffa:          'ffa 5s ease-in-out infinite',
        ffb:          'ffb 6s ease-in-out infinite',
        ffc:          'ffa 7s 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;

