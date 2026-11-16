type Environment = Partial<Pick<
  NodeJS.ProcessEnv,
  'NODE_ENV' | 'VERCEL_ENV' | 'PUBLIC_FAQ_TOKEN' | 'PUBLIC_FAQ_MODE' | 'PUBLIC_FAQ_ORIGIN' | 'PUBLIC_FAQ_CORE_ORIGIN' | 'VERCEL_GIT_COMMIT_REF' | 'VERCEL_GIT_REPO_OWNER' | 'VERCEL_GIT_REPO_SLUG'
>>;

const PREVIEW_CORE = 'https://ai-staging.62-83-33-232.sslip.io';
const LIVE_CORE = 'https://ai-live.62-83-33-232.sslip.io';
const MARKETING_ORIGIN = 'https://www.hellotutor.me';

const PRODUCTION_HOSTS = new Set([
  'hellotutor.me',
  'www.hellotutor.me',
  'app.hellotutor.me',
  'api.hellotutor.me',
]);

function httpsOrigin(value?: string): URL | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && value === url.origin) return url;
  } catch {
    return;
  }
}

export function publicFaqConfig(env: Environment = process.env) {
  const token = env.PUBLIC_FAQ_TOKEN?.trim();
  const isMarketing =
    env.VERCEL_GIT_REPO_OWNER === 'alihamza-studio' &&
    env.VERCEL_GIT_REPO_SLUG === 'hellotutor-web';

  if (env.VERCEL_ENV === 'production') {
    if (!isMarketing || env.VERCEL_GIT_COMMIT_REF !== 'main' ||
        env.PUBLIC_FAQ_MODE === 'disabled') return;
    return {
      token: undefined,
      browserOrigin: MARKETING_ORIGIN,
      endpoint: `${LIVE_CORE}/v1/assist/public`,
    };
  }

  if (
    env.VERCEL_ENV === 'preview' &&
    env.VERCEL_GIT_COMMIT_REF === 'test' &&
    isMarketing
  ) {
    return {
      token: undefined,
      browserOrigin: 'https://hellotutor-web-git-test-hellotutor.vercel.app',
      endpoint: `${PREVIEW_CORE}/v1/assist/public`,
    };
  }

  if (!token) return;

  if (env.NODE_ENV === 'development' && !env.PUBLIC_FAQ_MODE) {
    return {
      token,
      browserOrigin: 'http://127.0.0.1:3071',
      endpoint: 'http://127.0.0.1:8071/v1/assist/public',
    };
  }

  if (env.PUBLIC_FAQ_MODE !== 'staging') return;
  const browser = httpsOrigin(env.PUBLIC_FAQ_ORIGIN);
  const core = httpsOrigin(env.PUBLIC_FAQ_CORE_ORIGIN);
  if (!browser || !core || browser.origin === core.origin) return;
  if (PRODUCTION_HOSTS.has(browser.hostname.replace(/\.$/, '')) ||
      PRODUCTION_HOSTS.has(core.hostname.replace(/\.$/, ''))) return;

  return {
    token,
    browserOrigin: browser.origin,
    endpoint: new URL('/v1/assist/public', core).href,
  };
}
