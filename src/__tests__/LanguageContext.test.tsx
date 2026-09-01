import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

const TestComponent = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="translated">{t('home')}</span>
      <button onClick={() => setLang('hi')}>Switch to Hindi</button>
    </div>
  );
};

describe('LanguageContext', () => {
  afterEach(() => {
    cleanup();
  });

  it('provides default english language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('translated').textContent).toBe('Home');
  });

  it('switches to Hindi and translates correctly', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    const button = screen.getByText('Switch to Hindi');
    act(() => {
      button.click();
    });
    expect(screen.getByTestId('lang').textContent).toBe('hi');
    expect(screen.getByTestId('translated').textContent).toBe('होम');
  });
});
