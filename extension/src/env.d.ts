/// <reference types="svelte" />
/// <reference types="vite/client" />

// Svelte module declarations
declare module '*.svelte' {
  import type { ComponentType } from 'svelte';
  const component: ComponentType<any>;
  export default component;
}

// Chrome runtime.getContexts API (available in Chrome 116+)
declare namespace chrome.runtime {
  interface ContextFilter {
    contextTypes?: string[];
  }

  interface ExtensionContext {
    contextType: string;
    documentUrl?: string;
    tabId: number;
    windowId: number;
    frameId: number;
    documentId?: string;
    documentOrigin?: string;
    incognito: boolean;
  }

  function getContexts(filter: ContextFilter): Promise<ExtensionContext[]>;
}
