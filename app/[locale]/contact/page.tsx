'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FIELD_BORDER = 'rgba(26,95,122,0.3)';
const FIELD_FOCUS  = '#1A5F7A';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075 } },
};

const item = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

interface FormState {
  name:      string;
  company:   string;
  role:      string;
  email:     string;
  phone:     string;
  challenge: string;
}

const INITIAL: FormState = { name: '', company: '', role: '', email: '', phone: '', challenge: '' };

export default function ContactPage() {
  const t = useTranslations('Contact');

  const [form,    setForm]    = useState<FormState>(INITIAL);
  const [status,  setStatus]  = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  function inputStyle(name: string): React.CSSProperties {
    return {
      width: '100%',
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${focused === name ? FIELD_FOCUS : FIELD_BORDER}`,
      borderRadius: '2px',
      color: '#F4F7F8',
      fontSize: '14px',
      padding: '14px 16px',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      fontFamily: 'var(--font-inter)',
    };
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(244,247,248,0.4)',
    marginBottom: '8px',
    fontFamily: 'var(--font-inter)',
  };

  return (
    <>
      <Navbar />

      <main style={{ background: '#070A0D', minHeight: '100vh' }}>
        {/* Ambient glow */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(26,95,122,0.11) 0%, transparent 60%)',
          }}
        />

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* ── Success screen ── */
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center"
            >
              {/* Animated checkmark */}
              <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
                {/* Static background circle */}
                <circle cx="44" cy="44" r="42" stroke="rgba(26,95,122,0.25)" strokeWidth="1" />

                {/* Animated ring */}
                <motion.circle
                  cx="44" cy="44" r="42"
                  stroke="#1A5F7A"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ transformOrigin: '44px 44px' }}
                />

                {/* Checkmark */}
                <motion.path
                  d="M26 44L38 56L62 30"
                  stroke="#7ECECA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.55, ease: 'easeOut' }}
                />
              </svg>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontSize: 'clamp(40px, 8vw, 64px)',
                  fontWeight: 800,
                  color: '#F4F7F8',
                  lineHeight: 1.05,
                  marginTop: '32px',
                }}
              >
                {t('success.title')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.4 }}
                style={{
                  color: 'rgba(244,247,248,0.5)',
                  fontSize: '18px',
                  lineHeight: 1.75,
                  marginTop: '20px',
                  maxWidth: '440px',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {t('success.copy')}
              </motion.p>
            </motion.div>
          ) : (
            /* ── Form screen ── */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"
              style={{ paddingTop: '120px', paddingBottom: '96px' }}
            >
              <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">

                {/* ── Left column: copy ── */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="lg:sticky lg:top-32"
                >
                  <motion.div variants={item}>
                    <div
                      style={{
                        height: '1px', width: '48px',
                        background: '#D7B56D',
                        marginBottom: '24px',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#1A5F7A',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      {t('eyebrow')}
                    </span>
                  </motion.div>

                  <motion.h1
                    variants={item}
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontSize: 'clamp(52px, 7vw, 80px)',
                      fontWeight: 800,
                      color: '#F4F7F8',
                      lineHeight: 1.0,
                      marginTop: '20px',
                    }}
                  >
                    {t('title')}
                  </motion.h1>

                  <motion.p
                    variants={item}
                    style={{
                      color: 'rgba(244,247,248,0.5)',
                      fontSize: '17px',
                      lineHeight: 1.75,
                      marginTop: '24px',
                      maxWidth: '440px',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {t('copy')}
                  </motion.p>

                  <motion.div
                    variants={item}
                    style={{
                      height: '1px',
                      background: 'rgba(26,95,122,0.2)',
                      marginTop: '48px',
                      maxWidth: '280px',
                    }}
                  />
                </motion.div>

                {/* ── Right column: form ── */}
                <motion.form
                  onSubmit={handleSubmit}
                  variants={container}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-5"
                >
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <motion.div variants={item}>
                      <label htmlFor="name" style={labelStyle}>
                        {t('form.name')}{' '}
                        <span style={{ color: '#1A5F7A' }}>*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={set('name')}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder={t('form.namePlaceholder')}
                        style={inputStyle('name')}
                      />
                    </motion.div>

                    <motion.div variants={item}>
                      <label htmlFor="company" style={labelStyle}>
                        {t('form.company')}
                      </label>
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={set('company')}
                        onFocus={() => setFocused('company')}
                        onBlur={() => setFocused(null)}
                        placeholder={t('form.companyPlaceholder')}
                        style={inputStyle('company')}
                      />
                    </motion.div>
                  </div>

                  {/* Role + Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <motion.div variants={item}>
                      <label htmlFor="role" style={labelStyle}>
                        {t('form.role')}
                      </label>
                      <input
                        id="role"
                        type="text"
                        autoComplete="organization-title"
                        value={form.role}
                        onChange={set('role')}
                        onFocus={() => setFocused('role')}
                        onBlur={() => setFocused(null)}
                        placeholder={t('form.rolePlaceholder')}
                        style={inputStyle('role')}
                      />
                    </motion.div>

                    <motion.div variants={item}>
                      <label htmlFor="email" style={labelStyle}>
                        {t('form.email')}{' '}
                        <span style={{ color: '#1A5F7A' }}>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={set('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder={t('form.emailPlaceholder')}
                        style={inputStyle('email')}
                      />
                    </motion.div>
                  </div>

                  {/* Phone */}
                  <motion.div variants={item}>
                    <label htmlFor="phone" style={labelStyle}>
                      {t('form.phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      placeholder={t('form.phonePlaceholder')}
                      style={inputStyle('phone')}
                    />
                  </motion.div>

                  {/* Challenge */}
                  <motion.div variants={item}>
                    <label htmlFor="challenge" style={labelStyle}>
                      {t('form.challenge')}{' '}
                      <span style={{ color: '#1A5F7A' }}>*</span>
                    </label>
                    <textarea
                      id="challenge"
                      required
                      rows={5}
                      value={form.challenge}
                      onChange={set('challenge')}
                      onFocus={() => setFocused('challenge')}
                      onBlur={() => setFocused(null)}
                      placeholder={t('form.challengePlaceholder')}
                      style={{ ...inputStyle('challenge'), resize: 'vertical' }}
                    />
                  </motion.div>

                  {/* Inline error */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          color: '#E57373',
                          fontSize: '13px',
                          fontFamily: 'var(--font-inter)',
                          marginTop: '-8px',
                        }}
                      >
                        {t('error')}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.div variants={item}>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="transition-colors duration-200"
                      style={{
                        background: '#1A5F7A',
                        color: '#F4F7F8',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '16px 48px',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        fontFamily: 'var(--font-inter)',
                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                        opacity: status === 'submitting' ? 0.65 : 1,
                        transition: 'background 0.2s ease, opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (status !== 'submitting')
                          (e.currentTarget as HTMLButtonElement).style.background = '#155168';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#1A5F7A';
                      }}
                    >
                      {status === 'submitting' ? t('form.submitting') : t('form.submit')}
                    </button>
                  </motion.div>
                </motion.form>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
