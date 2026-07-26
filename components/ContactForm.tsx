'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  function validate(data: FormData): string | null {
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const message = (data.get('message') as string)?.trim();

    if (!name || !email || !message) {
      return 'Please fill in your name, email, and a message.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'That email address does not look right.';
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get('_gotcha') as string)?.length) {
      setStatus('success');
      form.reset();
      return;
    }

    const validationError = validate(data);
    if (validationError) {
      setStatus('error');
      setError(validationError);
      return;
    }

    if (!ENDPOINT) {
      setStatus('error');
      setError('The form is not configured yet. Email me directly in the meantime.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        const msg = body?.errors?.[0]?.message as string | undefined;
        setStatus('error');
        setError(msg ?? 'Something went wrong. Please email me directly.');
      }
    } catch {
      setStatus('error');
      setError('Could not reach the server. Please email me directly.');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-sm border border-moss/40 bg-slab p-8"
        role="status"
      >
        <p className="mb-2 font-display text-xl font-semibold text-moss">Message sent.</p>
        <p className="text-ash">
          Thanks for reaching out. I&apos;ll get back to you at the address you gave.
        </p>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-sm border border-rule bg-slab px-4 py-3 text-chalk placeholder:text-ash/60 transition-colors focus:border-iris';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputBase}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputBase}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputBase} resize-y`}
          placeholder="What would you like to talk about?"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-5">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-sm bg-iris px-6 py-2.5 font-mono text-sm text-void transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        <span className="font-mono text-xs text-ash">
          Or email me directly below.
        </span>
      </div>
    </form>
  );
}