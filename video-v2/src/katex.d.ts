declare module 'katex' {
  const katex: {
    renderToString: (
      tex: string,
      options?: {
        throwOnError?: boolean;
        displayMode?: boolean;
        strict?: string;
      },
    ) => string;
  };
  export default katex;
}

declare module 'katex/dist/katex.min.css';
