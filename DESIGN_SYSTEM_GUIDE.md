# NOVAID Design System Implementation Guide

## ✅ Completed Pages (Matching Your Screenshots)

### 1. Dashboard.jsx
- **Status**: ✅ COMPLETE - Fully redesigned
- **Features**:
  - 3-column stat cards with `.card.card-accent-top.accent-blue/red/green`
  - Animated count-up values using `CountUpValue` component
  - Colored icons in `.stat-icon.blue/red/green` containers
  - Donut chart + Bar chart with proper chart styling
  - Family table with `.table-wrapper`, `.table-search`, `.data-table` classes
  - Search functionality with new `.search-input` styling
  - Links to family details pages
  - Edit/Delete action buttons with Lucide icons

### 2. Alerts.jsx
- **Status**: ✅ COMPLETE - Fully redesigned
- **Features**:
  - Critical families section with urgent status badges (pulse animation)
  - Forgotten families section with last visit date tracking
  - Cards with `.card.card-left-border.urgent/warning` styling
  - Stock critical items display with progress bars
  - Recent reports sidebar with message previews
  - Proper color coding: red for urgent, amber for warnings
  - Plan visit modal integration

### 3. Settings.jsx
- **Status**: ✅ COMPLETE - Fully redesigned
- **Features**:
  - Font size selector (Standard, Medium, Large)
  - Font weight selector (Normal, Medium, Bold)
  - Real-time preview of selected options
  - Button styling with `.btn.btn-outline` and `.btn.btn-primary`
  - Reset and Save functionality

### 4. AppNavbar.jsx
- **Status**: ✅ COMPLETE
- **Features**:
  - New navbar structure with `.navbar`, `.navbar-content`
  - Lucide icons for theme toggle, notifications, language, menu items
  - `.navbar-link.active` for current page highlighting
  - Responsive design (links hidden on mobile)
  - Theme toggle button with Sun/Moon icons

### 5. App.jsx
- **Status**: ✅ COMPLETE
- **Features**:
  - Theme state management with localStorage persistence
  - Props propagation to all pages
  - Updated page wrapper to use `.page-container` class

### 6. src/index.css
- **Status**: ✅ COMPLETE - Comprehensive design token system
- **Includes**:
  - CSS variables for colors, backgrounds, text styles
  - Typography system with Inter font
  - Component classes: `.btn`, `.card`, `.badge`, `.table-*`, `.input-field`
  - Animations: fadeUp, pulse, pulse-dot, countUp
  - Grid layouts: `.grid-3`, `.grid-2`
  - All utility classes needed for design system

---

## 🔄 Pages Remaining to Update

### Map.jsx
**Location**: `src/pages/Map.jsx`

**Key Updates Needed**:
1. Update navbar integration: `<AppNavbar activeRoute="map" toggleTheme={toggleTheme} isDark={isDark} />`
2. Update page container: Wrap in `<div className="page-container">` → `<main className="page-main">`
3. Create floating left panel with `.card` for family list
4. Add stats badge: "X familles géolocalisées" using `.badge`
5. Implement custom map markers:
   - Red circles for URGENT families
   - Green circles for STABLE families
6. Use Lucide icons for marker info popups

**Estimated Lines**: ~150-200

---

### Inventory.jsx (Stocks)
**Location**: `src/pages/Inventory.jsx`

**Key Updates Needed**:
1. Replace stat cards with `.card.card-accent-top` with accent colors
2. Stock items as cards with:
   - `.card.card-accent-top` with colored top border
   - Quantity display with emoji/icon
   - Progress bar: `.progress-track` with `.progress-fill.red/green/amber`
   - +/- buttons: `.control-btn-plus` / `.control-btn-minus`
3. Update add button to `.btn.btn-primary`
4. Delete links styled as red text
5. Search/filter functionality

**CSS Classes Needed**:
- `.progress-track` - container for progress bar
- `.progress-fill` - filled portion
- `.progress-fill.red/green/amber` - color variants

**Estimated Lines**: ~200-250

---

### Users.jsx (Create User)
**Location**: `src/pages/Users.jsx`

**Key Updates Needed**:
1. Center form card: `max-width: 480px`, use `.card` styling
2. Form header with rounded icon container
3. All inputs use `.input-field` class
4. Form fields layout with proper spacing
5. Submit button: `.btn.btn-primary` full width
6. Validation states:
   - Valid: green border on input
   - Invalid: red border on input
7. Error message styling

**CSS Selectors to Add**:
- `.input-field:valid` - green border
- `.input-field:invalid` - red border
- `.form-error` - error message styling

**Estimated Lines**: ~150-180

---

### MyMissions.jsx
**Location**: `src/pages/MyMissions.jsx`

**Key Updates Needed**:
1. Section titles with colored dots: `.mission-title` with `.mission-dot.blue/purple/green`
2. Mission cards: `.card.card-left-border` matching section color
3. Add icons (calendar, location) from Lucide
4. Tags: `.need-pill` with various colors
5. "Start Mission" button: `.btn.btn-primary` with arrow icon
6. Completed missions section with reduced opacity (0.75)
7. Date/location display formatting

**CSS Classes to Add**:
- `.mission-title`
- `.mission-dot.blue/purple/green`

**Estimated Lines**: ~200-250

---

### Map.jsx (Alternative - if using Leaflet)
**Already Exists**: Map page with Leaflet integration
**Key Updates**:
1. Navbar integration
2. Page container update
3. Floating panel styling with `.card`
4. Custom marker styling

---

### FamilyDetails.jsx & VisitCheckin.jsx
**Status**: May need minimal updates
1. Navbar integration
2. Page container styling
3. Card/button styling consistency

---

### Login.jsx
**Status**: May need styling updates to match design system
1. Form styling with `.input-field`
2. Button styling with `.btn.btn-primary`
3. Card styling if used

---

## 📋 Implementation Checklist

### For Each Remaining Page:

- [ ] Import Lucide icons at top: `import { [IconName] } from 'lucide-react';`
- [ ] Update navbar: `<AppNavbar activeRoute="[page]" toggleTheme={toggleTheme} isDark={isDark} />`
- [ ] Wrap content in: `<div className="page-container">` → `<main className="page-main">`
- [ ] Replace all old Tailwind styling with new design system classes
- [ ] Replace emoji with Lucide icons
- [ ] Update button classes: `.btn.btn-primary`, `.btn.btn-outline`, `.btn.btn-danger`, `.btn-sm`
- [ ] Update card classes: `.card`, `.card-accent-top`, `.card-left-border`
- [ ] Update badge classes: `.badge.badge-urgent`, `.badge.badge-stable`, `.badge.badge-warning`
- [ ] Update table markup: `.table-wrapper`, `.table-search`, `.data-table`
- [ ] Test build: `npm.cmd run build`

---

## 🎨 Design Token Reference

### Colors
```javascript
--color-blue: #4f7fff (Primary actions)
--color-green: #22c87a (Success, stable)
--color-red: #f04e4e (Danger, urgent)
--color-amber: #f0a742 (Warning, attention)
--color-teal: #2dd4bf (Alternative)
--color-purple: #9b7ff4 (Alternative)
```

### Backgrounds
```javascript
--bg-primary: #0d0f14 (Main background)
--bg-card: #141720 (Card background)
--bg-elevated: #1c2030 (Elevated/modal background)
```

### Text
```javascript
--text-primary: #f0f2f7 (Main text)
--text-secondary: #c8cdd8 (Secondary text)
--text-muted: #8b92a5 (Muted/placeholder text)
```

### Typography
```
Page Title: 28px, weight 700
Section Title: 22px, weight 600  
Card Title: 16px, weight 500
Body: 14px, weight 400
Small: 12px, weight 500
```

---

## 🚀 Quick Implementation Template

```jsx
import React, { useState } from 'react';
import { [IconName] } from 'lucide-react';
import AppNavbar from '../components/AppNavbar';

function PageName({ toggleTheme, isDark }) {
  return (
    <div className="page-container">
      <AppNavbar activeRoute="[pageName]" toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="page-main">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="page-title flex items-center gap-2">
            <[IconName] size={32} style={{ color: 'var(--color-blue)' }} />
            Page Title
          </h1>
          <p className="text-secondary">Subtitle here</p>
        </div>

        {/* CONTENT */}
        <div className="grid-3 gap-4">
          {/* Card Example */}
          <div className="card card-accent-top accent-blue">
            <h3 className="text-lg font-semibold text-primary mb-3">Card Title</h3>
            <p className="text-secondary">Card content</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-6">
          <button className="btn btn-primary">Primary Action</button>
          <button className="btn btn-outline">Secondary Action</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </main>
    </div>
  );
}

export default PageName;
```

---

## ✨ Build Verification

After each page update, verify build succeeds:
```powershell
npm.cmd run build
```

Expected output: `✓ built in [time]ms` (warning about chunk size is OK)

---

## 📝 Notes

1. All Lucide icons are already installed: `lucide-react 1.8.0`
2. Tailwind CSS is still available as fallback for any missing utilities
3. CSS variables in `:root` of `index.css` can be used in styles
4. Dark mode is automatically handled via CSS variables
5. All animations are defined in `index.css` - use `.animate-fade-up`, `.animate-count-up`
6. Responsive layouts use `.grid-3` for 3-column, `.grid-2` for 2-column layouts

---

## 🔗 File References

- **Main CSS System**: `src/index.css` (850+ lines, complete)
- **Navbar Component**: `src/components/AppNavbar.jsx` (complete)
- **App Root**: `src/App.jsx` (theme management, complete)
- **Dashboard Example**: `src/pages/Dashboard.jsx` (complete example)
- **Alerts Example**: `src/pages/Alerts.jsx` (complete example)
- **Settings Example**: `src/pages/Settings.jsx` (complete example)
