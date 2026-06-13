declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}

function track(event: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(event, props ? { props } : undefined)
  }
}

export const analytics = {
  frameworkPhaseEntered(phaseName: string, frameworkSlug: string) {
    track('framework_phase_entered', { phase: phaseName, framework: frameworkSlug })
  },

  activityExpanded(activityName: string, phase: string, frameworkSlug: string) {
    track('activity_expanded', { activity: activityName, phase, framework: frameworkSlug })
  },

  promptSaved(phase: string, frameworkSlug: string) {
    track('prompt_saved', { phase, framework: frameworkSlug })
  },

  methodDrawerOpened(methodSlug: string, sourceFrameworkSlug: string) {
    track('method_drawer_opened', { method: methodSlug, source_framework: sourceFrameworkSlug })
  },

  calendarCtaClicked(bookingType: string, sourcePageSlug: string) {
    track('calendar_cta_clicked', { booking_type: bookingType, source_page: sourcePageSlug })
  },

  affiliateLinkClicked(bookTitle: string, sourcePageSlug: string) {
    track('affiliate_link_clicked', { book: bookTitle, source_page: sourcePageSlug })
  },
}
