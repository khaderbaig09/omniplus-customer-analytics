/**
 * Dashboard & Visualization Controller
 */

class DashboardController {
  constructor() {
    this.engine = new AnalyticsEngine();
    this.charts = {};
    this.filters = {
      category: 'all',
      channel: 'all',
      searchQuery: ''
    };
    this.currentPage = 1;
    this.pageSize = 8;
  }

  init() {
    this.setupTheme();
    this.setupFilters();
    this.render();
  }

  setupTheme() {
    const savedTheme = localStorage.getItem('analytics_theme') || 'light';
    this.applyTheme(savedTheme);

    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';
      this.applyTheme(nextTheme);
      this.renderCharts();
    });
  }

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('analytics_theme', theme);
    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
    }
  }

  setupFilters() {
    document.getElementById('filterChannel')?.addEventListener('change', (e) => {
      this.filters.channel = e.target.value;
      this.currentPage = 1;
      this.render();
    });

    document.getElementById('filterCategory')?.addEventListener('change', (e) => {
      this.filters.category = e.target.value;
      this.currentPage = 1;
      this.render();
    });

    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.filters.searchQuery = e.target.value;
      this.currentPage = 1;
      this.render();
    });

    // Reset filters
    document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
      document.getElementById('filterChannel').value = 'all';
      document.getElementById('filterCategory').value = 'all';
      document.getElementById('searchInput').value = '';
      this.filters = { category: 'all', channel: 'all', searchQuery: '' };
      this.currentPage = 1;
      this.render();
    });

    // Executive Insights Modal
    document.getElementById('openInsightsBtn')?.addEventListener('click', () => {
      document.getElementById('insightsModal')?.classList.remove('hidden');
    });

    document.getElementById('closeInsightsBtn')?.addEventListener('click', () => {
      document.getElementById('insightsModal')?.classList.add('hidden');
    });

    // Export CSV
    document.getElementById('exportCsvBtn')?.addEventListener('click', () => {
      this.exportRFMData();
    });

    // Print
    document.getElementById('printBtn')?.addEventListener('click', () => {
      window.print();
    });
  }

  render() {
    const { filteredOrders, filteredCustomers } = this.engine.filterData(this.filters);

    // 1. KPIs
    const kpis = this.engine.computeKPIs(filteredOrders, filteredCustomers);
    this.renderKPIs(kpis);

    // 2. RFM & Table
    const rfmData = this.engine.computeRFM(filteredOrders, filteredCustomers);
    this.renderRFMTable(rfmData);

    // 3. Cohort Retention Heatmap
    const cohortData = this.engine.computeCohortRetention(filteredOrders);
    this.renderCohortHeatmap(cohortData);

    // 4. Charts
    this.renderCharts(filteredOrders, filteredCustomers, rfmData);

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  renderKPIs(kpis) {
    document.getElementById('kpiRevenue').textContent = `$${kpis.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById('kpiOrders').textContent = kpis.totalOrders.toLocaleString();
    document.getElementById('kpiActiveCustomers').textContent = kpis.activeCustomers.toLocaleString();
    document.getElementById('kpiAOV').textContent = `$${kpis.aov.toFixed(2)}`;
    document.getElementById('kpiRepeatRate').textContent = `${kpis.repeatRate.toFixed(1)}%`;
    document.getElementById('kpiCLV').textContent = `$${kpis.clv.toFixed(2)}`;
  }

  renderCohortHeatmap(cohorts) {
    const tbody = document.getElementById('cohortHeatmapBody');
    if (!tbody) return;

    if (cohorts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-6 text-slate-400">No cohort data matches current filters.</td></tr>`;
      return;
    }

    tbody.innerHTML = cohorts.map(c => {
      const cells = c.retentionPcts.map((r, idx) => {
        // Color scale from light to deep indigo
        const opacity = r.pct > 0 ? Math.max(0.15, r.pct / 100) : 0;
        const bgStyle = r.pct > 0 
          ? `background-color: rgba(99, 102, 241, ${opacity}); color: ${opacity > 0.45 ? '#ffffff' : 'inherit'}; font-weight: 600;` 
          : 'background-color: transparent; color: #94a3b8;';

        return `
          <td class="p-2 text-center text-xs font-mono-numbers heatmap-cell rounded border border-slate-100 dark:border-slate-800/40" style="${bgStyle}">
            ${r.pct > 0 ? `${r.pct}%` : '-'}
          </td>
        `;
      }).join('');

      return `
        <tr class="border-b border-slate-100 dark:border-slate-800/60">
          <td class="p-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
            ${c.cohort}
          </td>
          <td class="p-2.5 text-xs text-center font-mono-numbers text-slate-500 dark:text-slate-400">
            ${c.cohortSize}
          </td>
          ${cells}
        </tr>
      `;
    }).join('');
  }

  renderRFMTable(rfmList) {
    const tbody = document.getElementById('rfmTableBody');
    const countEl = document.getElementById('tableCountLabel');
    if (!tbody) return;

    if (countEl) {
      countEl.textContent = `Showing ${rfmList.length} customer records`;
    }

    if (rfmList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-slate-400">No customers found matching filter criteria.</td></tr>`;
      document.getElementById('tablePagination')?.classList.add('hidden');
      return;
    }

    document.getElementById('tablePagination')?.classList.remove('hidden');

    const totalPages = Math.ceil(rfmList.length / this.pageSize) || 1;
    if (this.currentPage > totalPages) this.currentPage = totalPages;

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageItems = rfmList.slice(startIdx, startIdx + this.pageSize);

    tbody.innerHTML = pageItems.map(item => `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition border-b border-slate-100 dark:border-slate-800/60">
        <td class="p-3 text-xs whitespace-nowrap">
          <div class="font-bold text-slate-800 dark:text-slate-100">${item.customer.customer_name}</div>
          <div class="text-[11px] text-slate-400 font-mono-numbers">${item.customerId} &bull; ${item.customer.country}</div>
        </td>
        <td class="p-3 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-slate-100 dark:bg-slate-800">
            ${item.customer.acquisition_channel}
          </span>
        </td>
        <td class="p-3 text-xs text-center font-mono-numbers text-slate-600 dark:text-slate-300">
          ${item.recency} days ago
        </td>
        <td class="p-3 text-xs text-center font-mono-numbers font-semibold text-slate-800 dark:text-slate-100">
          ${item.frequency}
        </td>
        <td class="p-3 text-xs text-right font-mono-numbers font-bold text-slate-900 dark:text-white">
          $${item.monetary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
        <td class="p-3 text-xs whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${item.badgeColor}">
            ${item.segment}
          </span>
        </td>
        <td class="p-3 text-xs text-slate-500 dark:text-slate-400">
          ${item.actionRecommendation}
        </td>
      </tr>
    `).join('');

    // Pagination info
    const infoEl = document.getElementById('paginationInfo');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (infoEl) infoEl.textContent = `Page ${this.currentPage} of ${totalPages}`;
    if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = this.currentPage >= totalPages;

    prevBtn.onclick = () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.renderRFMTable(rfmList);
      }
    };
    nextBtn.onclick = () => {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.renderRFMTable(rfmList);
      }
    };
  }

  renderCharts(orders = this.engine.orders, customers = this.engine.customers, rfmData = null) {
    const isDark = document.documentElement.classList.contains('dark');
    const theme = {
      text: isDark ? '#94a3b8' : '#64748b',
      grid: isDark ? 'rgba(71, 85, 105, 0.2)' : 'rgba(226, 232, 240, 0.8)',
      tooltipBg: isDark ? '#0f172a' : '#ffffff',
      tooltipText: isDark ? '#f8fafc' : '#0f172a',
      borderColor: isDark ? '#334155' : '#e2e8f0'
    };

    if (!rfmData) {
      rfmData = this.engine.computeRFM(orders, customers);
    }

    // 1. Monthly Revenue & Order Volume Chart
    const monthly = this.engine.computeMonthlyRevenue(orders);
    this.renderMonthlyChart(monthly, theme);

    // 2. RFM Segment Distribution Doughnut
    this.renderSegmentDoughnut(rfmData, theme);

    // 3. Category Contribution & AOV Bar Chart
    const categories = this.engine.computeCategoryShare(orders);
    this.renderCategoryChart(categories, theme);

    // 4. Acquisition Channel Share
    const channels = this.engine.computeChannelShare(orders, customers);
    this.renderChannelChart(channels, theme);
  }

  renderMonthlyChart(data, theme) {
    const canvas = document.getElementById('revenueTrendChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (this.charts.monthly) this.charts.monthly.destroy();

    this.charts.monthly = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Monthly Gross Revenue ($)',
            data: data.revenue,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            fill: true,
            tension: 0.35,
            yAxisID: 'y'
          },
          {
            label: 'Completed Orders',
            data: data.orders,
            borderColor: '#10b981',
            borderDash: [5, 5],
            pointRadius: 4,
            tension: 0.35,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme.text, font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          y: {
            position: 'left',
            grid: { color: theme.grid },
            ticks: {
              color: theme.text,
              font: { family: 'Plus Jakarta Sans', size: 10 },
              callback: v => `$${v}`
            }
          },
          y1: {
            position: 'right',
            grid: { display: false },
            ticks: {
              color: theme.text,
              font: { family: 'Plus Jakarta Sans', size: 10 }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: theme.text, font: { family: 'Plus Jakarta Sans', size: 11, weight: '500' } }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            borderColor: theme.borderColor,
            borderWidth: 1
          }
        }
      }
    });
  }

  renderSegmentDoughnut(rfmData, theme) {
    const canvas = document.getElementById('rfmSegmentChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (this.charts.segments) this.charts.segments.destroy();

    const counts = {};
    rfmData.forEach(item => {
      counts[item.segment] = (counts[item.segment] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    const segmentColors = {
      'Champions / VIP': '#10b981',
      'Loyal Customers': '#6366f1',
      'Promising New': '#06b6d4',
      'At Risk (High Value Churn)': '#ef4444',
      'Hibernating': '#f59e0b',
      'Casual Shoppers': '#94a3b8'
    };

    this.charts.segments = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: labels.map(l => segmentColors[l] || '#94a3b8'),
          borderWidth: 2,
          borderColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: theme.text,
              font: { family: 'Plus Jakarta Sans', size: 10, weight: '500' },
              padding: 10
            }
          }
        }
      }
    });
  }

  renderCategoryChart(data, theme) {
    const canvas = document.getElementById('categoryShareChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (this.charts.categories) this.charts.categories.destroy();

    this.charts.categories = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Total Revenue ($)',
          data: data.revenue,
          backgroundColor: '#3b82f6',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme.text, font: { family: 'Plus Jakarta Sans', size: 10 } }
          },
          y: {
            grid: { color: theme.grid },
            ticks: {
              color: theme.text,
              font: { family: 'Plus Jakarta Sans', size: 10 },
              callback: v => `$${v}`
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  renderChannelChart(data, theme) {
    const canvas = document.getElementById('channelShareChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (this.charts.channels) this.charts.channels.destroy();

    this.charts.channels = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.data,
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(14, 165, 233, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            grid: { color: theme.grid },
            ticks: { display: false }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: theme.text,
              font: { family: 'Plus Jakarta Sans', size: 10, weight: '500' }
            }
          }
        }
      }
    });
  }

  exportRFMData() {
    const { filteredOrders, filteredCustomers } = this.engine.filterData(this.filters);
    const rfm = this.engine.computeRFM(filteredOrders, filteredCustomers);
    if (!rfm.length) return;

    const headers = ['CustomerID', 'CustomerName', 'Country', 'AcquisitionChannel', 'RecencyDays', 'Frequency', 'MonetarySpend', 'RFMScore', 'Segment', 'ActionRecommendation'];
    const rows = rfm.map(r => [
      r.customerId,
      `"${r.customer.customer_name}"`,
      `"${r.customer.country}"`,
      `"${r.customer.acquisition_channel}"`,
      r.recency,
      r.frequency,
      r.monetary.toFixed(2),
      r.rfmCombined,
      `"${r.segment}"`,
      `"${r.actionRecommendation}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Customer_Analytics_RFM_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }
}

// Global initialization
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
  dashboard = new DashboardController();
  dashboard.init();
});
