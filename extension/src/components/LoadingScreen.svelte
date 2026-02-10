<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { wittyMessages } from '@/lib/messages';
  import { fade, fly } from 'svelte/transition';

  interface Message {
    id: number;
    text: string;
    type: 'witty' | 'progress';
  }

  interface Props {
    currentStep?: string;
  }

  let { currentStep = '' }: Props = $props();

  let messages: Message[] = $state([]);
  let messageId = 0;
  let messageInterval: number | null = null;
  let messageCount = 0;
  const MAX_MESSAGES = 20;

  onMount(() => {
    addMessage(getRandomMessage(), 'witty');

    messageInterval = window.setInterval(() => {
      if (messageCount < MAX_MESSAGES) {
        addMessage(getRandomMessage(), 'witty');
        messageCount++;
      } else if (messageCount === MAX_MESSAGES) {
        addMessage("Deep analysis in progress... almost there!", 'witty');
        messageCount++;
      }
    }, 3000);
  });

  onDestroy(() => {
    if (messageInterval !== null) {
      clearInterval(messageInterval);
    }
  });

  $effect(() => {
    if (currentStep) {
      addMessage(currentStep, 'progress');
    }
  });

  function addMessage(text: string, type: 'witty' | 'progress') {
    messages = [...messages, { id: messageId++, text, type }];
    if (messages.length > 4) {
      messages = messages.slice(-4);
    }
  }

  function getRandomMessage(): string {
    return wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
  }
</script>

<div class="loading-screen">
  <!-- Header -->
  <div class="loading-header">
    <!-- Animated Shield -->
    <div class="shield-container">
      <img src="/icon-128.png" alt="Ruh" class="shield-icon-img" />
    </div>

    <h3 class="title">Analyzing Product</h3>
    <p class="subtitle">Scanning for harmful substances...</p>

    <!-- Progress Dots -->
    <div class="progress-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>

  <!-- Steps Visualization -->
  <div class="steps-viz">
    <div class="step step-1">
      <div class="step-inner">
        <span class="step-icon">📊</span>
        <span class="step-label">Ingredients</span>
      </div>
    </div>
    <div class="connector"></div>
    <div class="step step-2">
      <div class="step-inner">
        <span class="step-icon">🧬</span>
        <span class="step-label">Analysis</span>
      </div>
    </div>
    <div class="connector"></div>
    <div class="step step-3">
      <div class="step-inner">
        <span class="step-icon">✅</span>
        <span class="step-label">Results</span>
      </div>
    </div>
  </div>

  <!-- Message Feed -->
  <div class="message-scroller">
    <div class="message-list">
      {#each messages as message (message.id)}
        <div
          class="message-item {message.type === 'progress' ? 'progress-message' : 'witty-message'}"
          in:fly={{ y: -20, duration: 300 }}
          out:fade={{ duration: 150 }}
        >
          {#if message.type === 'progress'}
            <span class="message-icon">⚡</span>
          {:else}
            <span class="message-icon">💭</span>
          {/if}
          <span class="message-text">{message.text}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Footer -->
  <div class="loading-footer">
    <span>Powered by </span>
    <span class="font-semibold">AI Analysis</span>
  </div>
</div>

<style>
  .loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--color-bg-primary, #ffffff);
    position: relative;
  }

  /* Header */
  .loading-header {
    text-align: center;
    margin-bottom: 32px;
    position: relative;
    z-index: 10;
  }

  /* Shield Animation */
  .shield-container {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shield-icon-img {
    width: 56px;
    height: 56px;
    object-fit: contain;
    animation: pulse-icon 2s ease-in-out infinite;
  }

  @keyframes pulse-icon {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .title {
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: var(--color-text-primary, #111827);
  }

  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--color-text-secondary, #6b7280);
    margin: 0 0 16px 0;
  }

  /* Progress Dots */
  .progress-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-primary, #6366f1);
    animation: dot-pulse 1.5s ease-in-out infinite;
  }

  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dot-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* Steps Visualization */
  .steps-viz {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-bottom: 32px;
    position: relative;
    z-index: 10;
  }

  .step {
    width: 70px;
    height: 70px;
    border-radius: 12px;
    background: var(--color-bg-card, #ffffff);
    border: 1px solid var(--color-border, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .step-1 { animation: step-highlight 3s ease-in-out infinite; }
  .step-2 { animation: step-highlight 3s ease-in-out infinite 1s; }
  .step-3 { animation: step-highlight 3s ease-in-out infinite 2s; }

  @keyframes step-highlight {
    0%, 100% {
      border-color: var(--color-border, #e5e7eb);
      box-shadow: none;
    }
    50% {
      border-color: var(--color-primary, #6366f1);
      box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
    }
  }

  .step-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .step-icon {
    font-size: 20px;
  }

  .step-label {
    font-size: 9px;
    font-weight: 500;
    color: var(--color-text-secondary, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .connector {
    width: 24px;
    height: 2px;
    background: var(--color-border, #e5e7eb);
    position: relative;
    overflow: hidden;
  }

  .connector::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--color-primary, #6366f1), transparent);
    animation: data-flow 1.5s linear infinite;
  }

  @keyframes data-flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* Message Feed */
  .message-scroller {
    flex: 1;
    width: 100%;
    max-width: 320px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;
    position: relative;
    z-index: 10;
  }

  .message-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .message-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.5;
    border: 1px solid transparent;
  }

  .witty-message {
    background: var(--color-bg-secondary, #f9fafb);
    border-color: var(--color-border, #e5e7eb);
    color: var(--color-text-secondary, #6b7280);
  }

  .progress-message {
    background: rgba(99, 102, 241, 0.08);
    border-color: rgba(99, 102, 241, 0.2);
    color: #4f46e5;
    font-weight: 500;
  }

  .message-icon {
    font-size: 16px;
    flex-shrink: 0;
    line-height: 1.5;
  }

  .message-text {
    flex: 1;
  }

  /* Footer */
  .loading-footer {
    margin-top: auto;
    padding-top: 20px;
    font-size: 12px;
    color: var(--color-text-muted, #9ca3af);
    position: relative;
    z-index: 10;
  }

  .font-semibold {
    font-weight: 600;
    color: var(--color-primary, #6366f1);
  }
</style>
