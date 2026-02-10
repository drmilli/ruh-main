<script lang="ts">
  /**
   * AnalysisView - Product Analysis Results Display
   *
   * Pure presentation component that renders product safety analysis results.
   * Displays harm score, allergens, PFAS compounds, and other concerns.
   */
  import type { AnalysisResponse } from "@/types";
  import {
    getHarmScore,
    getRiskLevel,
    getRiskClass,
    formatTimeAgo,
  } from "@/lib/utils";

  interface Props {
    analysis: AnalysisResponse | null;
    loading?: boolean;
    error?: string | null;
    visible?: boolean;
  }

  let { analysis, loading = false, error = null, visible = true }: Props = $props();

  const productAnalysis = $derived(analysis?.analysis);
  const harmScore = $derived(productAnalysis
    ? getHarmScore(productAnalysis.overall_score)
    : 0);
  const riskLevel = $derived(getRiskLevel(harmScore));
  const riskClass = $derived(getRiskClass(riskLevel));

  // Donut chart calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = $derived(circumference - (harmScore / 100) * circumference);

  // Get color based on risk level
  function getScoreColor(score: number): string {
    if (score <= 30) return "#22c55e"; // Safe - Green
    if (score <= 50) return "#f59e0b"; // Caution - Amber
    if (score <= 70) return "#f87171"; // High - Red
    return "#ef4444"; // Severe - Bright Red
  }

  const scoreColor = $derived(getScoreColor(harmScore));

  function handleRetry() {
    window.location.reload();
  }
</script>

<div class="sidebar">
  <!-- Content -->
  <div class="content">
    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p class="text-secondary mt-4">Analyzing product safety...</p>
      </div>
    {:else if error}
      <div class="error">
        <div class="error-icon">!</div>
        <h3 class="text-lg font-semibold text-alert mt-3">Analysis Failed</h3>
        <p class="text-sm text-secondary mt-2">{error}</p>
        <button class="btn-primary mt-4" onclick={handleRetry}>
          Retry Analysis
        </button>
      </div>
    {:else if productAnalysis}
      <!-- Header with Logo -->
      <div class="header-section">
        <div class="logo-badge">
          <img src="/icon-128.png" alt="Ruh" class="logo-icon-img" />
          <span class="logo-text">Ruh</span>
        </div>
      </div>

      <!-- Product Info -->
      <div class="section">
        <h2 class="product-title">
          {productAnalysis.product_name || "Product Analysis"}
        </h2>
        {#if productAnalysis.brand}
          <p class="text-sm text-secondary">{productAnalysis.brand}</p>
        {/if}
        {#if productAnalysis.analyzed_at}
          <p class="text-xs text-muted mt-1">
            Analyzed {formatTimeAgo(productAnalysis.analyzed_at)}
          </p>
        {/if}
      </div>

      <!-- Harm Score Card -->
      <div class="section">
        <div class="score-card card">
          <div class="donut-container">
            <svg class="donut-chart" viewBox="0 0 120 120">
              <!-- Gradient definitions -->
              <defs>
                <linearGradient id="gradient-safe" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#22c55e" />
                  <stop offset="100%" stop-color="#16a34a" />
                </linearGradient>
                <linearGradient id="gradient-caution" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f59e0b" />
                  <stop offset="100%" stop-color="#d97706" />
                </linearGradient>
                <linearGradient id="gradient-danger" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ef4444" />
                  <stop offset="100%" stop-color="#dc2626" />
                </linearGradient>
              </defs>
              <!-- Background circle -->
              <circle
                class="donut-bg"
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                stroke-width="8"
              />
              <!-- Animated progress circle -->
              <circle
                class="donut-progress"
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={scoreColor}
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray={circumference}
                stroke-dashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div class="donut-text">
              <span class="score-number" style="color: {scoreColor}">{harmScore}</span>
              <span class="score-label">/ 100</span>
            </div>
          </div>
          <div class="score-info">
            <h3 class="risk-level-text" style="color: {scoreColor}">{riskLevel}</h3>
            <p class="text-sm text-muted">Harm Level</p>
            <div class="confidence-badge">
              <span class="confidence-value">{Math.round(productAnalysis.confidence * 100)}%</span>
              <span class="confidence-label">confidence</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Analysis Details -->
      <div class="section">
        <h3 class="section-subtitle">
          {productAnalysis.ingredients.length > 0
            ? "Analysis Complete"
            : "Analysis Inconclusive"}
        </h3>
        <div class="space-y-3">
          <!-- Ingredients Display -->
          {#if productAnalysis.ingredients.length > 0}
            <div class="detail-card card">
              <div class="detail-header">
                <span class="detail-icon">📊</span>
                <p class="detail-title">
                  Ingredients Scanned ({productAnalysis.ingredients.length})
                </p>
              </div>
              <div class="ingredient-grid">
                {#each productAnalysis.ingredients as ingredient}
                  {@const isAllergen = productAnalysis.allergens_detected.some(
                    (a) => ingredient.toLowerCase().includes(a.name.toLowerCase()) ||
                      a.name.toLowerCase().includes(ingredient.toLowerCase())
                  )}
                  {@const isPFAS = productAnalysis.pfas_detected.some(
                    (p) => ingredient.toLowerCase().includes(p.name.toLowerCase()) ||
                      p.name.toLowerCase().includes(ingredient.toLowerCase())
                  )}
                  {@const isToxic = productAnalysis.other_concerns.some(
                    (c) => ingredient.toLowerCase().includes(c.name.toLowerCase()) ||
                      c.name.toLowerCase().includes(ingredient.toLowerCase())
                  )}
                  {@const isSafe = !isAllergen && !isPFAS && !isToxic &&
                    productAnalysis.allergens_detected.length === 0 &&
                    productAnalysis.pfas_detected.length === 0 &&
                    productAnalysis.other_concerns.length === 0}
                  <span
                    class="ingredient-badge {isAllergen || isPFAS || isToxic
                      ? isAllergen ? 'badge-allergen' : 'badge-pfas'
                      : isSafe ? 'badge-safe' : 'badge-neutral'}"
                  >
                    {ingredient}
                  </span>
                {/each}
              </div>
            </div>
          {:else}
            <div class="detail-card card">
              <div class="detail-header">
                <span class="detail-icon">📋</span>
                <div>
                  <p class="detail-title">Ingredients Scanned</p>
                  <p class="text-sm text-muted">No ingredients found</p>
                </div>
              </div>
            </div>
          {/if}

          <div class="detail-card card">
            <div class="detail-header">
              <span class="detail-icon">🧬</span>
              <div>
                <p class="detail-title">Database Screening</p>
                <p class="text-sm text-muted">Cross-referenced with allergen & PFAS databases</p>
              </div>
            </div>
          </div>

          <div class="detail-card card">
            <div class="detail-header">
              <span class="detail-icon">{productAnalysis.confidence < 0.3 ? "⚡" : "✅"}</span>
              <div>
                <p class="detail-title">Confidence Level</p>
                {#if productAnalysis.confidence < 0.3}
                  <p class="text-sm text-caution font-semibold">
                    {Math.round(productAnalysis.confidence * 100)}% - Low Confidence
                  </p>
                  <p class="text-xs text-muted mt-1">
                    Limited data available. Results may be incomplete.
                  </p>
                {:else}
                  <p class="text-sm text-muted">
                    {Math.round(productAnalysis.confidence * 100)}% - Based on verified sources
                  </p>
                {/if}
              </div>
            </div>
          </div>

          {#if productAnalysis.allergens_detected.length === 0 && productAnalysis.pfas_detected.length === 0 && productAnalysis.other_concerns.length === 0}
            <div class="safe-box">
              <div class="safe-icon">✨</div>
              <p class="safe-title">No Major Concerns Detected</p>
              <p class="safe-subtitle">This product appears safe based on our analysis</p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Allergens -->
      {#if productAnalysis.allergens_detected.length > 0}
        <div class="section">
          <h3 class="section-subtitle">
            ⚠️ Allergens Detected
          </h3>
          <div class="space-y-2">
            {#each productAnalysis.allergens_detected as allergen}
              <div class="alert-card allergen-card">
                <div class="alert-content">
                  <p class="alert-name">{allergen.name}</p>
                  <p class="alert-source">{allergen.source}</p>
                </div>
                <span class="severity-badge severity-{allergen.severity}">
                  {allergen.severity}
                </span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- PFAS -->
      {#if productAnalysis.pfas_detected.length > 0}
        <div class="section">
          <h3 class="section-subtitle">
            🧪 PFAS Detected (Forever Chemicals)
          </h3>
          <div class="space-y-3">
            {#each productAnalysis.pfas_detected as pfas}
              <div class="alert-card pfas-card">
                <p class="alert-name">{pfas.name}</p>
                {#if pfas.cas_number}
                  <p class="cas-number">CAS: {pfas.cas_number}</p>
                {/if}
                <p class="alert-effects">{pfas.body_effects}</p>
                <p class="alert-source">Source: {pfas.source}</p>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Other Concerns -->
      {#if productAnalysis.other_concerns.length > 0}
        <div class="section">
          <h3 class="section-subtitle">
            ℹ️ Other Concerns
          </h3>
          <div class="space-y-2">
            {#each productAnalysis.other_concerns as concern}
              <div class="alert-card concern-card">
                <div class="alert-content">
                  <p class="alert-name">{concern.name}</p>
                  <p class="alert-description">{concern.description}</p>
                  <p class="alert-category">Category: {concern.category}</p>
                </div>
                <span class="severity-badge severity-{concern.severity}">
                  {concern.severity}
                </span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Footer -->
      <div class="footer-section">
        <div class="powered-by">
          <span>Powered by</span>
          <span class="font-semibold text-primary"> AI Analysis</span>
        </div>
      </div>
    {:else}
      <div class="empty">
        <img src="/icon-128.png" alt="Ruh" class="empty-icon-img" />
        <h3 class="text-lg font-semibold text-primary mt-4">
          Product Safety Analysis
        </h3>
        <p class="text-sm text-secondary mt-2">
          Navigate to an Amazon product page to analyze it for harmful substances.
        </p>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .sidebar {
    @apply w-full h-full flex flex-col relative;
    background: var(--color-bg-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
  }

  .content {
    @apply flex-1 overflow-y-auto relative;
    padding: 20px;
  }

  /* Header Section */
  .header-section {
    @apply flex items-center justify-between mb-4;
  }

  .logo-badge {
    @apply flex items-center gap-2;
  }

  .logo-icon-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  .logo-text {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
  }

  .section {
    margin-bottom: 20px;
  }

  .product-title {
    font-weight: 700;
    font-size: 20px;
    color: var(--color-text-primary);
    letter-spacing: -0.02em;
  }

  .section-subtitle {
    @apply flex items-center gap-2 mb-3;
    font-weight: 600;
    font-size: 14px;
    color: var(--color-text-primary);
  }

  /* Score Card */
  .score-card {
    @apply flex items-center p-5;
  }

  .donut-container {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }

  .donut-chart {
    width: 100%;
    height: 100%;
  }

  .donut-progress {
    transition: stroke-dashoffset 1s ease-out;
  }

  .donut-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .score-number {
    font-weight: 700;
    font-size: 32px;
    line-height: 1;
  }

  .score-label {
    font-size: 11px;
    color: var(--color-text-muted);
    margin-top: 2px;
  }

  .score-info {
    margin-left: 20px;
  }

  .risk-level-text {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .confidence-badge {
    @apply flex items-center gap-1 mt-3 px-3 py-1 rounded-full;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    width: fit-content;
  }

  .confidence-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-primary);
  }

  .confidence-label {
    font-size: 11px;
    color: var(--color-text-muted);
  }

  /* Detail Cards */
  .detail-card {
    padding: 14px;
  }

  .detail-header {
    @apply flex items-start gap-3;
  }

  .detail-icon {
    font-size: 20px;
  }

  .detail-title {
    font-weight: 500;
    color: var(--color-text-primary);
    font-size: 14px;
  }

  /* Ingredient Grid */
  .ingredient-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 12px;
  }

  .ingredient-badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    border: 1px solid transparent;
  }

  .badge-allergen {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.2);
    color: #dc2626;
  }

  .badge-pfas {
    background: rgba(245, 158, 11, 0.1);
    border-color: rgba(245, 158, 11, 0.2);
    color: #d97706;
  }

  .badge-safe {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.2);
    color: #16a34a;
  }

  .badge-neutral {
    background: var(--color-bg-secondary);
    border-color: var(--color-border);
    color: var(--color-text-secondary);
  }

  /* Safe Box */
  .safe-box {
    @apply text-center p-5 rounded-xl;
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .safe-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .safe-title {
    font-weight: 600;
    font-size: 14px;
    color: #16a34a;
  }

  .safe-subtitle {
    font-size: 12px;
    color: #22c55e;
    margin-top: 4px;
  }

  /* Alert Cards */
  .alert-card {
    @apply p-4 rounded-xl;
    border: 1px solid;
  }

  .allergen-card {
    @apply flex items-start justify-between gap-3;
    background: rgba(239, 68, 68, 0.05);
    border-color: rgba(239, 68, 68, 0.15);
  }

  .pfas-card {
    background: rgba(245, 158, 11, 0.05);
    border-color: rgba(245, 158, 11, 0.15);
  }

  .concern-card {
    @apply flex items-start justify-between gap-3;
    background: var(--color-bg-secondary);
    border-color: var(--color-border);
  }

  .alert-content {
    flex: 1;
  }

  .alert-name {
    font-weight: 600;
    color: var(--color-text-primary);
    font-size: 14px;
  }

  .alert-source, .alert-category {
    font-size: 12px;
    color: var(--color-text-muted);
    margin-top: 4px;
  }

  .alert-effects, .alert-description {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin-top: 6px;
  }

  .cas-number {
    font-family: monospace;
    font-size: 11px;
    color: var(--color-primary);
    margin-top: 2px;
  }

  /* Severity Badges */
  .severity-badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }

  .severity-low {
    background: rgba(34, 197, 94, 0.1);
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .severity-moderate {
    background: rgba(245, 158, 11, 0.1);
    color: #d97706;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .severity-high {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .severity-severe {
    background: rgba(239, 68, 68, 0.15);
    color: #b91c1c;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  /* Footer */
  .footer-section {
    @apply text-center py-4 mt-4;
    border-top: 1px solid var(--color-border);
  }

  .powered-by {
    font-size: 12px;
    color: var(--color-text-muted);
  }

  /* Loading State */
  .loading, .error, .empty {
    @apply flex flex-col items-center justify-center text-center;
    padding: 48px 20px;
    min-height: 60vh;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Error State */
  .error-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.1);
    border: 2px solid rgba(239, 68, 68, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: #ef4444;
  }

  /* Empty State */
  .empty-icon-img {
    width: 64px;
    height: 64px;
    object-fit: contain;
  }

  /* Utility Classes */
  .text-primary { color: var(--color-text-primary); }
  .text-secondary { color: var(--color-text-secondary); }
  .text-muted { color: var(--color-text-muted); }
  .text-safe { color: var(--color-safe); }
  .text-caution { color: var(--color-caution); }
  .text-alert { color: var(--color-alert); }
</style>
